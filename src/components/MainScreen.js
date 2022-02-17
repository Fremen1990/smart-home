import React, {useEffect, useState} from 'react';
import {Link,} from "react-router-dom";

import "./MainScreen.css"
import DeviceDetailsWindow from "./DeviceDetailsWindow";

import ConncetedIcon from "../img/connected.webp"
import DisconnectedIcon from "../img/disconnected.webp"
import HomeAnimation from "./HomeAnimation";
import {API} from "../config";
import axios from "axios";


const MainScreen = () => {


    const [allDevices, setAllDevices] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [currentDeviceDetails, setCurrentDeviceDetails] = useState({})
    const [isLoading, setLoading] = useState(false);


    const fetchAllDevices = async () => {
        setLoading(true)

        try {
            const resp = await axios.get(API)
            setAllDevices(resp.data)
            setLoading(false)

        } catch(err) {
            console.error(err)
        }


    }

    // await axios.get(API)
    //     .then((resp) => {
    //         setAllDevices(resp.data)
    //         //  allDevices = resp.data
    //     });


    useEffect(() => {
        fetchAllDevices()
        // let interval = setInterval(() => fetchAllDevices(), (1000 * 5))


    }, [showDetails]);

    if (isLoading) return "Loading..."


    return (

        <>


            <div className="container">


                <div
                    className="  gradient-custom-panel text-center p-0 m-0   d-flex flex-column   border border-4 ">


                    <h1 className="p-3 fw-bold">Smart Home Devices</h1>


                    <div className="container">


                        <div className="row">


                            <div className="col-9">


                                <div className="container  bg-dark  text-light p-0 fw-bold pt-2 pb-2 rounded ">
                                    <div className="row header  border-bottom m-0">
                                        <div className="col-1 p-0">#</div>
                                        <div className="col-3 p-0">Type</div>
                                        <div className="col-3 p-0">Name</div>
                                        <div className="col-3 p-0">Status</div>
                                        <div className="col-2 p-0">Status light</div>
                                    </div>

                                    {allDevices.map((device, key) => {
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
                                                         // setShowDetails(true)
                                                         setCurrentDeviceDetails(device)
                                                     }}>
                                                    <div className="col-1 p-0 ">{device.id}</div>
                                                    <div className="col-3 p-0">{device.type}</div>
                                                    <div className="col-3 p-0 ">{device.name}</div>
                                                    <div
                                                        className="col-3 p-0 ">{device.status ? "Connected" : "Disconnected"}</div>
                                                    <div className="col-2 p-0 ">{device.status ? (
                                                        < img src={ConncetedIcon} alt="Connected"/>) : (
                                                        < img src={DisconnectedIcon} alt="Disconnected"/>)}</div>
                                                </div>

                                            </Link>
                                        )
                                    })}

                                    {/*{showDetails ?*/}

                                    {/*    < DeviceDetailsWindow devices={currentDeviceDetails}*/}
                                    {/*                          setShowDetails={setShowDetails}*/}
                                    {/*                          allDevices={allDevices}/>*/}

                                    {/*    :*/}
                                    {/*    null*/}
                                    {/*}*/}

                                </div>


                            </div>


                            <div className="col-3 ">

                                {/*<HomeAnimation/>*/}

                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </>

    )
}


export default MainScreen;
