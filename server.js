const https = require('https'),
      http = require('http'),
      express = require('express'),
      app = express(),
      fs = require('fs'),
      forceDomain = require('forcedomain'),
      bodyParser = require('body-parser'),
      stripe = require('stripe')('sk_test_uNksu3KtCIQoApOlI3pyoQpE'),
      database = require('./database');




var options = { cert: fs.readFileSync('/etc/letsencrypt/live/wucomida.com/fullchain.pem'),
                key: fs.readFileSync('/etc/letsencrypt/live/wucomida.com/privkey.pem')

};




http.createServer(app).listen(80, function (req, res) {

    console.log('http Server Listening in PORT 80');
});



/*https.createServer(options, app).listen(443, function() {

    console.log('Https server running atport 443');

});*/


var secureServer = https.createServer(options, app);

secureServer.listen(443, function() {

    console.log('https server running at port 443')

});



app.use(forceDomain({
  hostname: 'www.wucomida.com',
  protocol: 'https'

}));


var io = require('socket.io').listen(secureServer);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



//-------------Globals for Orders


var order,
    time,
    rest,
    desc,
    spec,
    add,
    price,
    pay,
    client,
    transp,
    phone;


//-------------Globals for food submit


var restNum,
    timeSubmit,
    restSubmit,
    citySubmit,
    adressSubmit,
    phoneSubmit,
    catSubmit,
    linkSubmit,
    conceptSubmit,
    feedSubmit;






//-------------Sockets Lines

io.on('connection', function (socket) {
    
    console.log('User connected in main Socket');


//-----------Food Submit Line

socket.on('submitFoodLine', function (data) {

         restNum = data.idInfo;
         timeSubmit = data.timeInfo
         restSubmit = data.restInfo;
         citySubmit = data.cityInfo;
         adressSubmit = data.adressInfo;
         phoneSubmit = data.phoneInfo;
         catSubmit = data.catInfo;
         linkSubmit = data.linkInfo;
         conceptSubmit = data.conceptInfo;
         feedSubmit = data.feedInfo;

         database.foodSaver(restNum, timeSubmit, restSubmit, citySubmit, adressSubmit, phoneSubmit, catSubmit, linkSubmit, conceptSubmit, feedSubmit);
         database.sqliteFoodSaver(restNum, timeSubmit, restSubmit, citySubmit, adressSubmit, phoneSubmit, catSubmit, linkSubmit, conceptSubmit, feedSubmit);
         

         console.log(restNum + ' ' + timeSubmit + ' ' + restSubmit + ' ' + citySubmit + ' ' + adressSubmit + ' ' + phoneSubmit + ' ' + catSubmit + ' ' + conceptSubmit + ' ' + feedSubmit);
         

    });




//------------Orders Line    
    
socket.on('orders', function (data) {

         order = data.orderNum;
         time = data.orderTime;
         rest = data.restName;
         desc = data.orderDesc;
         spec = data.userSpec;
         add = data.addOns;
         price = data.orderPrice;
         pay = data.orderPayment;
         transp = data.deliPick;
         client = data.clientName;
         phone = data.clientPhone;
         //console.log(order + ' ' + time + ' ' + rest + ' ' + desc + ' ' + add + ' ' + price + ' ' + client + ' ' + username + ' ' + payment + ' ' + email + ' ' + phone);
         database.sqliteOrdersSaver(order, time, rest, desc, spec, add, price, pay, transp, client, phone);
         database.mongoSaver(order, time, rest, desc, add, spec, price, pay, client, transp, phone);
         

         
         var clientData =  { 

                clientOrder: order,
                clientTime: time,
                clientDesc: desc,
                clientSpec: spec,
                clientAdd: add,
                clientPrice: price,
                clientPay: pay,
                transport: transp,
                clientName: client,
                clientPhone: phone

            }
                      
         io.emit('clientLine', clientData); 
         console.log('Client Data send via sockets');
         

    });



//-----------Open and Close Orders System lines

socket.on('ordersOnline', function (data) {
     
     var codeOpen = data.codeOne;  
     console.log(codeOpen);     
     io.emit('ordersClientOnline', { oc: codeOpen });    

    });

socket.on('ordersOffline', function (data) {
     
     var codeClose = data.codeTwo;
     console.log(codeClose);          
     io.emit('ordersClientOffline', { cc: codeClose });    

    });


//-----------Register Users lines

socket.on('submitUsersLine', function (data) {
         
     var idData = data.idInfo,
         nameData = data.nameInfo, 
         lastnData = data.lastInfo,
         serviData = data.serviInfo,
         emailData = data.emailInfo,
         passData = data.secInfo,
         phoneData = data.phoneInfo,
         dateData = data.dateInfo;

         database.sqliteUsersSaver(idData, nameData, lastnData, serviData, emailData, passData, phoneData, dateData);
         database.usersSaver(nameData, lastnData, serviData, emailData, passData, phoneData, dateData);

     console.log('Users data saved to Mongo and SQL');         

    });

//-----------Login Auth Users lines

socket.on('submitLoginLine', function (logData) {
         
     var emailLog = logData.emailInfo,
         passLog = logData.secInfo;

     console.log('User loged'); 
     database.userLogin(emailLog, passLog);        

    });




});//-------------End Sockets Main Lines




//-------------Users Tokens Lines

var user01Token = 'user01ValidToken';

exports.user01SendLog = function () {

    io.emit('user01AuthLine', user01Token);

    console.log('user01 valid token');


}





//-------------Routes

app.use(express.static('client-side/website'));
app.use(express.static('client-side/software'));
app.use(express.static('client-side/food-submit'));
app.use(express.static('client-side/clients'));
app.use(express.static('client-side/users'));



app.get('/', function (req, res) {

    res.sendFile('client-side/website/index.html', {root:__dirname});

});

app.get('/foodup', function (req, res) {

    res.sendFile('client-side/food-submit/food-submit.html', {root:__dirname});


});

app.get('/user01', function (req, res) {

    res.sendFile('client-side/software/user01.html', {root:__dirname});


});



app.get('/api/food', function (req, res) {

   res.json(database.expRestData);  

});

app.get('/api/orders', function (req, res) {

   res.json(database.expData);  

});

app.post('/charge', function (req, res) {
    
    var token = req.body.stripeToken;
    var chargeAmount = req.body.chargeAmount;
    var charge = stripe.charges.create({

        amount: chargeAmount,
        currency: "usd",
        source: token



    }, function (err, charge) {

           if (err && err.type === "StripeCardError") {
                
               console.log('card error');
           }
           else {

               console.log('Paid succes');

           }

    });
     
     var respCode = true;
  
     io.emit('paymentLine', respCode);

     res.redirect('back');

});







