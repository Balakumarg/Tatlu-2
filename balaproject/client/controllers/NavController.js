angular.module('tatluApp').controller('NavController', function($scope, $http) {

  var refreshMenu = function () {
        $http.get('/menu/menu').success(function (response) {
            console.log(' READ IS SUCCESSFUL');
            $scope.menuList = response;


            // console.log($scope.menuList.age);
        });
    };

    refreshMenu();


$scope.showChilds=function(m){


  m.active=!m.active;

}



});
