angular.module('tatluApp').controller('UserManagementController', function($scope, $http,fileUpload,$location,$rootScope) {

$scope.showid=true;

  var refreshfacility = function () {
        $http.get('/facility/facility').success(function (response) {
            console.log(' READ IS SUCCESSFUL');
            $scope.FacilityList = response;
          });
        };
         refreshfacility();

  $scope.refreshdoctor = function () {
        $http.get('/doctor/doctor').success(function (response) {
            console.log(' READ IS SUCCESSFUL');
            $scope.doctorlist = response;
            $scope.doctor = "";
        });
    };


  $scope.refreshdoctor();
    $scope.submit = function() {
      // submit code goes here
    };
    $scope.datepickerConfig = {
             allowFuture: false,
             dateFormat: 'DD/MM/YYYY'
         };

 $scope.gender = ['Male', 'Female'];
$scope.speciality = ['Dentist','Gynecologist/Obstetrician','General Physician','Dermatologist','Ear-Nose-Throat (Ent) Specialist','Ayurveda'];
    $scope.resetdoctor = function() {
      $scope.doctor = {
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        email: "",
        mobile: "",
        speciality: "",
        profileimage: "",
        facebook: "",
        twitter: "",
        google: "",
        userName: "",
        Password: "",
        cPassword: ""

      }
    };
$scope.resetdoctor();
    $scope.resetnurse = function() {
      $scope.nurse = {
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        email: "",
        mobile: "",
        speciality: "",
        position: "",
        experiance: "",
        hospital: "",
        reference: "",
        userName: "",
        Password: "",
        cPassword: ""

      }
    };

$scope.resetnurse();
$scope.resetcall = function() {
  $scope.call = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    userName: "",
    Password: "",
    cPassword: ""

  }
};
$scope.resetcall();
$scope.resetfront = function() {
  $scope.front = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    hospital: "",
    userName: "",
    Password: "",
    cPassword: ""

  }
};
$scope.resetfront();

$scope.resetfacility = function() {
  $scope.facilityAdm = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    hospital: "",
    userName: "",
    Password: "",
    cPassword: ""

  }
};
$scope.resetfacility();

    $scope.refreshnurse = function () {
          $http.get('/nurse/nurse').success(function (response) {
              console.log(' READ IS SUCCESSFUL');
              $scope.nurselist = response;
              $scope.nurse="";
          });
      };

      $scope.refreshnurse();

      $scope.refreshncal = function () {
            $http.get('/cal/cal').success(function (response) {
                console.log(' READ IS SUCCESSFUL');
                $scope.callist = response;
                $scope.nurse="";
            });
        };

        $scope.refreshncal();





      $scope.refreshMenu = function () {
            $http.get('/menu/menu').success(function (response) {
                console.log(' READ IS SUCCESSFUL');
                $scope.menuList = response;

            });
        };

        $scope.refreshMenu();
        var id;


        $scope.showid=true;

        $scope.genId=function(){

          var name = $scope.doctor.firstName.substr(0, 4);

          if(name.length==4){

            id=name+ Math.random().toString(10).substr(2,4);

          } else if(name.length==3){

            id=name+"0"+ Math.random().toString(10).substr(2,4);

          } else if(name.length==2){

            id=name+"00"+ Math.random().toString(10).substr(2,4);
          }


          $scope.doctor.id=id;

        }

    $scope.addDoctor = function () {

console.log($scope.doctorFile);

      var file = $scope.doctorFile;
      console.log(file);
      var uploadUrl = "/savedata";
      fileUpload.uploadFileToUrl(file, uploadUrl);
      $scope.doctor.profileImage=$scope.doctorFile.name;

$scope.doctor.UserType="Doctor";
if($scope.doctor.Password===$scope.doctor.cPassword){
  $http.post('/doctor/doctor', $scope.doctor).success(function (response) {
console.log(response);

    //  refreshType();
  });

          $http.post('/api/signup', $scope.doctor).then(function(response) {
                  alert('Doctor Registration Successful');
                  $scope.refreshdoctor();

              });

}else{

alert("Your password is not matching...Try again");

}


      };


      $scope.nursegenId=function(){

        var name = $scope.nurse.firstName.substr(0, 4);

        if(name.length==4){

          id=name+ Math.random().toString(10).substr(2,4);

        } else if(name.length==3){

          id=name+"0"+ Math.random().toString(10).substr(2,4);

        } else if(name.length==2){

          id=name+"00"+ Math.random().toString(10).substr(2,4);
        }


        $scope.nurse.id=id;

      }
$scope.addNurse=function(){
  var file = $scope.nurseFile;
  console.log(file);
  var uploadUrl = "/savedata";
  fileUpload.uploadFileToUrl(file, uploadUrl);
  $scope.nurse.profileImage=$scope.nurseFile.name;
$scope.nurse.UserType="Nurse";
      if($scope.nurse.Password===$scope.nurse.cPassword){
        $http.post('/nurse/nurse', $scope.nurse).success(function (response) {
        console.log(response);
        alert("Registration completed!!!!");

        });

                $http.post('/api/signup', $scope.nurse).then(function(response) {
                        alert('Nurse Registration Successful');
                    });

      }else{

      alert("Your password is not matching...Try again");

      }
}

$scope.callId=function(){

  var name = $scope.call.firstName.substr(0, 4);

  if(name.length==4){

    id=name+ Math.random().toString(10).substr(2,4);

  } else if(name.length==3){

    id=name+"0"+ Math.random().toString(10).substr(2,4);

  } else if(name.length==2){

    id=name+"00"+ Math.random().toString(10).substr(2,4);
  }


  $scope.call.id=id;

}


$scope.addCallcenter=function(){
  var file = $scope.callFile;
  console.log(file);
  var uploadUrl = "/savedata";
  fileUpload.uploadFileToUrl(file, uploadUrl);
  $scope.call.profileImage=$scope.callFile.name;
$scope.call.UserType="Callcenter";
  if($scope.call.Password===$scope.call.cPassword){
    $http.post('/cal/cal', $scope.call).success(function (response) {
  console.log(response);
  alert("Registration completed!!!!");
    });
    $http.post('/api/signup', $scope.call).then(function(response) {
            alert('CallCenter Registration Successful');
        });
  }else{

  alert("Your password is not matching...Try again");

  }
}


$scope.frontId=function(){

  var name = $scope.front.firstName.substr(0, 4);

  if(name.length==4){

    id=name+ Math.random().toString(10).substr(2,4);

  } else if(name.length==3){

    id=name+"0"+ Math.random().toString(10).substr(2,4);

  } else if(name.length==2){

    id=name+"00"+ Math.random().toString(10).substr(2,4);
  }


  $scope.front.id=id;

}

$scope.addFrontdesk=function(){
  var file = $scope.frontFile;
  console.log(file);
  var uploadUrl = "/savedata";
  fileUpload.uploadFileToUrl(file, uploadUrl);
  $scope.front.profileImage=$scope.frontFile.name;
  $scope.front.UserType="Frontdesk";
  if($scope.front.Password===$scope.front.cPassword){
    $http.post('/front/front', $scope.front).success(function (response) {
  console.log(response);
  alert("Registration completed!!!!");
    });
    $http.post('/api/signup', $scope.front).then(function(response) {
            alert('frontDesk Registration Successful');
        });
  }else{

  alert("Your password is not matching...Try again");

  }
}

$scope.facId=function(){

  var name = $scope.facilityAdm.firstName.substr(0, 4);

  if(name.length==4){

    id=name+ Math.random().toString(10).substr(2,4);

  } else if(name.length==3){

    id=name+"0"+ Math.random().toString(10).substr(2,4);

  } else if(name.length==2){

    id=name+"00"+ Math.random().toString(10).substr(2,4);
  }


  $scope.facilityAdm.id=id;

}

$scope.addFacilityAdmin=function(){
  var file = $scope.facilityadFile;
  console.log(file);
  var uploadUrl = "/savedata";
  fileUpload.uploadFileToUrl(file, uploadUrl);
  $scope.facilityAdm.profileImage=$scope.facilityadFile.name;
$scope.facilityAdm.UserType="FacilityAdmin";
  if($scope.facilityAdm.Password===$scope.facilityAdm.cPassword){
    $http.post('/facilityadm/facilityadm', $scope.facilityAdm).success(function (response) {
  console.log(response);
  alert("Registration completed!!!!");

      //  refreshype();
    });
    $http.post('/api/signup', $scope.facilityAdm).then(function(response) {
            alert('FacolityAdmin Registration Successful');
        });
  }else{

  alert("Your password is not matching...Try again");

  }
}




});
