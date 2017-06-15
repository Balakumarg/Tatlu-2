angular.module('tatluApp').controller('PatientdemoController', function($scope, $http,fileUpload) {
$scope.refreshpat=function(){
  $http.get('/patientdemo/patientdemo').success(function (response) {
      $scope.patientList = response;
          $scope.patientdemo="";

  });
}
$scope.refreshpat();

$scope.datepickerConfig = {
         allowFuture: false,
         dateFormat: 'DD/MM/YYYY'
     };

$scope.gender = ['Male', 'Female'];
$scope.resetpatientdemo = function() {
  $scope.patientdemo = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    aadhaarno: "",
    licenseno: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    fathername: "",
    mothername: "",
    spousename: "",
    guardiansname: "",
    homeno: "",
    cellno: "",
    workno: "",
    email: "",
    emgname: "",
    emgphoneno: "",
    familydocname: "",
    referdocname: "",
    prefphar: "",
    preflab: "",
    allowsms: "",
    allowemail: "",
    occupation: "",
    employername: "",
    typeindustry: "",
    employeraddress: "",
    employercity: "",
    employerstate: "",
    language: "",
    religion: "",
    monthlyincome: "",
    familysize: "",
    referralsource: "",
    insuranceplanname: "",
    policynumber: ""

  }
};
$scope.resetpatientdemo();

$scope.addpatientdemo=function(){
      if($scope.patientdemo.Password===$scope.patientdemo.cPassword){
              var file = $scope.myFile;
              var uploadUrl = "/savedata";
              fileUpload.uploadFileToUrl(file, uploadUrl);



        $scope.patientdemo.profileImage=$scope.myFile.name;

        $http.post('/patientdemo/patientdemo', $scope.patientdemo).success(function (response) {
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
