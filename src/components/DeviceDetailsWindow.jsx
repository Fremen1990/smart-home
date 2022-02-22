import {Rnd} from "react-rnd";
import React, {useEffect, useState} from "react";
import CountUp from 'react-countup';
import axios from "axios";
import {API} from "../config";

import "./DeviceDetailsWindow.css"

import {Link, useParams} from 'react-router-dom';
import useLocalStorage from "../hooks/useLocalStorage";
import {Hypnosis} from "react-cssfx-loading";
import {useRecoilState} from "recoil";
import {isLoadingState} from "../atoms";

// import {currentDeviceState} from "../atoms";

import {HuePicker} from 'react-color';

// import {useRecoilState} from "recoil";


import {capitalizeFirstLetter} from "../utils/capitalize";
import {connectionStatusIcons, OnOff} from "../utils/devicesFunctions";


import {DeviceEntity} from "../atoms"





const DeviceDetailsWindow = ()  => {

    // Using Recoil -> and pulling data from global state, no need to fetch one more time
    // const singleDevice = useRecoilState(currentDeviceState)[0]



    // Standard useState hook reference to useEffect and fetching data directly from /smart-devices/${index}
    const [singleDevice, setSingleDevice] = useState([])

    // data reference to window position and window size
    const [widthState, setWidthState] = useLocalStorage("widthState", 1100);
    const [heightState, setHeightState] = useLocalStorage("heightState", 700);
    const [xState, setXState] = useLocalStorage("x", 400);
    const [yState, setYState] = useLocalStorage("y", -200);

    const [isLoading, setIsLoading] = useRecoilState(isLoadingState);

    const {deviceId} = useParams();


    // const currentDeviceRecoilState = useRecoilState(currentDeviceState)
    const [bulbColorState, setBulbColorState] = useState("")
    const [bulbBrightnessState, setBulbBrightnessState] = useState(100)


    const handleChangeBrightness = (brightness) => {
        setBulbBrightnessState(brightness)
    }

    const handleChange = (color, event) => {
        setBulbColorState(color.hex)
    }


    const handleChangeComplete = (color) => {
        setBulbColorState(color.hex);
    };

    const changeBrightnessDb = async (deviceId, newBrightnessValue) => {
        try {
            const device = await axios.get(`${API}/${deviceId}`)
            const res = await axios.put(`${API}/${deviceId}`, {...device.data, brightness: newBrightnessValue},
            )

            return res;
        } catch (e) {
            console.log(e)
        }
    }

    const changeColorDb = async (deviceId, newColorValue) => {
        try {
            const device = await axios.get(`${API}/${deviceId}`)
            const res = await axios.put(`${API}/${deviceId}`, {...device.data, color: newColorValue},
            )
            return res
        } catch (e) {
            console.log(e)
        }
    }


    const style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "solid 4px #ddd",
        background: "#333940"
    };


    useEffect(() => {
        const fetchSingleDevice = async (deviceId) => {
            // setIsLoading(true)
            try {
                const resp = await axios.get(`${API}/${deviceId}`)
                await setSingleDevice(resp.data)
                // await setIsLoading(false)
            } catch (err) {
                console.error(err);
            }
        }
        fetchSingleDevice(deviceId);

        const interval = setInterval(() => {
            fetchSingleDevice(deviceId)
        }, 500)
        return () => clearInterval(interval)
    }, [deviceId]);


    return (
        <Rnd
            // className="handle"
            // className="p-3 m-3"
            style={style}
            dragHandleClassName="handle"
            // bounds="body"
            size={{width: widthState, height: heightState}}
            position={{x: xState, y: yState}}
            onDragStop={(e, d) => {
                setXState(d.x);
                setYState(d.y);

            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                setWidthState(ref.style.width)
                setHeightState(ref.style.height)

            }}

        >

            <div className="m-5 p-0 container device-details-window">

                <div className="nav-handle-move handle d-flex justify-content-end ">
                    <Link to={`/devices`}
                          style={{color: 'inherit', textDecoration: 'inherit', cursor: "pointer"}}
                    >
                        <button className="text-danger btn fw-bold h-100 "
                                style={{fontSize: "28px", lineHeight: "28px"}}>X
                        </button>

                    </Link>
                </div>







                <div className="card ">

                    <div className="row g-0 device-details-window-row">

                        <div
                            className="bg-dark col-md-4 d-flex align-items-center justify-content-center  border border-5">


                            <div className="d-flex align-items-center justify-content-center   h-100 w-100"
                                 style={
                                     singleDevice.color || singleDevice.brightness ? (
                                             !bulbColorState || !bulbBrightnessState ?
                                                 {
                                                     backgroundColor: `${singleDevice.color}`,
                                                     opacity: `${singleDevice.brightness / 100}`

                                                 }
                                                 :
                                                 {
                                                     backgroundColor: `${bulbColorState}`,
                                                     opacity: `${bulbBrightnessState / 100}`

                                                 }
                                         )
                                         :
                                         {
                                             backgroundColor: "white",
                                             opacity: 1
                                         }


                                 }


                            >

                                <span className="" style={{fontSize: "10vw"}}>{singleDevice.icon}</span>
                            </div>
                        </div>


                        <div className="col-md-8 text-light bg-dark row">

                            <div className="card-body bg-dark col-6">


                                <h5 className="card-title card-device-details-line"><span>ID:
                                </span> <strong className="text-info">{(singleDevice.id)}</strong></h5>


                                <h5 className="card-title  card-device-details-line"><span>Type:
                                </span> <strong className="text-primary">{(singleDevice.type)}</strong></h5>

                                <h5 className="card-title card-device-details-line"><span>Name: </span>
                                    <strong>{singleDevice.name}</strong></h5>

                                <h5 className="card-title card-device-details-line"><span>Place: </span>
                                    <strong>{singleDevice.place}</strong>
                                </h5>





                            </div>

                            <div className="card-body bg-dark col-6">

                                <h5 className="card-title card-device-details-line"><span>Connection:</span><strong
                                    className="px-3">

                                    {connectionStatusIcons(singleDevice)}</strong></h5>

                                <h5 className="card-title card-device-details-line"><span>On/Off:  </span>
                                    <strong className="px-3">{OnOff(singleDevice)}</strong>
                                </h5>

                                {singleDevice.brightness ?

                                    <h5 className="card-title card-device-details-line"><span>Brightness: </span>
                                        <strong>{singleDevice.brightness}/100</strong>
                                        <button className="btn btn-primary m-2"
                                                onClick={() => changeBrightnessDb(deviceId, bulbBrightnessState)}
                                        >Change
                                            brightness
                                        </button>

                                        <input min='0' max='100' type="range" className="form-range" id="customRange1"
                                               onChange={
                                                   (event) => handleChangeBrightness(event.target.value)
                                               }/>


                                    </h5>


                                    :
                                    null
                                }


                                {singleDevice.color ?
                                    (
                                        <div>

                                            {singleDevice.color ?
                                                <h5 className="card-title">
                                                    <span>Color: </span>
                                                    {capitalizeFirstLetter(singleDevice.color)}
                                                    <button className="btn btn-primary m-2"
                                                            onClick={() => changeColorDb(deviceId, bulbColorState)}
                                                    >Change color
                                                    </button>
                                                    <HuePicker
                                                        color={!bulbColorState ? singleDevice.color : bulbColorState}
                                                        onChange={handleChange}
                                                        onChangeComplete={handleChangeComplete}
                                                        className="my-2"
                                                    />

                                                </h5>
                                                :
                                                null
                                            }

                                        </div>
                                    )
                                    :
                                    null
                                }

                                {singleDevice.powerConsumption ?

                                    <h5 className="card-title card-device-details-line my-3">
                                        <span>Power consumption: </span>
                                        <strong
                                            className="text-warning">
                                            <CountUp duration={1.5}
                                                     end={singleDevice.powerConsumption}/> W
                                        </strong></h5>
                                    :
                                    null

                                }


                                {singleDevice.temperature ?
                                    <h5 className="card-title card-device-details-line">
                                        <span>Temperature: </span> <strong
                                        className="text-warning">
                                        <CountUp duration={2}
                                                 end={singleDevice.temperature}/> C
                                    </strong></h5>

                                    :

                                    null
                                }
                                <br/>

                                {isLoading ? <Hypnosis color="#005350" width="150px" height="150px" duration="1.5s"/>
                                    :
                                    null}
                            </div>
                            <h5 className="card-title text-decoration-underline">Description:</h5>

                            <p className="card-text">{singleDevice.description}</p>


                            <Link to={`/devices`}
                                  style={{color: 'inherit', textDecoration: 'inherit', cursor: "pointer"}}
                            >

                                <div className="bg-warning text-danger btn w-100 fw-bold">Close
                                </div>

                            </Link>

                        </div>
                    </div>

                </div>
            </div>
        </Rnd>
    )
}

export default DeviceDetailsWindow;
