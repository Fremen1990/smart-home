# 🤖 Smart Home Interface 🤖

## There are three types of devices plugged into the interface
    
### - Bulb
### - Outlet
### - Temperature sensor

### ToDo List: 
- [ ] Main screen should include list of devices plugged into the system with basic info: type, name, state of 
  connection.
- [ ] After click on the element (specific device) there should pop out window with visualization of device state
- [ ] Window should support dragging with interact.js library
- [ ] Window should not block chose of another device
- [ ] If we change the device, the window should stay, but the data should be replaced for new device
- [ ] After closing and new opening window should appear in the same place as last time 
- [ ] Devices state should be updated in-live,  with REST periodic queries or WebSocket protocol
- [ ] Write tests in Mocha, Simon and Chai
- [ ] Create database in MongoDB


Backend API:

  ```
  GET /api/v1/devices => zwraca SmartDevice[];
  GET /api/v1/devices/{deviceId} => zwraca SmartDeviceDetails;
  GET /api/v1/refresh - endpoint typu WebSocket;
    ```
