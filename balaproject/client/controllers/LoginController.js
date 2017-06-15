angular.module('tatluApp').controller('LoginController', function($scope, $http,AuthenticationService,$location) {

$scope.LogIn = function() {
    AuthenticationService.Login($scope.User, function(response) {

$scope.response=response.data;

$scope.errormessage=$scope.response.message;
        if (response.data.success === true) {
          if(response.data.userDetail.UserType=="Patient"){

              $location.path('/nursehome');

          }
          if(response.data.userDetail.UserType=="Admin"){

              $location.path('/usermanagement');
          }
          if(response.data.userDetail.UserType=="Doctor"){

              $location.path('/visit');
          }
          if(response.data.userDetail.UserType=="Nurse"){

              $location.path('/nursehome');
          }
          if(response.data.userDetail.UserType=="Callcenter"){

              $location.path('/nursehome');
          }
          if(response.data.userDetail.UserType=="Frontdesk"){

              $location.path('/nursehome');
          }
          if(response.data.userDetail.UserType=="FacilityAdmin"){

              $location.path('/nursehome');
          }

        }
    });
};



});
