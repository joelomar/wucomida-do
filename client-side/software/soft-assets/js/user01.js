$(document).ready(function() {


var sockets = io.connect('http://192.241.144.23:80', { 'forceNew': true });
var date = new Date().toLocaleString();
var dateHolder = document.getElementById('soft_date');
dateHolder.innerHTML = date;

var order,
    time,
    desc,
    specs,
    adds,
    price,
    pay,
    client,
    trans,
    phone,
    dataHold,
    server;



/*var adminName,
    adminPass;



$('#but_Login').click(function () {


     adminName = document.getElementById('admin_name').value;
     adminPass = document.getElementById('admin_pass').value;


     if (adminName === "" && adminPass === "") {
             
             $('#logofont2').remove();
             $('#brakes').remove();
             $('#forms').remove();
             $('#header').show();
             $('#main').show();
             $('body').css("background-color", "white");

              
             }
     else {

        alert('not a user');
     }


});*/



//-------Log token

var tokenItem = localStorage.getItem('user01Token');

if (tokenItem === 'user01ValidToken') {

     alert('welcome');
     sockets.emit('ordersOnline', { codeOne: codeOn });


}else {

     location.assign('http://localhost:8080/login.html');
}



//-------On and Off System

var codeOn = 1,
    codeOff = 0;



$('#button_Off').click(function() {


    sockets.emit('ordersOffline', { codeTwo: codeOff });
    localStorage.removeItem('user01Token');
    location.assign('http://localhost:8080/login.html');

});



 



setInterval(function(){

    $('#anim').fadeOut('slow');
    $('#anim').fadeIn('slow');

}, 2000);







 
    sockets.on('clientLine', function (data) {

         var bell = document.getElementById('myAudio');

         bell.play(); 

             $('#anim').hide();
             order = data.clientOrder;
             time = data.clientTime; 
             desc = data.clientDesc;
             specs = data.clientSpec;
             adds = data.clientAdd;
             price = data.clientPrice;
             pay = data.clientPay;
             client = data.clientName;
             trans = data.transport;
             phone = data.clientPhone;

         $('#data_holder').prepend($('<p id="p" style="color: #ff0080;">').text('ORDEN: ' + data.clientOrder + ' ---- ' + 'FECHA: ' + data.clientTime + ' ---- ' + 'DESC: ' + data.clientDesc + ' ---- ' + 'SPEC: ' + data.clientSpec + ' ---- ' + 'COMPLE: ' + data.clientAdd + ' ---- ' + 'PRECIO: ' +  data.clientPrice + ' ---- ' + 'PAGO: ' + data.clientPay + ' ---- ' + 'CLIENTE: ' + data.clientName + ' ---- ' + 'TRANSP: ' + data.transport + ' ---- ' + 'TEL: ' +  data.clientPhone));
         $('#p').append('<br><br><input type="checkbox" name="served" value="served"> Servida <input type="checkbox" name="served" value="served"> LLamar <input type="checkbox" name="served" value="served"> Cupon');   
 
  
});






//-----------Angular

var app = angular.module('orderApp', []);

app.controller('ctrl', function ($scope, $http){

     setInterval(function() {   
      $http.get('/api/orders').then(function(response) {

           $scope.serverData = response.data;
               


      });

    },50);
});



/*$(function () {

     $(window).on('beforeunload', function() {


        alert('dd');
     });




});*/




});//---------End jQuery











