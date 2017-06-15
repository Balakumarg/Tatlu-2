angular.module('tatluApp').controller('globals2Controller', function($scope, $http,$location) {

  $scope.refreshglobals2 = function () {
        $http.get('/globals2/globals2').success(function (response) {
            $scope.global2list = response;
              $scope.global2 ="";
        });
    };
    $scope.refreshglobals2();

 $scope.calender = ['Type 1', 'Type 2','Type 3'];
$scope.interval = ['15 minutes', '30 minutes','45 minutes','1 Hour'];
 $scope.appmntstyle = ['Last name,First name', 'First name,Last name'];



    $scope.addGlobalSetting2 = function(){
    $http.post('/globals2/globals2', $scope.global2).success(function (response) {
    console.log(response);
    // alert("Registration completed!!!!");
    $location.path('/globals3')
    //  $scope.refreshglobals2();
    });
  };





});
