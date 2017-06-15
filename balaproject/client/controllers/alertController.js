angular.module('tatluApp').controller('alertController', function($scope, $http) {

  var refreshalert = function () {
        $http.get('/rules/rules').success(function (response) {
            $scope.alertlist = response;
              $scope.alert ="";
        });
    };
    refreshalert();



    $scope.addalert = function(a){

      $scope.a=a;
      $http.put('/rules/rules/'+$scope.a._id ,$scope.a).success(function (response) {
        console.log(response);
        alert("Updated!!!!");
        refreshalert();
    });

  };

  $scope.delalert = function(a){

    $scope.b=a;
    $http.delete('/rules/rules/'+$scope.b._id ).success(function (response) {
      console.log(response);
      alert("Deleted!!!!");
      refreshalert();
  });

  };







});
