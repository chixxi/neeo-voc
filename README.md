# neeo-voc
Very basic proof of concept NEEO driver for Volvo On Call using the NEEO SDK.

Description:
This is a really basic driver for Volvo On Call (VOC). Volvo cars with this feature can be controlled using the not officially documented API.

Important:
- You are using this on your own risk and responsability!
- You have to manually enter your user and password in controller.js before starting the driver.
- You have to manually enter your VIN in controller.js before starting the driver (can be found in the Volvo App).
- If you can control your car using the Volvo App, your car does support VOC.
- Dependant on your location you may have to change the VOC link (use Google to figure out your region).
- The connection to the vehicle in my case is pretty slow, it can therefore take over 30 seconds for the car to react after sending a command.

Working Commands:
- Lock
- Unlock
- Parking Climate ON
- Parking Climated OFF

Working Labels:
- Lock state
- Heater State
- Fuel Level %
- Battery Level %

To be done:
- Honk Command
- Light Blink Command
- Receive and send vehicle position (is required for commands which have a distance limit like the horn)
- Notifications for triggering recipes on NEEO based on vehicle state

Tested:
Confirmed to be working with a Volvo XC90 T8 in Europe

