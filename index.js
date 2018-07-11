'use strict'; 

//Include required packages and controller
const neeoapi = require('neeo-sdk');
const controller = require('./controller');	


//Name for lock state label
const lockLabel = {
  name: 'lockstate',
  label: 'Locked',
  isLabelVisible: true,
};

//Name for fuel label
const fuelLabel = {
  name: 'fuel',
  label: 'Fuel',
  isLabelVisible: true,
};

//Name for battery label
const batteryLabel = {
  name: 'battery',
  label: 'Battery',
  isLabelVisible: true,
};

//Name for heater label
const heaterLabel = {
  name: 'heaterstate',
  label: 'Heater',
  isLabelVisible: true,
};

//Definitions for NEEO SDK
const VolcoVOC = neeoapi.buildDevice('On Call')
  .setManufacturer('Volvo')
  .addAdditionalSearchToken('car')
  .setType('ACCESSORY')

  // Components and capabilities for NEEO SDK
  .addButton({ name: 'lock', label: 'Lock' })
  .addButton({ name: 'unlock', label: 'Unlock' })
  .addButton({ name: 'climaon', label: 'Clima ON' })
  .addButton({ name: 'climaoff', label: 'Clima OFF' })
  .addButtonHandler(controller.onButtonPressed)
  .addTextLabel(lockLabel, (deviceId) => controller.getLockSensor(deviceId))
  .addTextLabel(fuelLabel, (deviceId) => controller.getFuelSensor(deviceId))
  .addTextLabel(batteryLabel, (deviceId) => controller.getBatterySensor(deviceId))
  .addTextLabel(heaterLabel, (deviceId) => controller.getHeaterSensor(deviceId))

  //Register suscription which is required for notifications to NEEO Brain (auto update of sensor values)
  .registerSubscriptionFunction((...args) =>
        controller.setNotificationCallbacks(...args)
      )

module.exports = VolcoVOC;
