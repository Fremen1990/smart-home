import React from "react";

//ICONS
import goodConnectionIcon from "../img/fullConnectionIcon.png";
import noConnectionIcon from "../img/noConnectionIcon.png";
import poorConnectionIcon from "../img/lowConnectionIcon.png";
import onIcon from "../img/connected.webp";
import offIcon from "../img/disconnected.webp";
import defaultIcon from "../img/defaultIcon.png";

import {DeviceEntity} from "../atoms"


export const connectionStatusIcons = (device:DeviceEntity) => {
    switch (device.connectionState) {
        case "connected":
            return <img src={goodConnectionIcon} alt="Good connection icon"/>
        case "disconnected":
            return <img src={noConnectionIcon} alt="No connection icon"/>
        case "poorConnection":
            return <img src={poorConnectionIcon} alt="Poor connection icon"/>

        default:
            console.log("Sorry, no icon loaded")
    }
}


export const OnOff = (device:DeviceEntity) => {
    switch (device.isTurnedOn) {
        case true:
            return < img src={onIcon} alt="Connected"/>
        case false:
            return < img src={offIcon} alt="Disconnected"/>
        default:
            return < img src={defaultIcon} alt="Disconnected"/>
    }
}
