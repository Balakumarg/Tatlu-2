angular.module('tatluApp').controller('memberselectController', function($scope, $http,$rootScope,$cookies,AuthenticationService,$location) {

  $scope.refreshpat=function(){
    $http.get('/patient/patient').success(function (response) {
        $scope.patientList = response;
        $scope.patient={};
        $scope.getpatient="";

    });
  }

$scope.refreshpat();

$scope.getpatient=$rootScope.petientDetails;

$scope.getpatient.membershipType="Non-Member";

  $scope.SaveNon=function(){
    $http.put('/patient/patient/' + $scope.getpatient._id, $scope.getpatient).success(function(response) {
        console.log(response);
        $scope.refreshpat();
    })
  }



  $scope.table = { fields: [] };

  $scope.addFormField = function() {
    $scope.table.fields.push('');
  }

  $scope.submitTable = function() {
    console.log($scope.table);
  }



});
