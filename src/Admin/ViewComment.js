import React, { useEffect, useState } from 'react'
import HeaderAdmin from './HeaderAdmin';
import FooterAdmin from './FooterAdmin';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const ViewComment = () => {

    var nav = useNavigate();

    const [data, setdata] = useState([]);

    const getData = () => {
        axios.get('http://localhost:5000/admin/get_comment', {
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
        axios.get(`http://localhost:5000/admin/update_status_comment/${e.target.id}/${e.target.value}`, {
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
    const deleteComment = (e) => {
        var confirmData = window.confirm('Are you sure you can DELETE it ..!');
        if (confirmData) {
            axios.get(`http://localhost:5000/admin/delete_comment/${e.target.id}`, {
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
    const searchComment = (e) => {
        // console.log(e.target.value);
        if (e.target.value == '') {
            getData();
        }
        else {
            axios.get(`http://localhost:5000/admin/search_comment/${e.target.value}`, {
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
                <HeaderAdmin active={'view_comment'} />
                <div className="content-wrapper d-flex justify-content-center flex-column">

                    <div className="row m-0 py-5 d-flex justify-content-center" style={{ wordBreak: 'break-all' }}>
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">View Comments Table</h3>
                                    <div className="card-tools">
                                        <div className="input-group input-group-sm" style={{ width: 250 }}>
                                            <input type="text" name="table_search" autoComplete='off' className="form-control float-right" style={{ fontWeight: "bold" }} placeholder="Search Here ..." onChange={searchComment} />
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
                                                <th width='10%'>ID</th>
                                                <th width='15%'>Name</th>
                                                <th width='12%'>Email</th>
                                                <th width='10%'>Rating</th>
                                                {/* <th width='11%'>Message</th> */}
                                                <th width='12%'>Status</th>
                                                <th width='10%'>Action</th>
                                            </tr>
                                            <tr className='text-center'>
                                                <th colSpan={6}>Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((val, i) => {

                                                    var full_star = {};
                                                    var none_star = {};
                                                    for (let j = 0; j < val.rating; j++) {
                                                        full_star[j] = j;
                                                    }
                                                    for (let j = 0; j < 5 - val.rating; j++) {
                                                        none_star[j] = j;
                                                    }

                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>{val._id}</td>
                                                                <td>{val.name}</td>
                                                                <td>{val.email}</td>
                                                                <td className='text-warning'>
                                                                    {
                                                                        Object.values(full_star).map((star, index) => {
                                                                            return (
                                                                                <AiFillStar />
                                                                            )
                                                                        })
                                                                    }
                                                                    {
                                                                        Object.values(none_star).map((star, index) => {
                                                                            return (
                                                                                <AiOutlineStar />
                                                                            )
                                                                        })
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        (val.status == 0)
                                                                            ? <button className='btn btn-success' onClick={changeStatus} value={val.status} id={val._id}>Active</button>
                                                                            : <button className='btn btn-danger' onClick={changeStatus} value={val.status} id={val._id}>DeActive</button>
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <button className='btn btn-danger w-100 m-1' id={val._id} onClick={deleteComment}>Delete</button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={1}></td>
                                                                <td colSpan={5}>{val.message}</td>
                                                            </tr>
                                                        </>
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

export default ViewComment