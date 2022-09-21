import * as Msal from "@azure/msal-browser";

const msal = Msal; 
  const loginRequest = {
  scopes: ['openid', 'profile', 'email', 'https://accounts.fusyona.com/api/WriteUserProfileAPI'
    , "https://accounts.fusyona.com/api/ReadUserProfileAPI"],
  };

  var msalConfig  = {
  auth: {
    clientId: 'eb936707-593e-49d3-8028-10760d5b9b29',
    authority: 'https://accounts.fusyona.com/f914162d-c0c3-490b-93d5-1d8cfe1a4799/B2C_1_SignUpIn',
    knownAuthorities: ['accounts.fusyona.com'],
    redirectUri: '/',
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        console.log(message);
    return;
      },
    },
  },
};


  var msalInstance = null,
    accessToken = null;

  function startUp() {
    console.log("start up")

    msalInstance = new msal.PublicClientApplication(msalConfig);
      console.log(msalInstance)
    // setTimeout; workaround; for refreshing page after login;
    setTimeout(function() {
        acquireToken();
          msalInstance.handleRedirectPromise()
            .then(res=>{
            console.log(res)
            })
            .catch(err => {
            console.error(err);
            });
    }, 1000);
  }

  function acquireToken() {
    console.log("tetando adquirir token");
     msalInstance.acquireTokenSilent({
           ...loginRequest,
         }).then((response) => {
          console.log(response);
         }).catch((error) => {
      console.log("error adquirir token");
      msalInstance.loginRedirect({ ...loginRequest }).then(() => {
              console.log("Logout");
            });
         });
  }
  
  startUp();