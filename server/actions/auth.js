/* 
World Bank API
Created by Engagement Lab, 2015
==============
 auth.js
 Game Auth (currently via key)

 Created by Johnny Richardson on 4/2/15.
==============
*/

exports.apiAuth = {
  name: "apiAuth",
  description: "auth",
  inputs: {
      required: ["key"]
  },
  blockedConnectionTypes: [],
  outputExample: {},
  run: function(api, data, next) {

    var dataInput = data.connection.rawConnection.params.body;

    data.response.authed = false;

    if (dataInput.key == undefined) {
      data.response.error = "no key specified";
      next();
    }
    else if (api.config.general.serverToken != dataInput.key) {
      data.response.error = "incorrect server key";
      next();
    }
    else {
        api.session.generateAuth(
          data.connection,
          function() {
            data.response.authed = true;
            data.response.session_cookie = data.connection.fingerprint;
            next();
          }, 
          'client'
        );
      }
  }

};