angular.module('tatluApp').controller('rulesController', function($scope, $http,$cookies,AuthenticationService,$location) {

  var refreshrules = function () {
        $http.get('/rules/rules').success(function (response) {
            $scope.ruleslist = response;
              $scope.rules ="";
        });
    };
    refreshrules();


    $scope.addrules = function(){
    $http.post('/rules/rules', $scope.rules).success(function (response) {
    console.log(response);
    alert("Registration completed!!!!");
        refreshrules();
    });
  };


});
