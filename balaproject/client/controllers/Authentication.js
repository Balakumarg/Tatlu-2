'use strict';
angular.module('tatluApp').factory('AuthenticationService', Service);

function Service($http, $cookies, $sessionStorage) {
    var service = {};
    service.Login = Login;
    service.Logout = Logout;
    return service;

    function Login(user, callback) {
        $http.post('/api/login', user)
            .then(function(response) {
                if (response.data.success && response.data.token) {
                  location.reload();

                    $sessionStorage.tokenDetails = {
                        token: response.data.token
                    };
                    $http.defaults.headers.common.Authorization = response.data.token;
                    var obj = {
                        currentUser: {
                            isLoggedIn: true,
                            userInfo: {
                                Objid: response.data.userDetail._id,
                                Id: response.data.userDetail.id,
                                fname: response.data.userDetail.firstName,
                                Username: response.data.userDetail.userName,
                                mobileNo: response.data.userDetail.mobile,
                                usertype: response.data.userDetail.UserType,
                                    dp: response.data.userDetail.profileImage
                            }
                        }
                    };
                    $cookies.putObject('authUser', obj);
                    callback(response);
                } else {
                    callback(response);
                }
            });
    }


    function Logout() {
        delete $sessionStorage.tokenDetails;
        $http.defaults.headers.common.Authorization = '';
        $cookies.remove('authUser');
          location.reload();

    }
}
