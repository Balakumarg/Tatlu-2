angular.module('tatluApp').controller('PaymentController', function($scope, $http) {

  $scope.RefreshPayment = function () {
        $http.get('/payment/payment').success(function (response) {
            console.log(' READ IS SUCCESSFUL');
            $scope.paymentList = response;
            $scope.payment = "";
        });
    };

   $scope.RefreshPayment();

   $scope.pageChangeHandler = function(num) {
     console.log('going to page ' + num);
   };
   $scope.currentPage = 1;
   $scope.pageSize = 5;
   $scope.meals = [];

    $scope.datepickerConfig = {
             allowFuture: false,
             dateFormat: 'DD/MM/YYYY'
         };

$scope.addPayment=function(){
if ($scope.paymentForm.$valid) {
        var date = new Date();
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        var am_pm = date.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var  time = hours + ":" + minutes + ":"  + am_pm;

      $scope.payment.paymentTime=time;

$http.post('/payment/payment', $scope.payment).success(function (response) {
console.log(response);

        alert("Payment Saved!!!!");
location.reload(true);


  });
}
}


});
