angular.module('tatluApp').controller('managelayoutController', function($scope, $http) {

  var refreshmanagelayout = function () {
        $http.get('/managelayout/managelayout').success(function (response) {
            $scope.managelayoutlist = response;
              $scope.managelayout ="";
        });
    };
    refreshmanagelayout();


    $scope.addlayoutSetting = function(){
    $http.post('/managelayout/managelayout', $scope.managelayout).success(function (response) {
    console.log(response);
    alert("Registration completed!!!!");
        refreshmanagelayout();
    });
  };


});
