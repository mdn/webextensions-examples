This directory contains a semi-static version of a consent experience. It tracks two types of data collection consent:

- `personal` -
  This is personally identifying information.
  As configured, the extension requires that the user provide consent for this data.
  If the user rejects the consent rejects, the extension will uninstall itself.
- `anonymous` -
  This is anonymized data about the user.
  Consent for this type of data cannot be required.

# Consent window

- `index.html`
- `index.js`
- `index.css`

These files combine to form the consent screen presented to users after the extension is installed and, optionally, when the user chooses to invoke it from
