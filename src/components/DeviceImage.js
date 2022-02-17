// import imgElectricSmartBulbOff from "../img/Electric-bulb-off.png";
// import imgElectricSmartBulbOn from "../img/Electric-bulb-on.png";
// import imgElectricSmartSocketOff from "../img/Electric-socket-off.png";
// import imgElectricSmartSocketOn from "../img/Electric-socket-on.png";
// import imgTemperatureSensor from "../img/temperature-sensor-icon-7.png";
// import {useEffect} from "react";
// import axios from "axios";
// import {API} from "../config";
//
// const DeviceImage = (singleDeviceDetails) => {
//
//
//
//     const fetchAllDevices = async () => {
//
//         try {
//             const resp = await axios.get(API)
//             setAllDevices(resp.data)
//
//         } catch(err) {
//             console.error(err)
//         }
//
//
//     }
//
//
//     let renderImage = ''
//
//
//     if (setShow === undefined || !show) {
//         return null;
//     }
//
//     const deviceDetails = singleDeviceDetails.deviceDetails;
//
//
//     if (deviceDetails) {
//
// function trySwitch(){
//     switch (deviceDetails.type.toLowerCase()) {
//         case ('electric smart bulb'):
//             if (!deviceDetails.status) {
//                 renderImage = (imgElectricSmartBulbOff);
//
//             } else if (deviceDetails.status) {
//                 renderImage = (imgElectricSmartBulbOn);
//             }
//             break;
//         case ('electric smart socket'):
//             if (!deviceDetails.status) {
//                 renderImage = (imgElectricSmartSocketOff);
//
//             } else if (deviceDetails.status) {
//                 renderImage = imgElectricSmartSocketOn
//             }
//             break;
//         case ('temperature sensor'):
//             renderImage = (imgTemperatureSensor);
//
//             break;
//
//         default:
//             console.log("no image")
//
//     }
//
// }
//
//     }
//
//
//     useEffect(() => {
//
//         (async ()=>{
//             if(deviceDetails){
//                 await trySwitch()
//
//             }else         return null;
//
//         })()
//
//     },[])
//
//     return (
//
//
//         <img src={renderImage} className="img-fluid rounded-start" alt="..."/>
//
//
//     )
// }
//
// export default DeviceImage;
