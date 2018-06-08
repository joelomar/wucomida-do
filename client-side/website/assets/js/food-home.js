var app = angular.module('orderApp', []);



app.controller('ctrl', function ($scope, $http){

  setInterval(function() {    
      $http.get('/api/food').then(function(response) {

           $scope.serverData = response.data;
               


      });

     }, 50); 
});



var socket = io.connect('http://192.241.144.23:80');







