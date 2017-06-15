angular.module('tatluApp').controller('HomeController', function($scope, $http, $rootScope, $location,$filter) {

  var refreshDoctor = function () {
        $http.get('/doctor/doctor').success(function (response) {
            $scope.doctorlist = response;
        });

    };

    refreshDoctor();

    var refreshfacility = function () {
          $http.get('/facility/facility').success(function (response) {
              console.log(' READ IS SUCCESSFUL');
              $scope.FacilityList = response;
            });
          };
           refreshfacility();
           

  	$scope.onSelect = function(selection) {
  		console.log(selection);
  		$scope.selectedData = selection;
  	};


    var i;

$scope.search=function(){
    $rootScope.loc=$scope.selectedlocation;
    $rootScope.doc=$scope.selecteddoctor;
    $location.path('/doctorlist');
}


  });
