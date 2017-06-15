angular.module('tatluApp').controller('UserManagementController', function($scope, $http) {

  var refreshdoctor = function () {
        $http.get('/doctor/doctor').success(function (response) {
            console.log(' READ IS SUCCESSFUL');
            $scope.doctorlist = response;
            $scope.doctor = "";
        });
    };

    refreshdoctor();

    var refreshnurse = function () {
          $http.get('/nurse/nurse').success(function (response) {
              console.log(' READ IS SUCCESSFUL');
              $scope.nurselist = response;
              $scope.nurse="";
          });
      };

      refreshnurse();

      var refreshncal = function () {
            $http.get('/cal/cal').success(function (response) {
                console.log(' READ IS SUCCESSFUL');
                $scope.callist = response;
                $scope.nurse="";
            });
        };

        refreshnurse();





      var refreshMenu = function () {
            $http.get('/menu/menu').success(function (response) {
                console.log(' READ IS SUCCESSFUL');
                $scope.menuList = response;

            });
        };

        refreshMenu();


    $scope.addDoctor = function () {
//       $scope.doctor.id='DR' + Math.random().toString(10).substr(2,5);
//
// $scope.myFile.id=$scope.doctor.id;
//
// console.log($scope.myFile);
//
//
//
//       var file = $scope.myFile;
//       console.log(file);
//       var uploadUrl = "/savedata";
//       fileUpload.uploadFileToUrl(file, uploadUrl);
// var x=Date.now();
// console.log(x);
//
// $scope.doctor.profileImage=$scope.myFile.name;
if($scope.doctor.Password===$scope.doctor.cPassword){
  $http.post('/doctor/doctor', $scope.doctor).success(function (response) {
console.log(response);
alert("Registration completed!!!!");

      refreshdoctor();
  });
}else{

alert("Your password is not matching...Try again");

}


      };

$scope.addNurse=function(){


      if($scope.nurse.Password===$scope.nurse.cPassword){
        $http.post('/nurse/nurse', $scope.nurse).success(function (response) {
        console.log(response);
        alert("Registration completed!!!!");

            refreshT();
        });
      }else{

      alert("Your password is not matching...Try again");

      }
}

$scope.addCallcenter=function(){

  if($scope.call.Password===$scope.call.cPassword){
    $http.post('/cal/cal', $scope.call).success(function (response) {
  console.log(response);
  alert("Registration completed!!!!");

        refreshType();
    });
  }else{

  alert("Your password is not matching...Try again");

  }
}


$scope.addFrontdesk=function(){

  if($scope.front.Password===$scope.front.cPassword){
    $http.post('/front/front', $scope.front).success(function (response) {
  console.log(response);
  alert("Registration completed!!!!");

        refreshType();
    });
  }else{

  alert("Your password is not matching...Try again");

  }
}


$scope.addFacilityAdmin=function(){

  if($scope.facilityAdm.Password===$scope.facilityAdm.cPassword){
    $http.post('/facilityadm/facilityadm', $scope.facilityAdm).success(function (response) {
  console.log(response);
  alert("Registration completed!!!!");

        refreshType();
    });
  }else{

  alert("Your password is not matching...Try again");

  }
}




});
