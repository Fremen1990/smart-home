import {Rnd} from "react-rnd";
import React, {useEffect, useState} from "react";
import ConncetedIcon from "../img/connected.webp";
import DisconnectedIcon from "../img/disconnected.webp";
import CountUp from 'react-countup';
import axios from "axios";
import {API} from "../config";

import "./DeviceDetailsWindow.css"

import {imgDB} from "../imgDB";

import {Link, useParams} from 'react-router-dom';
import useLocalStorage from "../hooks/useLocalStorage";

const DeviceDetailsWindow = (props) => {

    const [widthState, setWidthState] = useLocalStorage("widthState",600);
    const [heightState, setHeightState] = useLocalStorage("heightState",500);
    const [xState, setXState] = useLocalStorage("x",900);
    const [yState, setYState] = useLocalStorage("y",-150);



    const {deviceId} = useParams();
    const [singleDevice, setSingleDevice] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [ deviceImage, setDeviceImage ] = useState('')

    console.log("property", props.allDevices)

    const fetchSingleDevice = async (deviceId) => {
        setLoading(true)
        try {
            const resp = await axios.get(`${API}/${deviceId}`)
            setSingleDevice(resp.data)
            setLoading(false)
        } catch (err) {
            console.error(err);
        }
    }

    const deviceDetails = singleDevice;


    const style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "solid 4px #ddd",
        background: "#333940"
    };

// const image = () =>{
//     let deviceImage = ''
//     imgDB.forEach(device => {
//         if(device.imgDbName === deviceDetails.type && device.imgDbStatus === deviceDetails.status ){
//             setDeviceImage(device.img)
//         }
//     })
// }
//     console.log(image)




    useEffect(() => {
        fetchSingleDevice(deviceId);
    }, [deviceId]);

    if (isLoading) return "Loading..."

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return (
        <Rnd
            className="handle"
            style={style}
            dragHandleClassName="handle"
            bounds="body"
            size={{width: widthState, height: heightState}}
            position={{ x: xState, y:yState }}
            onDragStop={(e, d) => {
                setXState(d.x);
                setYState(d.y);

            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                setWidthState(ref.style.width)
                setHeightState(ref.style.height)

            }}

        >
            <div className="container-fluid border border-3 rounded">

                <div className="nav-handle-move"></div>

                <div className="card">

                    <div className="row g-0">
                        <div className="col-md-4 d-flex align-items-center justify-content-center">

                            {/*<DeviceImage singleDeviceDetails={deviceDetails}/>*/}
                            {/*{JSON.stringify((deviceDetails.imgOn) )}*/}




                            <img src={(require("../img/Electric-bulb-off.png").default)


                            } className="img-fluid rounded-start" alt="..."/>

                            {/*{JSON.stringify(deviceDetails.imgOn)}*/}
                        </div>
                        <div className="col-md-8 text-light">

                            <div className="card-body bg-dark">
                                <h5 className="card-title "><span>Type:</span> <strong
                                    className="text-info">{deviceDetails.type}</strong></h5>
                                <h5 className="card-title"><span>Name:</span> <strong>{deviceDetails.name}</strong></h5>


                                <h5 className="card-title"><span>Status:</span><strong> {deviceDetails.status ?
                                    (<span><strong className="text-success">Connected</strong>< img className="mx-2"
                                                                                                    src={ConncetedIcon}
                                                                                                    alt="Connected"/> </span>)
                                    :
                                    (<span>
                                    <strong className="text-danger">Disconnected</strong>
                                     < img className="mx-2" src={DisconnectedIcon} alt="Disconnected"/>
                                </span>)} </strong></h5>


                                {deviceDetails.status ?
                                    (
                                        <div>

                                            {deviceDetails.color ?
                                                <h5 className="card-title">
                                                    <span>Color: </span>{capitalizeFirstLetter(deviceDetails.color)}
                                                </h5>
                                                :
                                                null

                                            }
                                            {deviceDetails.powerTaken ?

                                                <h5 className="card-title"><span>Power: </span> <strong
                                                    className="text-warning">
                                                    <CountUp duration={1.5}
                                                             end={deviceDetails.powerTaken}/> W
                                                </strong></h5>
                                                :
                                                null

                                            }
                                            {deviceDetails.temperature ?
                                                <h5 className="card-title"><span>Temperature: </span> <strong
                                                    className="text-warning">
                                                    <CountUp duration={2}
                                                             end={deviceDetails.temperature}/> C
                                                </strong></h5>

                                                :

                                                null
                                            }

                                        </div>
                                    )
                                    :
                                    null


                                }


                                <br/>
                                <h5 className="card-title text-decoration-underline">Description:</h5>
                                <button onClick={()=>console.log("Clicked button!!")} className="btn btn-info">TEST CLICKABLE</button>
                                <p className="card-text">{deviceDetails.description}</p>
                            </div>

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
