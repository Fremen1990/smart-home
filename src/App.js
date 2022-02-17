import React from 'react';
import {Routes, Route, Link} from "react-router-dom";
import Layout from "./components/Layout";
import MainScreen from "./components/MainScreen";
import DeviceDetailsWindow from "./components/DeviceDetailsWindow";
import Home from "./pages/Home";


function App() {


    return (
        <Layout className="">

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/devices" element={<MainScreen/>} />
                <Route path="/devices/:deviceId"
                       element={
                           <div>
                               <MainScreen/>
                               <DeviceDetailsWindow />

                           </div>
                      }
                         />
            </Routes>
            </Layout>

    );
}

export default App;
