var socket = io.connect('http://192.241.144.23:80');

var date = new Date().toLocaleString();
var randNum = Math.floor((Math.random() * 9000) + 1);


var payMethod,
    deli,
    deliVal,
    pickVal,
    athVal,
    creditVal,
    debitVal,
    //cashVal,
    spec,
    name,
    phone;

var ele1 = document.getElementById('text-holder');
var ele2 = document.getElementById('menu-text-1');  


function orderOne() {

   
  
   $('#button').hide();
   $('#menu-text').hide();
   $('#options_box').show();
   $('#logo-holder').show();
   $('#text-holder').show();
   $('input[id=deli]').attr('checked',false);
   $('input[id=pick]').attr('checked',false);
   $('input[id=ath]').attr('checked',false);
   $('input[id=credit]').attr('checked',false);
   $('input[id=debit]').attr('checked',false);
   $('input[id=cash]').attr('checked',false);

   $('body').css('background-color', '#ff0080');
   $('header').remove();
   $('#text_').remove();
}










function placeOrder() {

    deliVal = document.getElementById("deli").checked,
    pickVal = document.getElementById("pick").checked,
    athVal = document.getElementById("ath").checked,
    creditVal = document.getElementById("credit").checked,
    debitVal = document.getElementById("debit").checked,
    //cashVal = document.getElementById("cash").checked,
    spec = document.getElementById("description").value,
    name = document.getElementById("order_name").value,
    phone = document.getElementById("phone").value;

    



 $('#options_box').hide();


  if (deliVal === true) {

         deli = 'Delivery';

  }

  if (pickVal === true) {

        deli = 'Pick-Up';

  }

  if (athVal === true) {

     $('#ath_box').show();
     payMethod = 'ATH Movil';

  }

  if (creditVal === true) {

     $('#credit_box').show();
      payMethod = 'Tarj. Credito';
  }

  if (debitVal === true) {

     $('#debit_box').show();
      payMethod = 'Tarj. Debito';

  }

  //if (cashVal === 'cash') {

     // payMethod = 'Cash';

 // }


}


function cancelBut() {


    window.location.assign('http://192.241.144.23:80/joesburger.html');




}









var paymentResponse;


socket.on('paymentLine', function (paymentCode) {


     paymentResponse = paymentCode;


     if (paymentResponse === true) {
    
           socket.emit('orders', { 

            orderNum: randNum,
            restName: 'Joes Burger',
            orderDesc: 'Combo #1, Doble chees burger with fries',
            userSpec: spec,
            addOns: 'Papas supreme',
            deliPick: deli,
            clientName: name,
            orderTime: date,
            orderPrice: 6.99,
            orderPayment: payMethod,
            clientPhone: phone

          });

      }

});



socket.on('ordersClientOnline', function (data) {

    var codeOne = data.oc;
    $('#text_off').hide();
    $('#text_on').show();


});

socket.on('ordersClientOffline', function (data) {

    var codeTwo = data.cc;
    //$('text_off').hide;
    $('#text_on').hide();
    $('#text_off').show();


});
















