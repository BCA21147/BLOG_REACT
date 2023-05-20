import HeaderUser from './HeaderUser'
import React, { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { GoPrimitiveDot } from 'react-icons/go';
import FooterUser from './FooterUser'
import './UserSingleCatagory.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleCatagoryUser = () => {

    const { catagory } = useParams();

    const [catagory_data, setcatagory_data] = useState([]);
    const [blog_data, setblog_data] = useState([]);
    const [title_data, settitle_data] = useState([]);
    const [catagory_image, setcatagory_image] = useState('');


    var full_star = {};
    var none_star = {};

    const getData = () => {
        axios.get(`https://cute-gray-ant-suit.cyclic.app/get_single_catagory/${catagory}`)
            .then((res) => {
                console.log(res.data.data);
                setcatagory_data(res.data.data);
                settitle_data(res.data.data[0].blog_catagory);
            })
            .catch((err) => { console.log("Data Not Found."); })
    }

    useEffect(() => {
        getData();
        axios.get(`https://cute-gray-ant-suit.cyclic.app/get_all_blog`)
            .then((res) => { console.log(res.data.data); setblog_data(res.data.data) })
            .catch((err) => { console.log("Data Not Found."); })
        axios.get('https://cute-gray-ant-suit.cyclic.app/get_all_catagory')
            .then((res) => {
                console.log(res.data.data);
                for (let i = 0; i < res.data.data.length; i++) {
                    if (res.data.data[i]._id == catagory) {
                        setcatagory_image(res.data.data[i].image);
                        break;
                    }
                }
            })
            .catch((err) => { console.log("Data Not Found."); })
    }, []);

    const searchData = (e) => {
        if (e.target.value == '') {
            getData();
        }
        else {
            axios.get(`https://cute-gray-ant-suit.cyclic.app/search_blog/${catagory}/${e.target.value}`)
                .then((res) => {
                    setcatagory_data(res.data.data)
                })
                .catch((err) => { console.log("Data Not Found."); })
        }
    }

    return (
        <div>
            <HeaderUser />

            <div className="pagination row m-0 d-flex justify-content-center align-items-center">
                <img src={catagory_image} className='w-100' alt="" style={{ height: "50vh", objectFit: "cover" }} />
                <table className='text-uppercase'>
                    <tr>
                        <th className='d-inline'>
                            <GoPrimitiveDot className='text-warning mx-3' />
                            <a href="/">Home</a>
                        </th>
                        <th className='d-inline'>
                            <GoPrimitiveDot className='text-warning mx-3' />
                            <a href={`/Single_Catagory/${catagory}`}>{title_data}</a>
                        </th>
                    </tr>
                </table>
            </div>

            <div className="py-5">
                <div className="container">

                    <div className="row height d-flex justify-content-center align-items-center">
                        <div className="col-md-7">
                            <div className="form">
                                <i className="fa fa-search" />
                                <input type="text" onChange={searchData} className="form-control form-input" placeholder="Search anything..." />
                                <span className="left-pan"><i className="fa fa-microphone" /></span>
                            </div>
                        </div>
                    </div>

                    {/* <div className="py-4"></div> */}
                    <div className="row pt-5 d-flex justify-content-center">


                        {
                            catagory_data.map((val, i) => {

                                var num = 0;
                                for (var j = 0; j < blog_data.length; j++) {
                                    if (title_data == blog_data[j].blog_catagory) { num++; }
                                }
                                // console.log("Total = " + blog_data.length);
                                // console.log(val.blog_catagory + " = " + num);
                                var rate = num * 5 / blog_data.length;
                                // console.log(rate+1);
                                for (let f = 0; f < rate; f++) {
                                    full_star[f] = f
                                }
                                for (let f = 0; f <= 4 - rate; f++) {
                                    none_star[f] = f
                                }

                                return (
                                    <>
                                        {
                                            (i % 2 == 0)
                                                ?
                                                <>
                                                    <hr className='border border-primary w-100' />

                                                    <div className="col-12 px-4 py-2">
                                                        <div className="row">
                                                            <div className="col-md-6 col-12 d-flex justify-content-center align-items-center">
                                                                <a href={`/Single_Blog/${val._id}`} className='w-100' >
                                                                    <img src={val.blog_image} alt={val.blog_title} className='w-100 rounded' srcset="" />
                                                                </a>
                                                            </div>
                                                            <div className="col-md-6 col-12 px-3 py-2 border_blog_start">
                                                                <div className="h-100">
                                                                    <div className="h2 text-uppercase"><a href={`/Single_Blog/${val._id}`} >{val.blog_title}</a></div>
                                                                    <div className="h5 text-right text-uppercase text-primary" style={{ fontWeight: "bold" }}>{val.blog_catagory}&nbsp;</div>
                                                                    <div className="h6 text-justify text-capitalize" style={{ textIndent: "120px", lineHeight: "23px", wordBreak: "break-all", maxHeight: "120px", overflow: "hidden" }}>
                                                                        {val.blog_description}
                                                                    </div>
                                                                    <div className="row m-0">
                                                                        <div className="col-lg-6 col-12 d-flex justify-content-lg-start justify-content-center p-0">
                                                                            <div className='pr-2 text-primary'>Auther :</div>
                                                                            <div className='text-capitalize' style={{ fontWeight: "600" }}>{val.blog_auther}</div>
                                                                        </div>
                                                                        <div className="col-lg-6 col-12 d-flex justify-content-lg-end justify-content-center p-0">
                                                                            <div className='pr-2 text-primary'>Released :</div>
                                                                            <div style={{ fontWeight: "600" }}> {val.blog_date}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row m-0 py-2 text-warning d-flex justify-content-center">

                                                                        {
                                                                            Object.values(full_star).map((r, index) => {
                                                                                return (
                                                                                    <AiFillStar className='mx-2' style={{ transform: "scale(1.5)" }} />
                                                                                )
                                                                            })
                                                                        }
                                                                        {
                                                                            Object.values(none_star).map((r, index) => {
                                                                                return (
                                                                                    <AiOutlineStar className='mx-2' style={{ transform: "scale(1.5)" }} />
                                                                                )
                                                                            })
                                                                        }

                                                                    </div>
                                                                    <div className="row m-0 d-flex justify-content-center p-2">
                                                                        <a href={`/Single_Blog/${val._id}`}>
                                                                            <div className="btn btn-primary">
                                                                                View More...
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <hr className='border border-primary w-100' />

                                                    <div className="col-12 px-4 py-2">
                                                        <div className="row">
                                                            <div className="col-md-6 col-12 px-3 py-2 border_blog_end order-md-0 order-1">
                                                                <div className="h-100">
                                                                    <div className="h2 text-uppercase"><a href={`/Single_Blog/${val._id}`}>{val.blog_title}</a></div>
                                                                    <div className="h5 text-right text-uppercase text-primary" style={{ fontWeight: "bold" }}>{val.blog_catagory}&nbsp;</div>
                                                                    <div className="h6 text-justify text-capitalize" style={{ textIndent: "120px", lineHeight: "23px", wordBreak: "break-all", maxHeight: "120px", overflow: "hidden" }}>
                                                                        {val.blog_description}
                                                                    </div>
                                                                    <div className="row m-0">
                                                                        <div className="col-lg-6 col-12 d-flex justify-content-lg-start justify-content-center p-0">
                                                                            <div className='pr-2 text-primary'>Auther :</div>
                                                                            <div className='text-capitalize' style={{ fontWeight: "600" }}>{val.blog_auther}</div>
                                                                        </div>
                                                                        <div className="col-lg-6 col-12 d-flex justify-content-lg-end justify-content-center p-0">
                                                                            <div className='pr-2 text-primary'>Released :</div>
                                                                            <div style={{ fontWeight: "600" }}> {val.blog_date}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row m-0 py-2 text-warning d-flex justify-content-center">

                                                                        {
                                                                            Object.values(full_star).map((r, index) => {
                                                                                return (
                                                                                    <AiFillStar className='mx-2' style={{ transform: "scale(1.5)" }} />
                                                                                )
                                                                            })
                                                                        }
                                                                        {
                                                                            Object.values(none_star).map((r, index) => {
                                                                                return (
                                                                                    <AiOutlineStar className='mx-2' style={{ transform: "scale(1.5)" }} />
                                                                                )
                                                                            })
                                                                        }

                                                                    </div>
                                                                    <div className="row m-0 d-flex justify-content-center p-2">
                                                                        <a href={`/Single_Blog/${val._id}`}>
                                                                            <div className="btn btn-primary">
                                                                                View More...
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12 d-flex justify-content-center order-md-1 order-0 align-items-center">
                                                                <a href={`/Single_Blog/${val._id}`} className='w-100'>
                                                                    <img src={val.blog_image} alt={val.blog_title} className='w-100 rounded' srcset="" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                        }
                                    </>
                                )
                            })
                        }

                        <hr className='border border-primary w-100' />

                    </div>

                </div>
            </div>

            <FooterUser />
        </div>
    )
}

export default SingleCatagoryUser