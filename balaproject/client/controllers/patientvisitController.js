angular.module('tatluApp').controller('PatientvisitController', function($scope, $http,fileUpload) {
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
$scope.speciality = ['Dentist','Gynecologist/Obstetrician','General Physician','Dermatologist','Ear-Nose-Throat (Ent) Specialist','Ayurveda'];

$scope.resetpatient = function() {
  $scope.patient = {
    patientName: "",
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

$scope.addpatient=function(){
      if($scope.patient.Password===$scope.patient.cPassword){
              var file = $scope.myFile;
              var uploadUrl = "/savedata";
              fileUpload.uploadFileToUrl(file, uploadUrl);



        $scope.patient.profileImage=$scope.myFile.name;

        $http.post('/patient/patient', $scope.patient).success(function (response) {
        console.log(response);
        alert("Registration completed!!!!");
     location.reload(true);
          //  $scope.refreshpat();
        });
      }else{

      alert("Your password is not matching...Try again");

      }
}









});
