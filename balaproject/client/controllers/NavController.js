angular.module('tatluApp').controller('NavController', function($scope, $http,$location,$cookies,AuthenticationService) {

  var authUser = $cookies.getObject('authUser');

if (authUser != undefined) {
  console.log(authUser.currentUser.isLoggedIn);
  $scope.loggedIn=authUser.currentUser.isLoggedIn;
      loggedInUser = authUser.currentUser.userInfo;
      console.log(loggedInUser);
      // $scope.pic=loggedInUser.dp;
      $scope.name=loggedInUser.fname;
      $http.get('/api/getuser').success(function (response) {

for(var m=0;m<response.length;m++){
  if(response[m].id==loggedInUser.Id){
$scope.dp="uploads"+"/"+response[m].profileImage;
  }
}
      });

$scope.type=loggedInUser.usertype;
      console.log($scope.dp);
      console.log($scope.name);
    }

    $scope.LogOut = function() {
        AuthenticationService.Logout(function(response) {
                $location.path('/sign-in');

        });
    };

$scope.menuList=[];
  $scope.refreshMenu = function () {
        $http.get('/menu/menu').success(function (response) {
            console.log(' READ IS SUCCESSFUL');
            $scope.navList = response;
            for(var i=0;i<$scope.navList.length;i++){
              if($scope.navList[i].user==loggedInUser.usertype){
                console.log($scope.navList[i]);
  $scope.menuList.push($scope.navList[i]);

console.log($scope.menuList);

              }
            }
        });
    };

    $scope.refreshMenu();


$scope.showChilds=function(m){


  m.active=!m.active;

}



});
