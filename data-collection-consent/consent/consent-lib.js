const consent = (function() {
  // This library is wrapped in an immediately invoked function expression
  // (IIFE) in order to prevent it's utility functions from polluting the global
  // namespace.

  /**
   * Minimal shim to make the `browser` global work as expected in Chrome.
   */
  const browser = globalThis.browser ?? chrome;

  /**
   * A "no operation" function. It doesn't do anything.
   */
  const noop = () => {};

  /**
   * A promisified version of setTimeout with AbortController support
   *
   * @param {*} duration - The timeout period in milliseconds.
   * @param {object} [options] - An optional options object
   * @param {Function} [options.cb] An optional callback function that will be
   * invoked when the timeout expires. This callback will not be invoked if the
   * `signal` is aborted.
   * @param {AbortSignal} [options.signal] An optional AbortSignal object that
   * can be used to abort the timeout early. If aborted before the successful
   * completion of the timeout, the returned promise will reject with the abort
   * reason.
   * @returns Promise<void>
   */
  const timeout = (duration, {cb = noop, signal} = {}) => {
    return new Promise((resolve, reject) => {
      signal?.throwIfAborted();

      let timerId;
      const handleAbort = () => {
        clearTimeout(timerId);
        reject(signal?.reason);
      };

      signal?.addEventListener("abort", handleAbort, {once: true});

      timerId = setTimeout(() => {
        signal?.removeEventListener("abort", handleAbort);
        resolve(cb());
      }, duration);
    });
  };


  /**
   * Static collection of defaults for use within the `consent` object. This
   * object (and it's descendants) are sealed to prevent unintentional of
   * defaults.
   */
  const CONSENT_DEFAULTS = Object.seal({
    /** The amount of time in milliseconds to wait for data to populate in
     * `storage.sync` before we assume that sync storage does not contain
     * consent data. */
    syncStorageInitializationTimeout: 2000,

    /**
     * The default consent values exposed outside of the `consent` object.
     */
    "consent.grants": Object.seal({
      "personal": false,
      "anonymous": false,
    }),
  });


  const consent = {
    /**
     * Internal cache of the current grant state for the different forms of
     * consent. This is `undefined` when `storage.sync` does not contain user
     * consent data.
     */
    _grants: undefined,

    /**
     * A short lived reference to the AbortController used as part of the
     * `consent` initialization logic. If the
     */
    _initSyncStorageTimeoutAC: null,

    /**
     * A promise signaling that the `consent` object has completed initialization
     * and is now ready to provide consent-related functionality to other parts of
     * the application.
     */
    ready: undefined,

    /**
     * Retrieves the current grant state for access to personal user data. If the
     * user has not explicitly provided or denied consent, consent has not been
     * granted.
     */
    get personal() {
      if (!(consent._grants && Reflect.has(consent._grants, "personal"))) {
        return CONSENT_DEFAULTS["consent.grants"].personal;
      } else {
        return consent._grants.personal;
      }
    },

    /**
     * Retrieves the current grant state for access to anonymous user data. If the
     * user has not explicitly provided or denied consent, consent has not been
     * granted.
     */
    get anonymous() {
      if (!(consent._grants && Reflect.has(consent._grants, "anonymous"))) {
        return CONSENT_DEFAULTS["consent.grants"].anonymous;
      } else {
        return consent._grants.anonymous;
      }
    },

    async _loadSyncStorageData() {
      const data = await browser.storage.sync.get(["consent.grants"]);
      consent._grants = data["consent.grants"];

      return Reflect.has(data, "consent.grants");
    },

    _handleSyncStorageChange(changes, areaName) {
      // Only proceed if the changes are in the right storage area and changes
      // contain a record we care about.
      if (!(areaName === "sync" && Reflect.has(changes, "consent.grants"))) return;

      const grantChanges = changes["consent.grants"];
      const oldKeys = Object.keys(grantChanges.oldValue || {});
      const newKeys = Object.keys(grantChanges.newValue || {});
      const deletedKeys = oldKeys.filter(i => !newKeys.includes(i));

      if (consent._grants === undefined) {
        consent._grants = {};
      }

      // Apply all new grant values
      for (const key of newKeys) {
        consent._grants[key] = grantChanges.newValue[key];
      }

      // Remove any deleted grants
      for (const key of deletedKeys) {
        delete consent._grants[key];
      }

      //// Send out notifications to other parts of the library

      // Cancel the initialization timeout if necessary
      if (Reflect.has(grantChanges, "newValue")) {
        consent._initSyncStorageTimeoutAC?.abort("User consent values populated.");
      }

      // Notify listeners that grants have changed –
      consent._dispatchUserConsentChange();
    },

    showConsentDialogImmediately() {
      const url = browser.runtime.getURL("consent/index.html");
      browser.tabs.create({ url });
    },

    /**
     * Show the consent dialog if the internal consent state has not been
     * explicitly set by the user.
     *
     * @returns Promise<boolean> - Whether or not the consent dialog was shown.
     */
    async showConsentDialog() {
      if (consent.hasUserSetConsent()) return false;
      await consent.ready;
      if (consent.hasUserSetConsent()) return false;
      consent.showConsentDialogImmediately();
      return true;
    },

    hasUserSetConsent() {
      if (!consent._grants) return false;
      return Reflect.has(consent._grants, "personal") && Reflect.has(consent._grants, "anonymous");
    },

    setConsent(type, value) {
      if (!["personal", "anonymous"].includes(type)) {
        throw new Error(`Invalid consent type: "${type}". Expected "personal" or "anonymous".`);
      }
      consent._grants[type] = value;
    },

    /**
     * Initialize the `consent` object. We expect that this function will only be
     * called once per JS execution context, but have some basic guards in place
     * just in case.
     */
    _init() {
      consent.ready = (async function () {
        if (consent.ready === undefined) {
          // Only bind the storage change listener once
          browser.storage.onChanged.addListener(consent._handleSyncStorageChange);

          const syncStorageRecordExists = await consent._loadSyncStorageData();
          if (!syncStorageRecordExists) {
            await consent._syncStorageInitialization();
          }
        }
      })();
      return consent.ready;
    },

    flush() {
      consent._grants.lastUpdated = Date.now();
      if (consent.hasUserSetConsent()) {
        consent._dispatchUserConsentChange();
      }
      return browser.storage.sync.set({ "consent.grants": consent._grants });
    },

    /**
     * Wait for consent data to populate in sync storage (with a timeout).
     */
    async _syncStorageInitialization(duration = CONSENT_DEFAULTS.syncStorageInitializationTimeout) {
      // Check if `_grants` is defined. If it's an object, data from
      // `storage.sync` has been loaded & initialization is complete. If not, we
      // don't know if `storage.sync` needs more time to load or consent data has
      // not yet been written to this storage area. Wait a short period before
      // proceeding just in case it gets populated asynchronously.
      if (consent._grants === undefined) {
        const ac = new AbortController();
        consent._initSyncStorageTimeoutAC = ac;
        // timeout() rejects when aborted, so catch & ignore the abort reason
        await timeout(duration, {signal: ac.signal}).catch(noop);
        // Clear to avoid re-calling the abort logic in `_handleSyncStorageChange`
        consent._initSyncStorageTimeoutAC = null;

        // Okay, times up! Check `_grants` again
        if (consent._grants === undefined) {
          // We have to assume that this is the first time the extension has ever
          // run on this profile on any synced device. To avoid waiting again in
          // the future, let's write a default object to storage so we have some
          // sync-able indication that the extension exists.
          consent._grants = {};
          consent.flush();
        }
      }
    },

    _onUserConsentChangeCallbacks: new Set(),

    set onUserConsentChange(callback) {
      consent._onUserConsentChangeCallbacks.add(callback);
    },

    set removeUserConsentChange(callback) {
      consent._onUserConsentChangeCallbacks.delete(callback);
    },

    _lastDispatchedConsentChange: 0,
    _dispatchUserConsentChange() {
      // Both `flush()` and `_handleSyncStorageChange()` trigger dispatches. Guard
      // against sending duplicate updates by tracking the last update timestamp.
      if (consent._lastDispatchedConsentChange === consent._grants.lastUpdated) return;
      consent._lastDispatchedConsentChange = consent._grants.lastUpdated;

      const grants = {
        personal: consent.personal,
        anonymous: consent.anonymous,
      };

      for (const cb of consent._onUserConsentChangeCallbacks) {
        try {
          cb(grants);
        } catch (e) {
          // Catch and log errors so we can continue dispatching to other listeners.
          console.error(e);
        }
      }
    }
  };

  consent._init().catch(e =>
    console.error("Failed to initialize consent library", e));

  return consent;
})();
