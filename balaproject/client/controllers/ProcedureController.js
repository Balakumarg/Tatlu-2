angular.module('tatluApp').controller('ProcedureController', function($scope, $http) {


    var refreshProcedure = function () {
          $http.get('/prcd/prcd').success(function (response) {
              $scope.procedureList = response;
              $scope.pro="";
          });
      };

      refreshProcedure();



      $scope.SaveProcedure=function(){


      $http.post('/prcd/prcd',$scope.pro).success(function (response) {
      console.log(response);
      alert("Procedure saved!!!!");

      			refreshProcedure();
      	});
      }




});
