"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var Msal = require("@azure/msal-browser");
var msal = Msal;
var loginRequest = {
    scopes: ['openid', 'profile', 'email', 'https://accounts.fusyona.com/api/WriteUserProfileAPI',
        "https://accounts.fusyona.com/api/ReadUserProfileAPI"]
};
var msalConfig = {
    auth: {
        clientId: 'eb936707-593e-49d3-8028-10760d5b9b29',
        authority: 'https://accounts.fusyona.com/f914162d-c0c3-490b-93d5-1d8cfe1a4799/B2C_1_SignUpIn',
        knownAuthorities: ['accounts.fusyona.com'],
        redirectUri: '/'
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false
    },
    system: {
        loggerOptions: {
            loggerCallback: function (level, message, containsPii) {
                console.log(message);
                return;
            }
        }
    }
};
var msalInstance = null, accessToken = null;
function startUp() {
    console.log("start up");
    msalInstance = new msal.PublicClientApplication(msalConfig);
    console.log(msalInstance);
    // setTimeout; workaround; for refreshing page after login;
    setTimeout(function () {
        acquireToken();
        msalInstance.handleRedirectPromise()
            .then(function (res) {
            console.log(res);
        })["catch"](function (err) {
            console.error(err);
        });
    }, 1000);
}
function acquireToken() {
    console.log("tetando adquirir token");
    msalInstance.acquireTokenSilent(__assign({}, loginRequest)).then(function (response) {
        console.log(response);
    })["catch"](function (error) {
        console.log("error adquirir token");
        msalInstance.loginRedirect(__assign({}, loginRequest)).then(function () {
            console.log("Logout");
        });
    });
}
startUp();
