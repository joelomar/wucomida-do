const sqlite3 = require('sqlite3').verbose(),
      sqlite = new sqlite3.Database('wucomida_db.sqlite'),
      //mySql = require('mySql'),
      mongoose = require('mongoose'),
      server = require('./server.js');



//----------Query Globals    

/*var htmlData,
    orderData,
    dateData,
    restData,
    descData,
    specData,
    addData,
    priceData,
    payData,
    clientData,
    transData,
    phoneData;*/




//-------------SQLite Tables Config

/*sqlite.serialize(function() {
    sqlite.run("CREATE TABLE IF NOT EXISTS food_db (number INTEGER, date STRING, restaurant STRING, city STRING, adress STRING, phone STRING, category STRING, link STRING, concept STRING, feed STRING)");
        console.log('food table ready');
});
//sqlite.close();*/


/*sqlite.serialize(function() {
    sqlite.run("CREATE TABLE IF NOT EXISTS orders_db (number INTEGER, date STRING, restaurant STRING, description STRING, specs TEXT, addon STRING, price DECIMAL(19,2), payment STRING, client STRING, transport STRING, phone STRING)");
        console.log('table ready');
});
//sqlite.close();*/


/*sqlite.serialize(function() {
    sqlite.run("CREATE TABLE IF NOT EXISTS users_db (id INTEGER, name STRING, lastname STRING, business STRING, email STRING, password STRING, phone STRING, date SRING)");
        console.log('users table ready');
});
//sqlite.close();*/



//-------------SQLite Saving Config

exports.sqliteFoodSaver = function(numData, timeData, restData, cityData, adressData, phoneData, categoryData, linkData, conceptData, feedData) {

    sqlite.serialize(function() {
      
        var stmt = sqlite.prepare("INSERT INTO food_db VALUES(?,?,?,?,?,?,?,?,?,?)");
        stmt.run(numData, timeData, restData, cityData, adressData, phoneData, categoryData, linkData, conceptData, feedData);
        stmt.finalize();
        console.log('Data saved to sqlite food table');

    });
    //sqlite.close();

};




exports.sqliteOrdersSaver = function(orderData, timeData, restData, descData, specData, addData, priiceData, payData, clientData, transpData, phoneData) {

    sqlite.serialize(function() {
      
        var stmt = sqlite.prepare("INSERT INTO orders_db VALUES(?,?,?,?,?,?,?,?,?,?,?)");
        stmt.run(orderData, timeData, restData, descData, specData, addData, priiceData, payData, clientData, transpData, phoneData);
        stmt.finalize();
        console.log('Data saved to sqlite orders table');

    });
    //sqlite.close();

};




exports.sqliteUsersSaver = function(idData, nameData, lastData, serviData, emailData, passData, phoneData, dateData) {

    sqlite.serialize(function() {
      
        var stmt = sqlite.prepare("INSERT INTO users_db VALUES(?,?,?,?,?,?,?,?)");
        stmt.run(idData, nameData, lastData, serviData, emailData, passData, phoneData, dateData);
        stmt.finalize();
        console.log('Data saved to SQL users table');

    });
    //sqlite.close();

};




/*sqlite.serialize(function() {

    sqlite.each("SELECT * FROM orders_db WHERE restaurant = 'Joes Burger'", function (err, row) {
         
        
         htmlData += "<tr><td>" + row.number + "</td><td>" + row.date + "</td><td>" + row.restaurant + "</td><td>" + row.info + "</td><td>" + row.addon + "</td><td>" + row.deli_pickup + "</td><td>" + row.price + "</td><td>" + row.client + "</td><td>" + row.payment + "</td><td>" + row.phone + "</td></tr>";
        //orderData = row.number;
        //dateData = row.date;
        //restData = row.restaurant;
        //descData = row.info;
        //specData = row.specs;
        //addData = row.addon;
        //priceData = row.price;
        //payData = row.payment;
        //clientData = row.client;
        //transData = row.transport;
        //phoneData = row.phone;
        
        //console.log(row);
       
              
         });
        
    });
    //sqlite.close();*/


//-------------End SQLite Config





//-------------MongoDB Config


//-------------MongoDB Food-Submit Data

mongoose.connect('mongodb://wu_db:creativo@ds125716.mlab.com:25716/wucomida_db', {useMongoClient: true});


var restSchema = new mongoose.Schema({ 
    number: Number,
    date: String,
    restaurant: String,
    city: String,
    adress: String,
    phone: String,
    category: String,
    link: String,
    concept: String,
    feedback: String

});

var restModel = mongoose.model('food_db', restSchema);


exports.foodSaver = function(num, time, rest, cityS, adrs, ph, cat, linkS, concpt, feed ) {

    var saveFoodModel = new restModel({ 

    number: num,
    date: time,
    restaurant: rest,
    city: cityS,
    adress: adrs, 
    phone: ph,
    category: cat,
    link: linkS,
    concept: concpt,
    feedback: feed

 });

    saveFoodModel.save(function (err, saved) {

        if (err) {
            
            console.log('error');

        }

        else {

            console.log('Food data saved to mongo' + saved);
           

        }

    });

};



//-------------MongoDB Orders Data


var schema = new mongoose.Schema({ 
    number: Number,
    date: String,
    restaurant: String,
    description: String,
    addon: String,
    specs: String,
    price: Number,
    payment: String,
    client: String,
    transport: String,
    phone: String

});

var ordersModel = mongoose.model('orders_db', schema);



exports.mongoSaver = function(orderR, timeR, restR, descR, specR, addR, priceR, payR, clientR, transpR, phoneR ) {

    var saveModel = new ordersModel({ 

    number: orderR,
    date: timeR,
    restaurant: restR,
    description: descR,
    addon: addR, 
    specs: specR,
    price: priceR,
    payment: payR,
    client: clientR,
    transport: transpR,
    phone: phoneR

 });

    saveModel.save(function (err, saved) {

        if (err) {
            
            console.log('error');

        }

        else {

            console.log('orders data saved to mongo' + saved);
           

        }

    });

};




//-------------MongoDB Users Data


var usersSchema = new mongoose.Schema({ 
    name: String,
    lastname: String,
    business: String,
    email: String,
    password: String,
    phone: String,
    date: String,

});

var usersModel = mongoose.model('users_db', usersSchema);



exports.usersSaver = function(nameData, lastnameData, serviData, emailData, passData, phoneData, dateData  ) {

    var saveUsersModel = new usersModel({ 

    name: nameData,
    lastname: lastnameData,
    business: serviData,
    email: emailData,
    password: passData,
    phone: phoneData,
    date: dateData

 });

    saveUsersModel.save(function (err, saved) {

        if (err) {
            
            console.log('error');

        }

        else {

            console.log('users data saved to mongo' + saved);
           

        }

    });

};




//-------------MongoDB Queries


setInterval(function() {

    ordersModel.find({}, function (err, data) {

            if (err) {

                console.log(err);
            }

            else {

                //console.log(data);
            }

        module.exports.expData = data;
    });

},1000);


setInterval(function() {

    restModel.find({}, function (err, data) {

            if (err) {

                console.log(err);
            }

            else {

                //console.log(data);
            }

        module.exports.expRestData = data;
    });

},1000);




exports.userLogin = function (mailData, passData) {

     var userMail = mailData,
         userPass = passData;
         //console.log(userMail + ' ' + userPass);
   

    usersModel.findOne({}, function (err, data) {

            if (err) {

                console.log(err);
            }

            if (data.email === userMail && data.password === userPass) {

                console.log('User is in database');
                server.user01SendLog();
                
            
            }else {

                console.log('User are not in database');
            }
        
    });



};


/*usersModel.findOne({}, function (err, data) {

            if (err) {

                console.log(err);
            }

            

                console.log(data.email);
            
            
        //module.exports.expUsersData = data;
    });*/
   





