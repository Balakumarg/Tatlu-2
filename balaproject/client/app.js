var app = angular.module('tatluApp', ['ngRoute','ngAnimate', 'ngAria','ngMessages','ngMaterial','ngFlatDatepicker','ngCookies', 'ngStorage','simple-autocomplete','mwl.calendar', 'ui.bootstrap', 'colorpicker.module']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'

    }).when('/nav', {
        templateUrl: 'views/nav.html',
        controller: 'NavController'
      }).when('/profile', {
          templateUrl: 'views/profile.html',
          controller: 'profileController'
        }).when('/changepassword', {
            templateUrl: 'views/changepassword.html',
            controller: 'profileController'
    }).when('/usermanagement', {
        templateUrl: 'views/usermanagement.html',
        controller: 'UserManagementController'
    }).when('/formmanagement', {
        templateUrl: 'views/formmanagement.html',
        controller: 'formManagementController'
    }).when('/facility', {
        templateUrl: 'views/facility.html',
        controller: 'FacilityController'
    }).when('/procedure', {
        templateUrl: 'views/procedure.html',
        controller: 'ProcedureController'
    }).when('/visit', {
        templateUrl: 'views/visit.html',
        controller:'VisitController'
    }).when('/patient', {
        templateUrl: 'views/patient.html',
        controller:'PatientController'
    }) .when('/patientvisit', {
        templateUrl: 'views/patientvisit.html',
        controller:'PatientController'
    }).when('/allpatients', {
        templateUrl: 'views/allpatients.html',
        controller:'PatientController'
    }) .when('/appointment', {
        templateUrl: 'views/calender.html',
        controller:'appointmentController'
    }).when('/payment', {
        templateUrl: 'views/payments.html',
        controller:'PaymentController'
    }) .when('/nursehome', {
        templateUrl: 'views/nursehome.html',
        controller:'PaymentController'
    }).when('/globals', {
        templateUrl: 'views/globals.html',
        controller: 'globalsController'
    }).when('/globals2', {
        templateUrl: 'views/globals2.html',
        controller: 'globals2Controller'
    }).when('/globals3', {
        templateUrl: 'views/globals3.html',
        controller: 'globals3Controller'
    }).when('/patient_demographics', {
        templateUrl: 'views/patient_demographics.html',
        controller: 'PatientdemoController'
    }).when('/managelayout', {
        templateUrl: 'views/managelayout.html',
        controller: 'managelayoutController'
    }).when('/notes', {
        templateUrl: 'views/notes.html',
        controller:'notesController'
    }).when('/medication', {
        templateUrl: 'views/medication.html',
        controller:'medicationController'
    }).when('/membership', {
        templateUrl: 'views/membership.html',
        controller:'MembershipController'
    }).when('/membertype', {
        templateUrl: 'views/membertype.html',
        controller:'memberselectController'
    }).when('/membershipPayment', {
        templateUrl: 'views/membershipPayment.html',
        controller:'membershipPaymentController'
    }).when('/rules', {
        templateUrl: 'views/rules.html',
        controller: 'rulesController'
    }).when('/alert', {
        templateUrl: 'views/alert.html',
        controller: 'alertController'
    }).when('/membershipplan', {
        templateUrl: 'views/membershipplan.html',
        controller:'membershipPaymentController'
    }).when('/sign-in', {
        templateUrl: 'views/sign-in.html',
        controller:'LoginController'
    });
  });

  app.directive('navPage', function() {
  return {
    restrict: 'E',
    templateUrl: '/views/nav.html',
    controller:'NavController'
  };
});

app.factory('alert', function($uibModal) {

     function show(action, event) {
       return $uibModal.open({
         templateUrl: 'views/modalContent.html',
         controller: function() {
           var vm = this;
           vm.action = action;
           vm.event = event;
         },
         controllerAs: 'vm'
       });
     }

     return {
       show: show
     };

   });


app.directive('fileModel', ['$parse', function ($parse) {
     return {
        restrict: 'A',
        link: function(scope, element, attrs) {
           var model = $parse(attrs.fileModel);
           var modelSetter = model.assign;
  element.bind('change', function(){
     scope.$apply(function(){
        modelSetter(scope, element[0].files[0]);
     });
  });



        }
     };
  }]);


  app.service('fileUpload', ['$http', function ($http) {
this.uploadFileToUrl = function(file, uploadUrl){
 var fd = new FormData();
 fd.append('file', file);

 $http.post(uploadUrl, fd, {
    transformRequest: angular.identity,
    headers: {'Content-Type': undefined}
 })

 .success(function(){
 })

 .error(function(){
 });
}
}]);
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});


app.run(function($rootScope, $http, $location, $sessionStorage, $cookies) {
    if ($sessionStorage.tokenDetails) {
        $http.defaults.headers.common.Authorization = $sessionStorage.tokenDetails.token;
    }

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var publicPages = ['/', '/sign-in', '/patient','/nav'];
      var patientPages = ['/','/nursehome','/patient_demographics','/profile','/changepassword','/appointment'];
  var AdminPages=['/','/nav','/visit','/patientvisit','/membership','/allpatients','/membershipplan','/membershipPayment','/appointment','/changepassword','/membershipplan','/profile','/rules','/alert','/usermanagement','/facility','/medication','/managelayout','/procedure','formmanagement','/globals','/globals3','/globals2'];
  var doctorpages = ['/','/nav','/visit','/profile','/changepassword','/patientvisit','/patient','/payment','/medication','/allpatients'];
  var nursepages=['/','/nav','/visit','/nursehome','/patient_demographics','/patient','/patientvisit','/payment','/appointment','/profile','/changepassword'];
  var callcenterpages=['/','/nav','/nursehome','/appointment','/allpatients','/profile','/patient','/changepassword'];
  var frondeskpages=['/','/nav','/appointment','/nursehome','/patient','/allpatients','/profile','/changepassword'];
  var facilityadminpages=['/','/nav','/nursehome','/patient','/appointment','/allpatients','/usermanagement','/profile','/changepassword'];


        var authUser = $cookies.getObject('authUser');
        if (authUser != undefined) {
            var loggedInUser = authUser.currentUser.userInfo;
        }

        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$sessionStorage.tokenDetails && $location.path() != '') {
          // alert("Log In First");
            $location.path('/Unauthorized');

        }else{
          if (authUser != undefined) {
                       if(authUser.currentUser.userInfo.usertype==='Patient'){
                         var Patient = patientPages.indexOf($location.path()) === -1;
                         if(Patient){
                           $location.path('/Unauthorized');
                         }

                       }
                       if(authUser.currentUser.userInfo.usertype==='Admin'){
                         var Admin = AdminPages.indexOf($location.path()) === -1;
                         if(Admin){
                           $location.path('/Unauthorized');
                         }

                       }
                       if(authUser.currentUser.userInfo.usertype==='Doctor'){
                         var Doctor = doctorpages.indexOf($location.path()) === -1;
                         if(Doctor){
                           $location.path('/Unauthorized');
                         }

                       }
                       if(authUser.currentUser.userInfo.usertype==='Nurse'){
                         var Nurse = nursepages.indexOf($location.path()) === -1;
                         if(Nurse){
                           $location.path('/Unauthorized');
                         }

                       }
                       if(authUser.currentUser.userInfo.usertype==='Callcenter'){
                         var Callcenter = callcenterpages.indexOf($location.path()) === -1;
                         if(Callcenter){
                           $location.path('/Unauthorized');
                         }

                       }
                       if(authUser.currentUser.userInfo.usertype==='Frontdesk'){
                                var Frontdesk = frondeskpages.indexOf($location.path()) === -1;
                                if(Frontdesk){
                                  $location.path('/Unauthorized');
                                }

                              }
                              if(authUser.currentUser.userInfo.usertype==='FacilityAdmin'){
                                       var FacilityAdmin = facilityadminpages.indexOf($location.path()) === -1;
                                       if(FacilityAdmin){
                                         $location.path('/Unauthorized');
                                       }

                                     }
            }
        }

    });
});
