import React, { useEffect, useState } from 'react'
import HeaderAdmin from './HeaderAdmin';
import FooterAdmin from './FooterAdmin';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewCatagory = () => {

    var nav = useNavigate();

    const [data, setdata] = useState([]);

    const getData = () => {
        axios.get('https://cute-gray-ant-suit.cyclic.app/admin/get_catagory', {
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

    useEffect(() => {
        getData();
    }, [])

    const changeStatus = (e) => {
        // console.log(e.target.value);
        // console.log(e.target.id);
        axios.get(`https://cute-gray-ant-suit.cyclic.app/admin/update_status_catagory/${e.target.id}/${e.target.value}`, {
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
    const deleteCatagory = (e) => {
        var confirmData = window.confirm('Are you sure you can DELETE it ..! \n\n Note :- This Catagory Releted All Blog Must Be DELETED.');
        if (confirmData) {
            axios.get(`https://cute-gray-ant-suit.cyclic.app/admin/delete_catagory/${e.target.id}`, {
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
    const editCatagory = (e) => {
        nav(`/admin/edit_catagory/${e.target.id}`);
    }
    const searchCatagory = (e) => {
        // console.log(e.target.value);
        if (e.target.value == '') {
            getData();
        }
        else {
            axios.get(`https://cute-gray-ant-suit.cyclic.app/admin/search_catagory/${e.target.value}`, {
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
    }

    return (
        <div className='hold-transition sidebar-mini'>
            <div class="wrapper">
                <HeaderAdmin active={'view_catagory'} />
                <div className="content-wrapper d-flex justify-content-center flex-column">

                    <div className="row m-0 py-5 d-flex justify-content-center" style={{ wordBreak: 'break-all' }}>
                        <div className="col-11">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">View Catagory Table</h3>
                                    <div className="card-tools">
                                        <div className="input-group input-group-sm" style={{ width: 250 }}>
                                            <input type="text" name="table_search" autoComplete='off' className="form-control float-right" placeholder="Search Here ..." onChange={searchCatagory} />
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
                                                <th width='20%'>ID</th>
                                                <th width='15%'>Catagory_Name</th>
                                                <th width='30%'>Catagory_Image</th>
                                                <th width='15%'>Status</th>
                                                <th width='20%'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((val, i) => {
                                                    return (
                                                        <tr>
                                                            <td>{val._id}</td>
                                                            <td>{val.catagory}</td>
                                                            <td><img src={val.image} alt={val.image} className='w-100' srcset="" /></td>
                                                            <td>
                                                                {
                                                                    (val.status == 0)
                                                                        ? <button className='btn btn-success' onClick={changeStatus} value={val.status} id={val._id}>Active</button>
                                                                        : <button className='btn btn-danger' onClick={changeStatus} value={val.status} id={val._id}>DeActive</button>
                                                                }
                                                            </td>
                                                            <td>
                                                                <button className='btn btn-primary w-100 m-1' onClick={editCatagory} id={val._id}>Edit</button>
                                                                <button className='btn btn-danger w-100 m-1' id={val._id} onClick={deleteCatagory}>Delete</button>
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
    )
}

export default ViewCatagory