var app = angular.module('ContactsApp', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/contacts', {
            controller: 'ListController',
            templateUrl: 'views/list.html'
        })
        .when('/contacts/new', { 
            controller: 'NewController',
            templateUrl: 'views/new.html'
        })
        .when('/contacts/:id', {
            controller: 'SingleController',
            templateUrl: 'views/single.html'
        })
        .otherwise({
            redirectTo: '/contacts'
        });
        
        $locationProvider.html5Mode(true);
}]);

app.factory('Contacts', ['$resource', function ($resource) {
    return $resource('/api/contacts/:id', { id: '@id' }, {
        'update': { method: 'PUT' }
    });
}]);

app.controller('ListController', ['$scope', 'Contacts', '$location', function ($scope, Contacts, $location) {
   $scope.contacts = Contacts.query(); 
   
   $scope.sortType = 'identity';
   $scope.sortReverse = false;
   
   $scope.showContact = function (id) {
       $location.url('/contacts/'+id);
   };
}]);

app.controller('SingleController', ['$scope', 'Contacts', '$routeParams', '$location', function ($scope, Contacts, $routeParams, $location) {
   var id = parseInt( $routeParams.id, 10 );
   $scope.contact = Contacts.get({ id: id });
   
   $scope.update = function () {
       $scope.contact.$update(function (updatedRecord) {
           $scope.contact = updatedRecord;
       });
       $location.url('/contacts');
   };
   
   $scope.delete = function () {
       $scope.contact.$delete();
       $location.url('/contacts');
   };
}]);

app.controller('NewController', ['$scope', 'Contacts', '$location', function ($scope, Contacts, $location) {
   $scope.contact = new Contacts();
   
   $scope.add = function () {
       $scope.contact.$save();
       $location.url('/contacts');
   };
}]);