angular.module('tatluApp').controller('membershipPaymentController', function($scope, $http,fileUpload,$filter,$rootScope,$location) {

$scope.famillymemberlist=$rootScope.memberAdded;

$scope.refreshmembers = function () {
      $http.get('/member/member').success(function (response) {
          $scope.memberlist = response;
          $scope.membership={};
      });
  };

  $scope.refreshmembers();


  $scope.refreshpat=function(){
    $http.get('/patient/patient').success(function (response) {
        $scope.patientList = response;
        $scope.patient={};

    });
  }

  $scope.refreshpat();


var memberlist=[];
var i,j;
$scope.checkoptions = function (choice) {
var details = [];
console.log($scope.selectedPerson);
if ($scope.selectedPerson!=undefined){


    var id="MEM"+ Math.random().toString(10).substr(2,4);


  $scope.msg = 'You selected' + $scope.selectedPerson+'As family lead';

$scope.membership.leadid=$scope.selectedPerson;
$scope.membership.membershipid=id;
$scope.membership.membershipType="Family";
$scope.membership.totalMember=$scope.famillymemberlist.length;

for(i=0;i<$scope.famillymemberlist.length;i++){
memberlist.push($scope.famillymemberlist[i].id);
$scope.membership.members=memberlist;

for(j=0;j<$scope.patientList.length;j++){
$scope.patientList[j].membershipid=id;
$scope.patientList[j].membershipType="Family";
if($scope.patientList[j].id==$scope.famillymemberlist[i].id){
  $http.put('/patient/patient/' +$scope.patientList[j]._id,$scope.patientList[j]).success(function(response){
console.log(response);

  });

}

}

}

$http.post('/member/member',$scope.membership).success(function (response) {
console.log(response);
alert("Membership saved!!!!");

      $scope.refreshmembers();
  });

}
else
{
  $scope.msg = 'Please choose an Family lead';
}

};

$scope.refplan=function(){
  $http.get('/plan/plan').success(function (response) {
      $scope.PlanList = response;
      $scope.plan={};
  });

}
$scope.refplan();


$scope.SavePlan=function(){

  $http.post('/plan/plan',$scope.plan).success(function (response) {
  console.log(response);
  alert("Membership Plan saved!!!!");

        $scope.refplan();
    });

}

$scope.deletplan = function(pl) {
    //console.log(id);
    $http.delete('/plan/plan/' + pl._id).success(function(response) {
        console.log(response);
    });
    $scope.refplan();

};


$scope.editplan = function(pl) {
    $http.get('/plan/plan/' + pl._id).success(function(response) {
        $scope.plan = response[0];

    });
    $scope.refplan();

};

$scope.updatePlan=function(){
  $http.put('/plan/plan/' +$scope.plan._id,$scope.plan).success(function(response){
console.log(response);

  });
  $scope.refplan();

}


});
