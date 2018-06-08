var socket = io.connect('http://192.241.144.23:80');
var date = new Date().toLocaleString();
var randNum = Math.floor((Math.random() * 9000) + 1);

var restName,
    cityName,
    adressName,
    phoneNum,
    catData,
    linkData,
    restType,
    truckType,
    goodFeed,
    betterFeed,
    highFeed,
    conceptType,
    feedBack;


function getRestInfo() {

    
    restName = document.getElementById('rest_name').value;
    cityName = document.getElementById('city').value;
    adressName = document.getElementById('adress').value;
    phoneNum = document.getElementById('phone').value;
    catData = document.getElementById('category').value;
    linkData = document.getElementById('link').value;
    restType = document.getElementById('rest_type').checked;
    truckType = document.getElementById('truck_type').checked;
    goodFeed = document.getElementById('good_feed').checked;
    betterFeed = document.getElementById('better_feed').checked;
    highFeed = document.getElementById('high_feed').checked;


    if (restType === true) {

        conceptType = "restaurante";
    }

    if (truckType === true) {

        conceptType = "foodtruck";
    }

    if (goodFeed === true) {

        feedBack = "bueno";
    }

    if (betterFeed === true) {

        feedBack = "super rico";
    }

    if (highFeed === true) {

        feedBack = "alta calidad";
    }





    socket.emit('submitFoodLine', {
        
        idInfo: randNum,
        timeInfo: date,
        restInfo: restName,
        cityInfo: cityName,
        adressInfo: adressName,
        phoneInfo: phoneNum,
        catInfo: catData,
        linkInfo: linkData,
        conceptInfo: conceptType,
        feedInfo: feedBack


    });

    alert('food info sended to server');
    location.reload();

}


/*socket.on('submitFoodLine', function (foodData) {

         alert(foodData);
    });*/



















