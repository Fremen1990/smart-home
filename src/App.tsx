import * as  React from 'react';
import { Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import MainScreen from "./pages/MainScreen";
import DeviceDetailsWindow from "./components/DeviceDetailsWindow";
import Home from "./pages/Home";



const App = () => {


    return (
        <Layout >

                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/devices" element={<MainScreen/>}/>
                    <Route path="/devices/:deviceId"
                           element={
                               <div>
                                   <MainScreen/>
                                   <DeviceDetailsWindow/>
                               </div>}/>
                </Routes>


         </Layout>

    );
}

export default App;
