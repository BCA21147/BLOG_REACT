import React, { useEffect, useState } from 'react'
import { FaFacebookF } from "react-icons/fa";
import GotoTop from "./GoToTop";
import './UserHeader.css';
import axios from 'axios';

const HeaderUser = () => {

    const [header_data, setheader_data] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/get_all_catagory')
            .then((res) => { console.log(res.data.data); setheader_data(res.data.data) })
            .catch((err) => { console.log("Data Not Found."); })
    }, [])

    return (
        <div className='user_header'>

            <GotoTop />

            <div className="navigation-wrap start-header start-style">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-md navbar-light">
                                <a
                                    className="navbar-brand"
                                    href="/"
                                    target="_blank"
                                >
                                    <img src={require('../Images/blog-logo-1.png')} alt />
                                </a>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon" />
                                </button>
                                <div
                                    className="collapse navbar-collapse"
                                    id="navbarSupportedContent"
                                >
                                    <ul className="pr-2 text-capitalize navbar-nav ml-auto py-4 py-md-0 flex-wrap justify-content-between" style={{ gap: "10px" }}>
                                        <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                            <a className="nav-link" href="/">
                                                Home
                                            </a>
                                        </li>
                                        {
                                            header_data.map((val, i) => {
                                                return (
                                                    <li key={i} className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                                        <a className="nav-link" href={`/Single_Catagory/${val._id}`}>
                                                            {val.catagory}
                                                        </a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className="col-lg-2 my-4 text-center">
                                    <a href="/admin/index" target='_blank' className="btn_signup d-block px-3 py-2">
                                        Sign UP
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HeaderUser