angular.module('tatluApp').controller('VisitController', function($scope, $http) {

  $scope.RefreshVisit = function () {
        $http.get('/visit/visit').success(function (response) {
            console.log(' READ IS SUCCESSFUL');
            $scope.visitList = response;
            $scope.visit = "";
        });
    };

    $scope.RefreshVisit();

$scope.addVisit=function(){
if ($scope.visitForm.$valid) {
        var date = new Date();
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        var am_pm = date.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var  time = hours + ":" + minutes + ":"  + am_pm;

      $scope.visit.visitTime=time;

$http.post('/visit/visit', $scope.visit).success(function (response) {
console.log(response);
alert("Visit Saved!!!!");

      $scope.RefreshVisit();
  });
}
}


});
