import React, { useEffect, useState } from 'react'
import HeaderAdmin from './HeaderAdmin';
import FooterAdmin from './FooterAdmin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';

const ViewAdmin = () => {

    var nav = useNavigate();

    const [data, setdata] = useState([]);
    const [cookies, setCookie] = useCookies('');

    const getData = () => {
        axios.get('http://localhost:5000/admin/get_admin', {
            headers: {
                Authorization: document.cookie.split('=')[1]
            }
        })
            .then((res) => {
                setdata(res.data.data);
                if (res.data.data = [] && res.data.Token == 'Expire') {
                    nav('/admin');
                }
            })
            .catch(() => { })
    }

    useEffect(() => {
        getData();
    }, [])

    const changeStatus = (e) => {
        // console.log(e.target.value);
        // console.log(e.target.id);
        axios.get(`http://localhost:5000/admin/update_status_admin/${e.target.id}/${e.target.value}`, {
            headers: {
                Authorization: document.cookie.split('=')[1]
            }
        })
            .then((res) => {
                // console.log(res);
                if (res.data.data = [] && res.data.Token == 'Expire') {
                    nav('/admin');
                }
            })
        getData();
    }
    const deleteAdmin = (e) => {
        var confirmData = window.confirm('Are you sure you can DELETE it ..!');
        if (confirmData) {
            axios.get(`http://localhost:5000/admin/delete_admin/${e.target.id}`, {
                headers: {
                    Authorization: document.cookie.split('=')[1]
                }
            })
                .then((res) => {
                    if (res.data.data = [] && res.data.Token == 'Expire') {
                        nav('/admin');
                    }
                })
            getData();
        }
    }
    const editAdmin = (e) => {
        nav(`/admin/edit_admin/${e.target.id}`);
    }
    const searchAdmin = (e) => {
        // console.log(e.target.value);
        if (e.target.value == '') {
            getData();
        }
        else {
            axios.get(`http://localhost:5000/admin/search_admin/${e.target.value}`, {
                headers: {
                    Authorization: document.cookie.split('=')[1]
                }
            })
                .then((res) => {
                    setdata(res.data.data)
                    if (res.data.data = [] && res.data.Token == 'Expire') {
                        nav('/admin');
                    }
                })
                .catch(() => { })
        }
    }

    console.log(data);

    return (
        <>

            <div className='hold-transition sidebar-mini'>
                <div class="wrapper">
                    <HeaderAdmin active={'view_admin'} />
                    <div className="content-wrapper d-flex justify-content-center flex-column">

                        <div className="row m-0 py-5 d-flex justify-content-center" style={{ wordBreak: 'break-all' }}>
                            <div className="col-11">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">View Admin Table</h3>
                                        <div className="card-tools">
                                            <div className="input-group input-group-sm" style={{ width: 250 }}>
                                                <input type="text" name="table_search" autoComplete='off' className="form-control float-right" placeholder="Search Here ..." onChange={searchAdmin} />
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-default">
                                                        <i className="fas fa-search" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body table-responsive p-0">
                                        <table className="table table-hover text-wrap">
                                            <thead>
                                                <tr width='100%'>
                                                    <th width='16%'>ID</th>
                                                    <th width='16%'>Name</th>
                                                    <th width='16%'>Email</th>
                                                    <th width='16%'>PassWord</th>
                                                    <th width='16%'>Status</th>
                                                    <th width='16%'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data.map((val, i) => {

                                                        var pass = '';
                                                        for (let j = 0; j < val.password.length; j++) {
                                                            if (j == 0 || j == 1 || j == val.password.length - 2 || j == val.password.length - 1) {
                                                                pass += val.password[j];
                                                            }
                                                            else {
                                                                pass += '*';
                                                            }
                                                        }

                                                        return (
                                                            <tr>
                                                                <td>{val._id}</td>
                                                                <td>{val.username}</td>
                                                                <td>{val.email}</td>
                                                                <td>
                                                                    {pass}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        (val.status == 0)
                                                                            ? <button className='btn btn-success' onClick={changeStatus} value={val.status} id={val._id}>Active</button>
                                                                            : <button className='btn btn-danger' onClick={changeStatus} value={val.status} id={val._id}>DeActive</button>
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <button className='btn btn-primary w-100 m-1' onClick={editAdmin} id={val._id}>Edit</button>
                                                                    <button className='btn btn-danger w-100 m-1' id={val._id} onClick={deleteAdmin}>Delete</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <FooterAdmin />
                </div>
            </div>
        </>
    )
}

export default ViewAdmin