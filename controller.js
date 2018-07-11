'use strict';

//Import npm package axios
const axios = require('axios');

let _notifyBrain;

//General function for HTTP Call using axios
function call (method, url) {
    return axios({
      
      method: method,

      url: url,

      //Enter your VIN at the end of the link bellow (can be found in the VOC App). You may also have to uncomment the correct region link.

      //Europe
      baseURL: 'https://vocapi.wirelesscar.net/customerapi/rest/v3.0/vehicles/VIN',

      //North America
      //baseURL: 'https://vocapi-na.wirelesscar.net/customerapi/rest/v3.0/vehicles/VIN',

      //Central Afric (???)
      //baseURL: 'https://vocapi-ca.wirelesscar.net/customerapi/rest/v3.0/vehicles/VIN',

      //Enter your VOC user and password here before starting the driver.
      auth: {
        username: '',
        password: ''
      },
      //Headers which need to be sent to pretend being a mobile device
      headers: {
      	'cache-control': 'no-cache',
      	'content-type': 'application/json',
      	'x-device-id': 'Device',
      	'x-originator-type': 'App',
      	'x-os-type': 'Android',
      	'x-os-version': '22',
      },	
      //Definition of response type
      responseType: 'json',

    })
    //.then(function (response) {
      //console.log(response);
    //})
    //Log errors if happening
    .catch(function (error) {
      console.log(error);
    });

}

//Function for handling the buttons based on button name
module.exports.onButtonPressed = function onButtonPressed(name, deviceId) {
  console.log(`[CONTROLLER] ${name} button pressed for device ${deviceId}`);
  if (name === "lock") {
    console.log("Lock button recognized!");
    call('post','/lock')
  }
  if (name === "unlock") {
    console.log("Unlock button recognized!");
    call('post','/unlock')
  }
  if (name === "climaon") {
    console.log("Clima ON button recognized!");
    call('post','/preclimatization/start')
  }
  if (name === "climaoff") {
    console.log("Clima OFF button recognized!");
    call('post','/preclimatization/stop')
  }


};

//Function for getting the state of the lock
module.exports.getLockSensor =function (deviceId) {
    return call('get','/status')
      //Once the response has come in return the value of object "carLocked" in "data"
      .then((response) => {
      	//console.log(response.data);
      	return response.data.carLocked
      });
}

//Function for getting the fuel level in %
module.exports.getFuelSensor =function (deviceId) {
    return call('get','/status')
      .then((response) => {
      	return response.data.fuelAmountLevel
      });
}

//Function for getting the battery level in %
module.exports.getBatterySensor =function (deviceId) {
    return call('get','/status')
      .then((response) => {
      	return response.data.hvBattery.hvBatteryLevel
      });
}

//Function for getting the heater status
module.exports.getHeaterSensor =function (deviceId) {
    return call('get','/status')
      .then((response) => {
      	return response.data.heater.status
      });
}

//Required to send notifications to brain
module.exports.setNotificationCallbacks =function(notifyBrainFunction, notifications) {
    _notifyBrain = notifyBrainFunction;
}

//Function used for sending notifications to the brain
function sendBrainNotification(uniqueDeviceId, component, value) {
    const notification = { uniqueDeviceId, component, value };
    return _notifyBrain(notification)
      .catch((error) => {
        console.log('NOTIFICATION_FAILED', error.message);
      });
}

//Loop which is executed to get newest sensor values from VOC continuously (every minutes = 300000ms)
setInterval(function(){
    console.log('Loop executed!')
    return call('get','/status')
      //Once the response has come in return the value of object "carLocked" in "data"
      .then((response) => {
      	const heatervalue = response.data.heater.status;
      	const lockvalue = response.data.carLocked;
      	//console.log(value)
      	sendBrainNotification('default', 'heaterstate', heatervalue);
      	sendBrainNotification('default', 'lockstate', lockvalue);

      });
}, 300000);
