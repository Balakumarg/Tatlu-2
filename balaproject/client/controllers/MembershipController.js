angular.module('tatluApp').controller('MembershipController', function($scope, $http,fileUpload,$filter,$rootScope,$cookies,AuthenticationService,$location) {


$scope.RefreshPatient = function () {
          $http.get('/patient/patient').success(function (response) {
              $scope.patientList = response;
              $scope.patient={};
          });
      };

      $scope.RefreshPatient();

      $scope.patientsearch=true;
      $scope.patientadd=false;
$scope.showAddForm=function(m){

$scope.leadobj=m;
  $scope.lead=m.id;

  $scope.patientsearch=false;
  $scope.patientadd=true;


    };



var i;
var searchedpatient=[];
$scope.serchExisting=function(){

  $scope.serchpatient=document.getElementById("serchpatient").value;

  for(i=0;i<$scope.patientList.length;i++){
    if($scope.patientList[i].id==$scope.serchpatient){

searchedpatient.length=0;

searchedpatient.push($scope.patientList[i]);

$scope.serchedpatient=searchedpatient;

console.log($scope.serchedpatient);
  $scope.RefreshPatient();
    }

  }}


$scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.data = [];

    $scope.getData = function () {

      return $filter('filter')($scope.data)

    }

    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);
    }

    for (var j=1; j<65; j++) {
        $scope.data.push(j);
    }
//
// $scope.settings = {
//   currentPage: 0,
//   offset: 0,
//   pageLimit: 5,
//   pageLimits: ['10', '50', '100']
// };

$scope.viewDetails=function(p){

  $scope.patientView=p;

}



$scope.ShowAdded=false;
$scope.memberArray=[];


$scope.addAnother=function(p){

p.relashionship='';
// $scope.memberArray.push(p.relashionship)
  $scope.memberArray.push(p);
  $scope.ShowAdded=true;

}
$scope.isDisabled = function(p) {
   return $scope.memberArray.indexOf(p) !== -1;
 };

 $scope.remove = function(mp){
   for(var k = $scope.memberArray.length - 1; k >= 0; k--){
     if($scope.memberArray[k].id == mp.id){
         $scope.memberArray.splice(k,1);
     }
   }
 }

$scope.Confirmmembership=function(){

console.log($scope.lead);
$scope.leadobj;
$scope.leadobj.relashionship="you";
$scope.memberArray.push($scope.leadobj);

console.log($scope.memberArray);

$rootScope.memberAdded=$scope.memberArray;

$location.path('/membershipPayment');


};

$scope.gender=["Male","Female"];
$scope.choices = [{patientnumber: 'choice1',patientname:'',dob:''}];

$scope.datepickerConfig = {
         allowFuture: false,
         dateFormat: 'DD/MM/YYYY'
     };


$scope.removeChoice = function() {
  var lastItem = $scope.choices.length-1;
  $scope.choices.splice(lastItem);
};

     var id;
     $scope.showid=true;


     $scope.genId=function(idx){

       console.log($scope.bb[idx].patientname);

       var Username=document.getElementById("patname").value;

       var name = Username.substr(0, 4);

       if(name.length==4){

         id=name+ Math.random().toString(10).substr(2,4);

       } else if(name.length==3){

         id=name+"0"+ Math.random().toString(10).substr(2,4);

       } else if(name.length==2){

         id=name+"00"+ Math.random().toString(10).substr(2,4);
       }


       document.getElementById("patId").value=id;

       $scope.choices.push({'id':id});

       id='';
       Username='';


     }

$scope.addpatient=function(){
  var newItemNo = $scope.choices.length+1;
  $scope.choices.push({'patientnumber':'choice'+newItemNo});



      // if($scope.patient.Password===$scope.patient.cPassword){
      //         var file =$scope.patient.myFile;
      //         var uploadUrl = "/savedata";
      //         fileUpload.uploadFileToUrl(file, uploadUrl);
      //
      //
      //
      //   $scope.patient.profileImage=file.name;
      //   $http.post('/patient/patient', $scope.patient).success(function (response) {
      //   console.log(response);
      //   alert("Registration completed!!!!");
      //
      //       $scope.RefreshPatient();
      //   });
      // }else{
      //
      // alert("Your password is not matching...Try again");
      //
      // }
}




});
