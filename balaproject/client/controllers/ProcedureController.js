angular.module('tatluApp').controller('ProcedureController', function($scope, $http) {


    $scope.RefreshProcedure = function () {
          $http.get('/prcd/prcd').success(function (response) {
              $scope.procedureList = response;
              $scope.pro="";
          });

      };

     $scope.RefreshProcedure();



      $scope.SaveProcedure=function(){


      $http.post('/prcd/prcd', $scope.pro).success(function (response) {
      console.log(response);
      alert("Procedure saved!!!!");
location.reload(true);
      		//	$scope.RefreshProcedure();
      	});
      }




});
