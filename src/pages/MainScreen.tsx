import React, {useEffect} from 'react';
import {Link,} from "react-router-dom";
import {useRecoilState} from 'recoil'
import "./MainScreen.css"
import HomeAnimation from "../components/HomeAnimation";
import {API} from "../config";
import axios from "axios";
// import {Hypnosis} from "react-cssfx-loading";
import {
    allDevicesState as allDevicesStateAtom,
    currentDeviceState as currentDeviceStateAtom, DeviceEntity,
    // isLoadingState
} from "../atoms";

import {capitalizeFirstLetter} from "../utils/capitalize";
import {connectionStatusIcons, OnOff} from "../utils/devicesFunctions"



const MainScreen = () => {

    const [allDevices, setAllDevices] = useRecoilState(allDevicesStateAtom)
    const [currentDeviceDetails, setCurrentDeviceDetails] = useRecoilState(currentDeviceStateAtom)
    // const [isLoading, setIsLoading] = useRecoilState(isLoadingState);




    useEffect(() => {
        const  fetchAllDevices = async () => {
            // setIsLoading(true)

            try {
                const resp = await axios.get(API)
                await setAllDevices(resp.data)
                // await setIsLoading(false)
            } catch (err) {
                console.error(err)
            }
        }
        fetchAllDevices()
        const interval = setInterval(()=> fetchAllDevices(),1500)
        return ()=>{
            clearInterval(interval)
        }
    }, []);


    return (
        <>
            <div className="container">
                <div
                    className="gradient-custom-panel main-screen text-center p-0 m-0   d-flex flex-column align-items-center  border border-4 ">
                    <h1 className="p-3 fw-bold">Smart Home Devices</h1>
                    {/*{isLoading ?*/}
                    {/*    <Hypnosis color="#005350" width="150px" height="150px" duration="1.5s"/>*/}
                    {/*    :*/}
                    {/*    null}*/}
                    <div className="container">
                        <div className="row">
                            <div className="col col-lg-9">
                                <div className="container  bg-dark  text-light p-0 fw-bold pt-2 pb-2 rounded ">
                                    <div className="row header  border-bottom m-0">
                                        <div className="col-1 p-0">#</div>
                                        <div className="col-3 p-0">Type</div>
                                        <div className="col-3 p-0">Name</div>
                                        <div className="col-3 p-0">Connection</div>
                                        <div className="col-2 p-0 d-none d-md-block">On / Off</div>
                                    </div>

                                    {allDevices.map((device:any, key) => {
                                        return (
                                            <Link key={key} to={`/devices/${device.id}`}
                                                  style={{
                                                      color: 'inherit',
                                                      textDecoration: 'inherit',
                                                      cursor: "pointer"
                                                  }}
                                            >
                                                <div className="row device-row m-0 pt-2 pb-2 fw-bold"
                                                     onClick={() => {
                                                         setCurrentDeviceDetails(device)
                                                     }}>
                                                    <div className="col-1 p-0 ">{key + 1}</div>
                                                    <div
                                                        className="col-4 col-md-3 p-0">{
                                                        capitalizeFirstLetter
                                                        (device.type)} </div>
                                                    <div className="col-4 col-md-3 p-0 ">{device.name}</div>
                                                    <div
                                                        className="col-3 p-0 ">{
                                                        connectionStatusIcons(device)

                                                    }</div>
                                                    <div className="col col-md-2 p-0 d-none d-md-block">{OnOff(device)}
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })}

                                </div>
                            </div>
                            <div className="col-3 	d-none d-lg-block ">
                                <HomeAnimation />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default MainScreen;
