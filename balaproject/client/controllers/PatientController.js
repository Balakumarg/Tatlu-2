angular.module('tatluApp').controller('PatientController', function($scope, $http,fileUpload) {
$scope.refreshpat=function(){
  $http.get('/patient/patient').success(function (response) {
      $scope.patientList = response;
      $scope.patient={};
  });
}




$scope.addpatient=function(){
      if($scope.patient.Password===$scope.patient.cPassword){

 $scope.myFile.name;

 var index=$scope.myFile.indexOf(name)
       $scope.myFile.splice(index,1);


console.log($scope.myFile);


              var file =$scope.Image;
              var uploadUrl = "/savedata";
              fileUpload.uploadFileToUrl(file, uploadUrl);



        // $scope.patient.profileImage=$scope.myFile.name;

        $http.post('/patient/patient', $scope.patient).success(function (response) {
        console.log(response);
        alert("Registration completed!!!!");

            $scope.refreshpat();
        });
      }else{

      alert("Your password is not matching...Try again");

      }
}









});
