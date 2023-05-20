import React, { useEffect, useState } from 'react'
import HeaderAdmin from './HeaderAdmin';
import FooterAdmin from './FooterAdmin';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewBlog = () => {

    var nav = useNavigate();

    const [data, setdata] = useState([]);

    const getData = () => {
        axios.get('https://cute-gray-ant-suit.cyclic.app/admin/get_blog', {
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
        axios.get(`https://cute-gray-ant-suit.cyclic.app/admin/update_status_blog/${e.target.id}/${e.target.value}`, {
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
    const deleteBlog = (e) => {
        var confirmData = window.confirm('Are you sure you can DELETE it ..!');
        if (confirmData) {
            axios.get(`https://cute-gray-ant-suit.cyclic.app/admin/delete_blog/${e.target.id}`, {
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
    const editBlog = (e) => {
        nav(`/admin/edit_blog/${e.target.id}`);
    }
    const searchBlog = (e) => {
        // console.log(e.target.value);
        if (e.target.value == '') {
            getData();
        }
        else {
            axios.get(`https://cute-gray-ant-suit.cyclic.app/admin/search_blog/${e.target.value}`, {
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
                <HeaderAdmin active={'view_blog'} />
                <div className="content-wrapper d-flex justify-content-center flex-column">

                    <div className="row m-0 py-5 d-flex justify-content-center" style={{ wordBreak: 'break-all' }}>
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">View Blog Table</h3>
                                    <div className="card-tools">
                                        <div className="input-group input-group-sm" style={{ width: 250 }}>
                                            <input type="text" name="table_search" autoComplete='off' className="form-control float-right" style={{ fontWeight: "bold" }} placeholder="Search Here ..." onChange={searchBlog} />
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
                                                <th width='15%'>Blog_Image</th>
                                                <th width='12%'>Blog_Title</th>
                                                <th width='10%'>Blog_Catagory</th>
                                                <th width='11%'>Blog_Date</th>
                                                <th width='11%'>Blog_Auther</th>
                                                <th width='12%'>Status</th>
                                                <th width='10%'>Action</th>
                                            </tr>
                                            <tr className='text-center'>
                                                <th colSpan={8}>Blog_Description</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-justify'>
                                            {
                                                data.map((val, i) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>{val._id}</td>
                                                                <td><img src={val.blog_image} alt={val.blog_image} className='w-100' srcset="" /></td>
                                                                <td>{val.blog_title}</td>
                                                                <td>{val.blog_catagory}</td>
                                                                <td>{val.blog_date}</td>
                                                                <td>{val.blog_auther}</td>
                                                                <td>
                                                                    {
                                                                        (val.status == 0)
                                                                            ? <button className='btn btn-success' onClick={changeStatus} value={val.status} id={val._id}>Active</button>
                                                                            : <button className='btn btn-danger' onClick={changeStatus} value={val.status} id={val._id}>DeActive</button>
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <button className='btn btn-primary w-100 m-1' onClick={editBlog} id={val._id}>Edit</button>
                                                                    <button className='btn btn-danger w-100 m-1' id={val._id} onClick={deleteBlog}>Delete</button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={1}></td>
                                                                <td colSpan={7}>{val.blog_description}</td>
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

export default ViewBlog