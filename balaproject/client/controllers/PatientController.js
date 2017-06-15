angular.module('tatluApp').controller('PatientController', function($scope, $http,fileUpload,$location,$rootScope) {
$scope.refreshpat=function(){
  $http.get('/patient/patient').success(function (response) {
      $scope.patientList = response;
      $scope.patient={};

  });
}

$scope.refreshpat();


$scope.datepickerConfig = {
         allowFuture: false,
         dateFormat: 'DD/MM/YYYY'
     };

$scope.gender = ['Male', 'Female'];
$scope.resetpatient = function() {
  $scope.patient =


  {
    patientname: "",
    age: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    profileimage: "",
    userName: "",
    Password: "",
    cPassword: ""

  }



};
$scope.resetpatient();


var id;


$scope.showid=true;

$scope.genId=function(){

  var name = $scope.patient.firstName.substr(0, 4);

  if(name.length==4){

    id=name+ Math.random().toString(10).substr(2,4);

  } else if(name.length==3){

    id=name+"0"+ Math.random().toString(10).substr(2,4);

  } else if(name.length==2){

    id=name+"00"+ Math.random().toString(10).substr(2,4);
  }


  $scope.patient.id=id;

}


$scope.addpatient=function(){
      if($scope.patient.Password===$scope.patient.cPassword){

              var file =$scope.myFile;
              var uploadUrl = "/savedata";
              fileUpload.uploadFileToUrl(file, uploadUrl);

        $scope.patient.profileImage=$scope.myFile.name;
        $scope.patient.membershipType="No-Member";
        $scope.patient.UserType="Patient";

        $http.post('/patient/patient', $scope.patient).success(function (response) {
        console.log(response);

$rootScope.petientDetails=response;

        alert($scope.patient.id+"Registration completed!!!!");
        $location.path('/membertype');
        });

        $http.post('/api/signup', $scope.patient).then(function(response) {
                alert('patient Registration Successful');
            });

      }else{

      alert("Your password is not matching...Try again");

      }

}









});
