angular.module('tatluApp').controller('globalsController', function($scope, $http,$location) {

  $scope.refreshglobals = function () {
        $http.get('/globals/globals').success(function (response) {
            $scope.globallist = response;
              $scope.global ="";
        });
    };
  $scope.refreshglobals();

 $scope.calender = ['Type 1', 'Type 2','Type 3'];
  $scope.layout = ['Type 1', 'Type 2','Type 3'];
  $scope.theme = ['Type 1', 'Type 2','Type 3'];
    $scope.patform = ['Type 1', 'Type 2','Type 3'];

    $scope.addGlobalSetting = function(){
    $http.post('/globals/globals', $scope.global).success(function (response) {
    console.log(response);
    // alert("Registration completed!!!!");
    $location.path('/globals2')
      //  refreshglobals();
    });
  };





});
