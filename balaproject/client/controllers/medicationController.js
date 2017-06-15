angular.module('tatluApp').controller('medicationController', function($scope, $http) {

$scope.RefreshMedi = function () {
          $http.get('/medi/medi').success(function (response) {
              $scope.mediList = response;
              $scope.medi="";
          });
      };

      $scope.RefreshMedi();

$scope.addMedication=function(){

  $http.post('/medi/medi',$scope.medi).success(function (response) {
  console.log(response);
  alert("Medication saved!!!!");

        $scope.RefreshMedi();
    });


};

$scope.removeMedication = function(m) {
    //console.log(id);
    $http.delete('/medi/medi/' + m._id).success(function(response) {
        console.log(response);
        $scope.RefreshMedi();
    });
};


$scope.updateMedi=false;

$scope.editMedication = function(m) {
    $http.get('/medi/medi/' + m._id).success(function(response) {
        $scope.medi = response[0];
        $scope.updateMedi=true;

    });
};

$scope.updateMedication= function() {
    console.log($scope.medi._id);
    $http.put('/medi/medi/' + $scope.medi._id, $scope.medi).success(function(response) {
        console.log(response);
        $scope.updateMedi=false;
        $scope.RefreshMedi();

    })
}



});
