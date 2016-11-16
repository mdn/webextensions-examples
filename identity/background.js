
let providers = {
  facebook: {
    clientId: '1094807753900920',
    clientSecret: '3d4af261312493c4397e8003c9139500',
    token: null,
    user_info: null,

    clear() {
      this.user_info = null;
      this.token = null;
    },

    getAuthURL(redirectURL) {
      return 'https://www.facebook.com/dialog/oauth?client_id=' + this.clientId +
             '&reponse_type=token&access_type=online&display=popup' +
             '&redirect_uri=' + encodeURIComponent(redirectURL);
    },

    exchangeCodeForToken(code, redirectURL) {
      return new Promise((resolve, reject) => {
        let url = 'https://graph.facebook.com/oauth/access_token?' +
                  'client_id=' + this.clientId +
                  '&client_secret=' + this.clientSecret +
                  '&redirect_uri=' + encodeURIComponent(redirectURL) +
                  '&code=' + code;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = (e) => {
          let r = e.target;
          if (r.status === 200) {
            let response = JSON.parse('"'+r.responseText+'"');
            let params = new URLSearchParams(response);
            this.token = params.get("access_token");
            resolve(this.token);
          } else {
            reject([r.status, r.responseText]);
          }
        };
        xhr.onerror = (e) => {
          let r = e.target;
          let response = JSON.parse('"'+r.responseText+'"');
          reject([r.status, response]);
        };
        xhr.send(null);
      });
    },

    authResult(params, redirectUri) {
      return new Promise((resolve, reject) => {
        if (params.get("error")) {
          reject(new Error(params.get("error_description")));
        } else if (params.get("access_token")) {
          this.token = params.get("access_token");
          resolve(this.token);
        } else if (params.get("code")) {
          this.exchangeCodeForToken(params.get("code"), redirectUri).then(resolve).catch(error => {
            reject(new Error(error));
          });
        } else
          reject(new Error("Invalid response, no code or token"));
      });
    },

    getUserInfo(interactive) {
      return new Promise((resolve, reject) => {
        if (this.user_info) {
          resolve(this.user_info);
          return;
        } else
        if (!interactive) {
          reject(new Error("user not logged in"));
          return;
        }
        xhrWithAuth(this, 'GET', 'https://graph.facebook.com/me', interactive).then(response => {
          this.user_info = JSON.parse(response.response);
          resolve(this.user_info);
        });
      });
    }
  },
  google: {
    clientId: "457987252532-cag55ui6oeopjfs73ajcmd13un7jklmk.apps.googleusercontent.com",
    scopes: ["openid", "email", "profile"],
    token: null,
    user_info: null,

    clear() {
      this.user_info = null;
      this.token = null;
    },

    getAuthURL(redirectURL) {
      return 'https://accounts.google.com/o/oauth2/auth' +
             '?client_id=' + this.clientId +
             '&response_type=token' +
             '&redirect_uri=' + encodeURIComponent(redirectURL) +
             '&scope=' + encodeURIComponent(this.scopes.join(' '));
    },

    verifyToken(token) {
      return new Promise((resolve, reject) => {
        let url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + token;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = (e) => {
          let r = e.target;
          if (r.status === 200) {
            resolve(JSON.parse(r.responseText));
          } else {
            reject([r.status, r.responseText]);
          }
        };
        xhr.onerror = (e) => {
          let r = e.target;
          let response = JSON.parse('"'+r.responseText+'"');
          reject([r.status, response]);
        };
        xhr.send(null);
      });
    },

    authResult(params, redirectUri) {
      return new Promise((resolve, reject) => {
        if (params.get("error")) {
          reject(new Error(params.get("error_description")));
        } else if (params.get("id_token")) {
          this.token = params.get("id_token");
          resolve(this.token);
        } else if (params.get("access_token")) {
          let token = params.get("access_token");
          this.verifyToken(token).then(verified => {
            // TODO verify the data
            // https://developers.google.com/identity/protocols/OAuth2UserAgent
            this.verified = verified;
            this.token = token;
            resolve(this.token);
          });
        } else
          reject(new Error("Invalid response, no code or token"));
      });
    },

    getUserInfo(interactive) {
      return new Promise((resolve, reject) => {
        if (this.user_info) {
          resolve(this.user_info);
          return;
        } else
        if (!interactive) {
          reject(new Error("user not logged in"));
          return;
        }
        xhrWithAuth(this, 'GET', 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json', interactive).then(response => {
          this.user_info = JSON.parse(response.response);
          resolve(this.user_info);
        });
      });
    }
  },
};

function parseSearchParams(redirectUri) {
  let m = redirectUri.match(/[#\?](.*)/);
  if (!m || m.length < 1)
    return {};
  return new URLSearchParams(m[1].split("#")[0]);
}

function authorize(provider, interactive) {
  let redirectUri = chrome.identity.getRedirectURL('/provider_cb');

  return new Promise((resolve, reject) => {
    if (provider.token) {
      resolve(provider.token);
      return;
    }

    let options = {
      interactive: interactive,
      url: provider.getAuthURL(redirectUri)
    };

    browser.identity.launchWebAuthFlow(options, function(redirectURL) {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      let params = parseSearchParams(redirectURL);
      provider.authResult(params, redirectUri).then(resolve);
    });
  });
}

function xhrWithAuth(provider, method, url, interactive) {
  return new Promise((resolve, reject) => {
    authorize(provider, interactive).then((token) => {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      xhr.onload = () => {
        (xhr.status == 200 ? resolve : reject)({ status: xhr.status, response: xhr.response });
      };
      xhr.onerror = () => {
        reject({ status: xhr.status, response: xhr.response });
      };
      xhr.send();
    });
  });
}


function notify(message) {
  switch(message.type) {
    case "getUserInfo":
      providers[message.provider].getUserInfo(message.interactive).then(user => {
        chrome.runtime.sendMessage({"user": user});
      });
      break;
    case "removeCachedToken":
      providers["facebook"].clear();
      providers["google"].clear();
      break;
  }
}
chrome.runtime.onMessage.addListener(notify);

function openPage() {
  chrome.tabs.create({
    "url": chrome.extension.getURL("index.html")
  });
}
chrome.browserAction.onClicked.addListener(openPage);
