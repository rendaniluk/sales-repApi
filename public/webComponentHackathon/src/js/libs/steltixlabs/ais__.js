define(['jquery'], function($) {
  
      /*
       * authentcate() only sends one token request at a time, even when called multiple times
       * _fetch*() functions do the actual fetching
       * fetch*() functions authenticate and then use _fetch*() to fetch, using the following logic:
       *      If there's a saved token, use it to fetch the data. If it didn't work, fetch a new token and try using that to fetch the data. 
       *      If token fetching failed, then give up and do not fetch another token. i.e. retry once, then give up
       * they do this by passing _fetch*() functions to retryIfNeeded()
       */
  
      var alreadyAuthenticating = false; //so simultaneous authentication calls will not send multiple token requests
      
      var contentType = "application/json";
      
      const maxRows = 10000;
      
      //holds the mappings between forms and versions
      //e.g. P90CA070_W90CA070B -> ZJDE0001
      var versionMap = new Map();
      
      function setVersionMap(map) {
          versionMap = map;
          console.log("Set version map to:");
          console.log(versionMap);
      }
      
      function getVersion(form) {
          var tmp = versionMap.get(form);
          if (tmp !== undefined) {
              return tmp;
          } else {
              return "ZJDE0001"; //default version
          }
      }
      
      function setLegacyMode(enabled) { //for older versions of AIS?
          if (enabled === true) {
              contentType = "application/www-form-urlencoded";
              console.log("Set legacy mode to true. All requests will have content-type application/www-form-urlencoded");
          } else if (enabled === false) {
              contentType = "application/json";
              console.log("Set legacy mode to false. All requests will have content-type application/json");
          } else {
              console.error("Must pass a boolean value to setLegacyMode");
          }
      }
      
      function retryIfNeeded(funcToRetry, args) {
          return new Promise(function _try(resolve, reject) {
              if (sessionStorage.getItem("token") !== null) { //if a token already exists
                  funcToRetry.apply(null, args).then((data) => { //token worked
                      resolve(data);
                  }).catch((err) => { //token did not work
                      console.log("Saved token invalid");
                      authenticate().then(() => { //get new token
                          _try(resolve, reject); //try again
                      }).catch((err) => { //first token didn't work, couldn't fetch new token
                          console.error("Error while authenticating in retryIfNeeded()");
                          console.error(err);
                          reject(err);
                      });
                  });
              } else { //if no token exists
                  authenticate().then(() => { //get a token
                      funcToRetry.apply(null, args).then((data) => { //try the token
                          resolve(data);
                      }).catch((err) => { //couldn't fetch token
                          console.error("Error while initially authenticating in retryIfNeeded()");
                          console.error(err);
                          reject(err);
                      });
                  }).catch((err) => {
                      reject(err);
                  });
              }
          });
      }
      
      function authenticate() {
  
          return new Promise((resolve, reject) => {
              if (alreadyAuthenticating) {
                  document.addEventListener("authSuccess", () => {
                      resolve();
                  });
                  document.addEventListener("authFailure", () => {
                      reject();
                  });
              } else {
                  console.log("Authenticating");
                  alreadyAuthenticating = true;
  
                  var username = sessionStorage.getItem("username"); //jdesys
                  var password = sessionStorage.getItem("password"); //steltixE1
                  var aisUrl = sessionStorage.getItem("aisUrl"); //http://sandbox921.steltix.com/jderest/tokenrequest/
  
                  if (!(username && password && aisUrl)) { //if no credentials supplied
                      alreadyAuthenticating = false;
                      console.log("No credentials supplied while getting token");
                      reject("No credentials supplied");
                  } else {
                      $.post({
                          data: JSON.stringify({
                              username: username,
                              password: password,
                              deviceName: "blankDashboard"
                          }),
                          contentType: contentType,
                          url: aisUrl + "/jderest/tokenrequest",
                          success: (data) => {
                              var token = data.userInfo.token;
                              var addressNumber = data.userInfo.addressNumber;
  
                              sessionStorage.setItem("token", token);
                              sessionStorage.setItem("addressNumber", addressNumber);
  
                              document.dispatchEvent(new CustomEvent("authSuccess", {
                                  detail: username
                              }));
                              alreadyAuthenticating = false;
  
                              console.log("Saved token %s and addressNumber %s to sessionStorage", token, addressNumber);
                              resolve();
                          },
                          error: (data) => {
                              console.log(data);
  
                              document.dispatchEvent(new Event("authFailure"));
                              alreadyAuthenticating = false;
  
                              reject(data);
                          }
                      });
                  }
              }
          });
      }
  
     
      return {
          authenticate: authenticate,
          setLegacyMode: setLegacyMode,
          setVersionMap: setVersionMap
      }
  });