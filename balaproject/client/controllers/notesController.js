angular.module('tatluApp').controller('notesController', function($scope, $http) {

$scope.RefreshNotes = function () {
          $http.get('/note/note').success(function (response) {
              $scope.notesList = response;
              $scope.notes="";
          });
      };

      $scope.RefreshNotes();



      $scope.addNotes=function(){

        var date = new Date();
        var today=date;

        var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
}

if(mm<10) {
    mm='0'+mm
}
today = dd+'/'+mm+'/'+yyyy;
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        var am_pm = date.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var  time = hours + ":" + minutes + ":"  + am_pm;

      $scope.notes.time=time;
      $scope.notes.date=today;


      $http.post('/note/note',$scope.notes).success(function (response) {
      console.log(response);
      alert("Notes saved!!!!");

      			$scope.RefreshNotes();
      	});
      }




});
