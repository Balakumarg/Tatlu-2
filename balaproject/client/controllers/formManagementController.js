angular.module('tatluApp').controller('formManagementController', function($scope, $http) {

  var refreshfac = function () {
        $http.get('/facilityadm/facilityadm').success(function (response) {
            $scope.faciList = response;
        });
    };

    refreshfac();

    var refreshfdoc = function () {
          $http.get('/doctor/doctor').success(function (response) {
              $scope.doctorList = response;
          });
      };

      refreshfdoc();

      var refreshnurse = function () {
            $http.get('/nurse/nurse').success(function (response) {
                $scope.nurseList = response;
            });
        };

        refreshnurse();

        var refreshcallcenter = function () {
              $http.get('/cal/cal').success(function (response) {
                  $scope.callcenterList = response;
              });
          };

          refreshcallcenter();

          var refreshfrontdesk = function () {
                $http.get('/front/front').success(function (response) {
                    $scope.frontdeskList = response;
                });
            };

            refreshfrontdesk();
            var refreshfrontdesk = function () {
                  $http.get('/front/front').success(function (response) {
                      $scope.frontdeskList = response;
                  });
              };

              refreshfrontdesk();

              var refreshform = function () {
                    $http.get('/formAcc/formAcc').success(function (response) {
                        $scope.formAcc = response;
                        $scope.fac={};
                        $scope.f={};
                    });
                };

                refreshform();


$scope.facilityAccess=function(f){

  $scope.userTypeValue="FacilityAdmin";


  var j;
      for(j=0;j<=$scope.formAcc.length;j++){
     if($scope.formAcc[j].userType== $scope.userTypeValue){
       console.log($scope.formAcc[j]._id);

$http.put('/formAcc/formAcc/' + $scope.formAcc[j]._id, $scope.formAcc[j]).success(function (response) {
console.log(response);
refreshform();

alert("Your changes has been saved!!!");

})


     }}




}


});
