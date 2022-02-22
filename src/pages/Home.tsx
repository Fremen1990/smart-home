import React from 'react';
import Layout from "../components/Layout";
import {Link,} from "react-router-dom";
import homeImg from "../img/smart-home-icon.webp"
import "./Home.css"

import Tilt from 'react-parallax-tilt';

const Home = () => {


    return (

        <Layout className="gradient-custom-panel  row align-items-center justify-content-center vh-75 m-0" header="Welcome to Smart Home!">

            <div className="container  row">

                <div className=" col-md-6 col-lg-4">
                    <Tilt >
                        <img className="img-fluid" src={homeImg} alt="Home"/>

                    </Tilt>


                </div>


                <div className="
                 justify-content-center d-flex flex-column align-items-center py-4 px-0
                col-md-6 col-lg-8"
                >
                    <h1 className="p-3 bg-gradient text-center border rounded p-2 mb-4 fw-bold">Welcome to Smart Home!</h1>


                    <nav className="navbar navbar-light  ">

                        <form className="container-fluid justify-content-start">

                            <Link to="/devices">
                                <button className="btn-lg btn-success me-2 fw-bold" type="button">Go to smart devices list</button>

                            </Link>
                        </form>
                    </nav>

                </div>

            </div>
        </Layout>

    )
}

export default Home;
