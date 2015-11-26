var config = {
           // client_id: "AppsWorld",
            client_id: "AppsWorldTokenManager",
            redirect_uri: window.location.protocol + "//" + window.location.host + "/",
            post_logout_redirect_uri: window.location.protocol + "//" + window.location.host + "/",
            response_type: "id_token token",
            scope: "openid profile email role companyId",
           //  authority: "https://awidentityind.azurewebsites.net/identity",
            authority: "https://49.207.6.75/identity",
            //authority: "https://awidentity.azurewebsites.net/identity",
            silent_redirect_uri: window.location.protocol + "//" + window.location.host + "/frame.html",
            silent_renew: true

            //client_id: "appsworldlocaldev",
            ////client_id: "AppsWorldTokenManager",
            //redirect_uri: window.location.protocol + "//" + window.location.host + "/appsworlddev",
            //post_logout_redirect_uri: window.location.protocol + "//" + window.location.host + "/appsworlddev",
            //response_type: "id_token token",
            //scope: "openid profile email role companyId",
            ////  authority: "https://awidentityind.azurewebsites.net/identity",
            //authority: "https://49.207.6.75/identity",
            //// authority: "https://awidentity.azurewebsites.net/identity",
            //silent_redirect_uri: window.location.protocol + "//" + window.location.host + "/appsworlddev/frame.html",
            //silent_renew: true

            //client_id: "appsworlduat",
            //redirect_uri: window.location.protocol + "//" + window.location.host + "/appsworlduat",
            //post_logout_redirect_uri: window.location.protocol + "//" + window.location.host + "/appsworlduat",
            //response_type: "id_token token",
            //scope: "openid profile email role companyId",
            //authority: "https://awidentityuat.azurewebsites.net/identity",
            //silent_redirect_uri: window.location.protocol + "//" + window.location.host + "/appsworlduat/frame.html",
            //silent_renew: true
        };
        var mgr = new OidcTokenManager(config);
        if (!mgr.expired) {
           
        }
       else if (window.location.hash) {
            //alert(gettokenid());
            if(gettokenid() != null){
                mgr.processTokenCallbackAsync().then(function () {
                    //console.log("Successfully Obtained Token", mgr.access_token);
                }, function (error) {
                    //console.error("Problem Getting Token : " + (error.message || error));
                });
            }else{
                //alert("redirectForToken");
                mgr.redirectForToken();
            }
           }
           else if (mgr.expired) {
            window.localStorage.removeItem('userInfo');
            mgr.redirectForToken();
        }

        function gettokenid() {
            var hash = window.location.hash.substr(1);
            //if(hash.contains('id_Token')!==-1)
            var result = hash.split('&').reduce(function (result, item) {
                var parts = item.split('=');
                result[parts[0]] = parts[1];
                return result;
            }, {});

            //alert(result);
            if (result.id_token || result.access_token) {
                id_token = result.id_token;
                return id_token;
            }
        }

        function logout() {
            window.localStorage.removeItem('userInfo');
            mgr.redirectForLogout();
        }
   
