import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoToTop from '../User/GoToTop';

const HeaderAdmin = (value) => {

    const nav = useNavigate();

    const minutes = useSelector((state) => state.counter.setMinutes);
    const seconds = useSelector((state) => state.counter_1.setSecond);

    const setDefaultDB = () => {

        if (window.confirm('Are You Sure...?\n\nYou Can Change DataBase...!')) {
            axios.get('http://localhost:5000/admin/setDefaultDB', {
                headers: {
                    Authorization: document.cookie.split('=')[1]
                }
            })
                .then((res) => {
                    if(res.data.Status="DONE")
                    {
                        nav('/admin/index');
                    }
                    if (res.data.data = [] && res.data.Token == 'Expire') {
                        nav('/admin');
                    }
                })
                .catch((err) => {
                })
        }
    }

    return (
        <div>
            <GoToTop/>
            <div>
                {/* <!-- Preloader --> */}
                {/* <div class="preloader flex-column justify-content-center align-items-center">
                    <img class="animation__shake" src="/dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60"/>
                </div> */}
                {/* Navbar */}
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    {/* Left navbar links */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="#" className="nav-link">Home</a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="#" className="btn btn-primary" onClick={setDefaultDB}>Set Default DataBase</a>
                        </li>
                    </ul>
                    {/* Right navbar links */}
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item d-flex align-items-center">
                            <div>Session ExpiresIn</div>
                            <a href="#" className='px-2 mx-1 rounded fw-bold bg-dark'>{(minutes < 10) ? "0" + minutes : minutes}</a>
                            <a href="#" className='px-2 mx-1 rounded fw-bold bg-light'>:</a>
                            <a href="#" className='px-2 mx-1 rounded fw-bold bg-dark'>{(seconds < 10) ? "0" + seconds : seconds}</a>
                            <div>Min.</div>
                        </li>
                        {/* Navbar Search */}
                        <li className="nav-item">
                            <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                                <i className="fas fa-search" />
                            </a>
                            <div className="navbar-search-block">
                                <form className="form-inline">
                                    <div className="input-group input-group-sm">
                                        <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                                        <div className="input-group-append">
                                            <button className="btn btn-navbar" type="submit">
                                                <i className="fas fa-search" />
                                            </button>
                                            <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                                <i className="fas fa-times" />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                                <i className="fas fa-expand-arrows-alt" />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
                                <i className="fas fa-th-large" />
                            </a>
                        </li>
                    </ul>
                </nav>
                {/* /.navbar */}
                {/* Main Sidebar Container */}
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <a href="#" className="brand-link">
                        <img src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                        <span className="brand-text font-weight-light">AdminLTE 3</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image d-flex align-items-center">
                                <img src="/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className='d-flex flex-column'>
                                <div className="info">
                                    <a href="#" className="d-block">{localStorage.getItem('User_Data_Name')}</a>
                                </div>
                                <div className="info">
                                    <a href="#" className="d-block">{localStorage.getItem('User_Data_Email')}</a>
                                </div>
                            </div>
                        </div>
                        {/* SidebarSearch Form */}
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                                <li className="nav-header">DASHBOARD</li>
                                <li className="nav-item">
                                    <a href="/admin/index" className={(value.active == 'dashboard' ? "nav-link active" : "nav-link")}>
                                        <i className="nav-icon fas fa-tachometer-alt" />
                                        <p>
                                            Dashboard
                                            {/* <i className="right fas fa-angle-left" /> */}
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-header">ADMIN</li>
                                <li className="nav-item">
                                    <a href="/admin/add_admin" className={(value.active == 'add_admin' ? "nav-link active" : "nav-link")}>
                                        <i className="nav-icon fas fa-plus" />
                                        <p>
                                            ADD Admin
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/admin/view_admin" className={(value.active == 'view_admin' ? "nav-link active" : "nav-link")}>
                                        <i className="nav-icon fas fa-eye" />
                                        <p>
                                            VIEW Admin
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-header">CATAGORY</li>
                                <li className="nav-item">
                                    <a href="/admin/add_catagory" className={(value.active == 'add_catagory' ? "nav-link active" : "nav-link")}>
                                        <i className="nav-icon fas fa-plus" />
                                        <p>
                                            ADD Catagory
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/admin/view_catagory" className={(value.active == 'view_catagory' ? "nav-link active" : "nav-link")}>
                                        <i className="nav-icon fas fa-eye" />
                                        <p>
                                            VIEW Catagory
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-header">BLOG</li>
                                <li className="nav-item">
                                    <a href="/admin/add_blog" className={(value.active == 'add_blog' ? "nav-link active" : "nav-link")}>
                                        <i className="nav-icon fas fa-plus" />
                                        <p>
                                            ADD Blog
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/admin/view_blog" className={(value.active == 'view_blog' ? "nav-link active" : "nav-link")}>
                                        <i className="nav-icon fas fa-eye" />
                                        <p>
                                            VIEW Blog
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-header">COMMENT</li>
                                <li className="nav-item">
                                    <a href="/admin/view_comment" className={(value.active == 'view_comment' ? "nav-link active" : "nav-link")}>
                                        <i className="nav-icon fas fa-eye" />
                                        <p>
                                            VIEW Comment
                                        </p>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
            </div>

        </div>
    )
}

export default HeaderAdmin