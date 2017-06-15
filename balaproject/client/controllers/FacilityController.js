angular.module('tatluApp').controller('FacilityController', function($scope, $http) {

$scope.addShow=true;
$scope.editShow=true;
$scope.delShow=true;


	var refreshfac = function () {
        $http.get('/formAcc/formAcc').success(function (response) {
            $scope.formList = response;

var i;
for(i=0;i<$scope.formList.length;i++){

if($scope.formList[i].doctorRegAdd!=true){
	$scope.addShow=false;
}else{
	$scope.addShow=true;

}
if($scope.formList[i].doctorRegEdit!=true){
	$scope.editShow=false;
}else{
	$scope.editShow=true;

}
if($scope.formList[i].doctorRegDel!=true){
	$scope.delShow=false;
}else{
	$scope.delShow=true;

}



}



        });
    };

    refreshfac();

		var refreshfacility = function () {
	        $http.get('/facility/facility').success(function (response) {
	            console.log(' READ IS SUCCESSFUL');
	            $scope.FacilityList = response;

							var m;


							for(m=0;m<$scope.FacilityList.length;m++){

	$scope.arraylist=$scope.FacilityList[m].Type;
	console.log($scope.arraylist);


							}

	            $scope.facility = "";
	        });
	    };

	    refreshfacility();




$scope.Savefacility=function(){


$http.post('/facility/facility',$scope.facility).success(function (response) {
console.log(response);
alert("Facility Registration completed!!!!");

			refreshfacility();
	});
}








});
