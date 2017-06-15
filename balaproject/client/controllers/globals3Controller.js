angular.module('tatluApp').controller('globals3Controller', function($scope, $http,$location) {

  $scope.refreshglobals3 = function () {
        $http.get('/globals3/globals3').success(function (response) {
            $scope.global3list = response;
              $scope.global3 ="";
        });
    };
  $scope.refreshglobals3();

$scope.minichar = ['3','4','5'];
$scope.maxichar = ['15','18','20'];

    $scope.addGlobalSetting3 = function(){
    $http.post('/globals3/globals3', $scope.global3).success(function (response) {
    console.log(response);
    alert("Registration completed!!!!");
    $location.path('/globals')

        //refreshglobals3();
    });
  };





});
