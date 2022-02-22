import {atom} from "recoil";


export interface DeviceEntity{
    type: "bulb" | "outlet" | "temperatureSensor",
    id: "string",
    name: "string",
    place: "string",
    connectionState: "connected" | "disconnected" | "poorConnection",
    isTurnedOn: boolean,
    brightness: string,
    color: string,
    powerConsumption: number,
    description: string,
    icon: string,
}


export const allDevicesState  = atom({
    key: "allDevices",
    default: [],
})

export const currentDeviceState = atom({
    key: "currentDevice",
    default: [],
})

export const isLoadingState = atom({
    key: "isLoading",
    default: false,
})

