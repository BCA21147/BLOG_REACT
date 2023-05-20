import axios from 'axios';
import React, { useDebugValue, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
// import './AdminLogin.css';

const LoginAdmin = () => {

    const dispatch = useDispatch();

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [cookies, setCookie] = useCookies('');


    const nav = useNavigate();
    const Login = (e) => {


        e.preventDefault();

        if (email != '' && password != '') {
            axios.post('https://cute-gray-ant-suit.cyclic.app/admin/check_admin', {
                email: email,
                password: password
            })
                .then((res) => {
                    // console.log(res.data.token);      
                    setCookie('ToKeN', res.data.token, { maxAge: 5 * 60 });

                    console.log(res.data.data);

                    // sessionStorage.setItem('Token',res.data.token);
                    // console.log(document.cookie.split('=')[1]);
                    if ((res.data.data).length == 1) {
                        localStorage.setItem('Minites', 6);
                        localStorage.setItem('Second', 0);
                        localStorage.setItem('User_Data_Name', res.data.data[0].username);
                        localStorage.setItem('User_Data_Email', res.data.data[0].email);
                        nav('/admin/index');
                    }
                    else {
                        alert('ADMIN Not Found..!\n\nPlease..! Try Again.');
                        nav('/admin');
                    }
                    // console.log(res.data.data);
                    setemail('')
                    setpassword('');
                    document.getElementById('remember').checked = false;
                })
                .catch((err) => { console.log(err); })
        }
        else {
            alert('Please Fill Blank Details..!');
        }
    }

    return (
        <div>

            <div className="hold-transition login-page">
                <div className="login-box">
                    <div className="login-logo">
                        <a href="/"><b>BLOG</b>S</a>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">Sign in to start your session</p>
                            <form>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder="Email" required />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder="Password" required />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        <div className="icheck-primary">
                                            <input type="checkbox" id="remember" />
                                            <label htmlFor="remember">
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <button type="submit" className="btn btn-primary btn-block" onClick={Login}>Sign In</button>
                                    </div>
                                </div>
                            </form>
                            <div className="social-auth-links text-center mb-3">
                                <p>- OR -</p>
                                <a href="#" className="btn btn-block btn-primary">
                                    <i className="fab fa-facebook mr-2" /> Sign in using Facebook
                                </a>
                                <a href="#" className="btn btn-block btn-danger">
                                    <i className="fab fa-google-plus mr-2" /> Sign in using Google+
                                </a>
                            </div>
                            <p className="mb-1">
                                <a href="/">I forgot my password</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LoginAdmin