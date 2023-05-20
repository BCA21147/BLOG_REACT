import React, { useEffect, useState } from 'react'
import HeaderUser from './HeaderUser'
import FooterUser from './FooterUser'
import { AiFillStar, AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineStar } from 'react-icons/ai'
import { GoPrimitiveDot } from 'react-icons/go';
import './UserSingleBlog.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SingleBlogUser = () => {

    const { blog } = useParams();
    const nav = useNavigate();

    const [catagory_data, setcatagory_data] = useState([]);
    const [blog_data, setblog_data] = useState([]);
    const [top5_data, settop5_data] = useState([]);
    const [last5_data, setlast5_data] = useState([]);
    const [comment_data, setcomment_data] = useState([]);
    const [findCatId, setfindCatId] = useState('');

    var full_star = {};
    var none_star = {};

    useEffect(() => {
        axios.get(`http://localhost:5000/get_catagory_id/${blog}`)
            .then((res) => { console.log(res.data.data); setfindCatId(res.data.data[0]._id) })
            .catch((err) => { console.log("Data Not Found."); })
        axios.get(`http://localhost:5000/get_top_5_blog`)
            .then((res) => { console.log(res.data.data); settop5_data(res.data.data) })
            .catch((err) => { console.log("Data Not Found."); })
        axios.get(`http://localhost:5000/get_latest_5_blog`)
            .then((res) => { console.log(res.data.data); setlast5_data(res.data.data) })
            .catch((err) => { console.log("Data Not Found."); })
        axios.get(`http://localhost:5000/get_comment`)
            .then((res) => { console.log(res.data.data); setcomment_data(res.data.data) })
            .catch((err) => { console.log("Data Not Found."); })
        axios.get(`http://localhost:5000/get_all_blog`)
            .then((res) => { console.log(res.data.data); setblog_data(res.data.data) })
            .catch((err) => { console.log("Data Not Found."); })
        axios.get(`http://localhost:5000/get_single_blog/${blog}`)
            .then((res) => {
                console.log(res.data.data); setcatagory_data(res.data.data[0])
            })
            .catch((err) => { console.log("Data Not Found."); })
    }, []);

    var rate;
    if (catagory_data.blog_rating == null) {
        var num = 0;
        for (var j = 0; j < blog_data.length; j++) {
            if (catagory_data.blog_catagory == blog_data[j].blog_catagory) { num++; }
        }
        rate = num * 5 / blog_data.length;
    }
    else {
        rate = catagory_data.blog_rating;
    }
    for (let f = 0; f < rate; f++) {
        full_star[f] = f;
    }
    for (let f = 0; f <= 4 - rate; f++) {
        none_star[f] = f;
    }


    const [star, setstar] = useState(0);

    const Reviews = (e) => {
        // console.log(e.target.id);
        setstar(parseInt(e.target.id));
        for (let i = 0; i < 5; i++) {
            var doc = document.getElementById(`${i + 1}`).style.color = "#000";
        }
        for (let i = 0; i < parseInt(e.target.id); i++) {
            var doc = document.getElementById(`${i + 1}`).style.color = "#fc0";
        }
    }

    const nextBtn = () => {
        axios.get(`http://localhost:5000/single_blog/next_btn/${blog}`)
            .then((res) => {
                console.log(res.data.data);
                nav(`/Single_Blog/Next_Page/${res.data.data}`);
                window.location.reload();
            })
            .catch((err) => { console.log("Data Not Found."); })
    }
    const prevBtn = () => {
        axios.get(`http://localhost:5000/single_blog/prev_btn/${blog}`)
            .then((res) => {
                console.log(res.data.data);
                nav(`/Single_Blog/Prev_Page/${res.data.data}`);
                window.location.reload();
            })
            .catch((err) => { console.log("Data Not Found."); })
    }


    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [message, setmessage] = useState('');

    const formSubmit = (e) => {
        if (username != '' && email != '' && message != '') {
            axios.post(`http://localhost:5000/add_comment/${catagory_data._id}`, {
                name: username,
                email: email,
                message: message,
                rating: (star == 0) ? 3 : star
            })
                .then((res) => {
                    console.log("Data Posted..!");
                    setusername('');
                    setemail('');
                    setstar(0);
                    setmessage('');

                    nav(`/Single_Blog/${blog}`);
                });
        }
        else {
            console.log("Please ! Fill All Fields..!");
        }
    }

    return (
        <div>
            <HeaderUser />

            <div className="pagination row m-0 d-flex justify-content-center align-items-center overflow-hidden">
                <img src={catagory_data.blog_image} className='w-100' alt="" style={{ height: "50vh", objectFit: "cover" }} />
                <table className='text-uppercase'>
                    <tr>
                        <th className='d-inline'>
                            <GoPrimitiveDot className='text-warning mx-3' />
                            <a href="/">Home</a>
                        </th>
                        <th className='d-inline'>
                            <GoPrimitiveDot className='text-warning mx-3' />
                            <a href={`/Single_Catagory/${findCatId}`}>{catagory_data.blog_catagory}</a>
                        </th>
                        <th className='d-inline'>
                            <GoPrimitiveDot className='text-warning mx-3' />
                            <a href={`/Single_Blog/${blog}`}>{catagory_data.blog_title}</a>
                        </th>
                    </tr>
                </table>
            </div>

            <div className="py-5">
                <div className="container">
                    <div className="row py-2">
                        <div className="user_card col-12 col-lg-8 py-2 px-3">
                            <div className="card p-3">
                                <div className="row m-0">
                                    <div className="col-12">
                                        <img src={catagory_data.blog_image} alt="" className='w-100 rounded' />
                                    </div>
                                    <div className="col-12">
                                        <div className="h2 pt-1 text-uppercase text-center">{catagory_data.blog_title}</div>
                                    </div>
                                    <div className="col-12 py-2 d-flex justify-content-center text-warning">

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
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12 col-md-6 text-center d-flex justify-content-md-start justify-content-center">
                                                <table className=''>
                                                    <tr>
                                                        <th className='text-primary text-capitalize'>Author</th>
                                                        <th className='px-2'>:</th>
                                                        <td className='text-capitalize'>{catagory_data.blog_auther}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='text-primary text-capitalize'>Released</th>
                                                        <th className='px-2'>:</th>
                                                        <td className='text-capitalize'>{catagory_data.blog_date}</td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div className="col-12 col-md-6 d-flex justify-content-md-end align-items-center justify-content-center">
                                                <div className="h5 py-1 text-uppercase text-right text-primary" style={{ fontWeight: "600" }}>{catagory_data.blog_catagory}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 text-justify py-1 overflow-hidden text-capitalize" style={{ textIndent: "200px", maxHeight: "245px" }}>
                                        {catagory_data.blog_description}
                                    </div>
                                    <div className="first_letter_change col-12 text-justify py-1 overflow-hidden text-capitalize" style={{ textIndent: "100px", maxHeight: "240px" }}>
                                        A blog (a truncation of "weblog")[1] is an informational website published on the World Wide Web consisting of discrete, often informal diary-style text entries (posts). Posts are typically displayed in reverse chronological order so that the most recent post appears first, at the top of the web page. Until 2009, blogs were usually the work of a single individual,[citation needed] occasionally of a small group, and often covered a single subject or topic. In the 2010s, "multi-author blogs" (MABs) emerged.
                                    </div>
                                </div>
                            </div>
                            <div className="next_prev_btn row mx-3 d-flex justify-content-sm-between justify-content-center">
                                <a href="#" className='d-flex' onClick={prevBtn}>
                                    <div><AiOutlineDoubleLeft className='mx-1' style={{ fontSize: "larger" }} /></div>
                                    <div>Prev</div>
                                </a>
                                <a href="#" className='d-flex' onClick={nextBtn}>
                                    <div>Next</div>
                                    <div><AiOutlineDoubleRight className='mx-1' style={{ fontSize: "larger" }} /></div>
                                </a>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 d-flex flex-column flex-lg-column flex-md-row py-2 px-3">
                            <div className="card p-3 mx-2 mx-lg-0">
                                <div className="row">
                                    <div className="col-12 py-1">
                                        <div className="heading_blog_top py-1 px-3 bg-dark" style={{ fontWeight: "600" }}>
                                            Top 5 Blogs.
                                        </div>
                                    </div>
                                    <div className="blog_card col-12">

                                        {
                                            top5_data.map((val, i) => {
                                                return (
                                                    <div className="card p-1 mb-0 my-3">
                                                        <div className="row">
                                                            <div className="col-4 d-flex justify-content-center align-items-center">
                                                                <a href={`/Single_Blog/${val._id}`}>
                                                                    <img src={val.blog_image} alt={val.blog_title} srcset="" className='rounded-circle' style={{ width: "70px", height: "70px" }} />
                                                                </a>
                                                            </div>
                                                            <div className="col-8 d-flex flex-column justify-content-between">
                                                                <div className="h6  text-uppercase text-truncate pt-1" style={{ fontWeight: "bold" }}> <a href={`/Single_Blog/${val._id}`} className='text-dark'>{val.blog_title}</a> </div>
                                                                <div className=" text-capitalize overflow-hidden text-justify text-secondary text-truncate" style={{ fontSize: "12px" }}>
                                                                    {val.blog_description}
                                                                </div>
                                                                <div className=" text-right">
                                                                    <a href={`/Single_Blog/${val._id}`} className=''>Read More...</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="card p-3 mx-2 mx-lg-0">
                                <div className="row">
                                    <div className="col-12 py-1">
                                        <div className="heading_blog_top py-1 px-3 bg-dark" style={{ fontWeight: "600" }}>
                                            Latest 5 Blogs.
                                        </div>
                                    </div>
                                    <div className="blog_card col-12">

                                        {
                                            last5_data.map((val, i) => {
                                                return (
                                                    <div className="card p-1 mb-0 my-3">
                                                        <div className="row">
                                                            <div className="col-4 d-flex justify-content-center align-items-center">
                                                                <a href={`/Single_Blog/${val._id}`}>
                                                                    <img src={val.blog_image} alt={val.blog_title} srcset="" className='rounded-circle' style={{ width: "70px", height: "70px" }} />
                                                                </a>
                                                            </div>
                                                            <div className="col-8 d-flex flex-column justify-content-between">
                                                                <div className="h6  text-uppercase text-truncate pt-1" style={{ fontWeight: "bold" }}> <a href={`/Single_Blog/${val._id}`} className='text-dark'>{val.blog_title}</a> </div>
                                                                <div className=" text-capitalize overflow-hidden text-justify text-secondary text-truncate" style={{ fontSize: "12px" }}>
                                                                    {val.blog_description}
                                                                </div>
                                                                <div className=" text-right">
                                                                    <a href={`/Single_Blog/${val._id}`} className=''>Read More...</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row p-2">

                        {
                            (comment_data == [])
                                ?
                                console.log("")
                                :
                                <div className="col-12 col-md-8">
                                    <hr className='w-100 border border-primary' />
                                    <section id="testimonials">
                                        {/*heading-*/}
                                        <div className="testimonial-heading">
                                            <span>Comments</span>
                                            <h4>Clients Says</h4>
                                        </div>
                                        {/*testimonials-box-container----*/}
                                        <div className="testimonial-box-container">

                                            {/*BOX-1------------*/}
                                            {
                                                comment_data.map((val, i) => {

                                                    var full_star = {};
                                                    var none_star = {};
                                                    for (let j = 0; j < val.rating; j++) {
                                                        full_star[j] = j;
                                                    }
                                                    for (let j = 0; j < 5 - val.rating; j++) {
                                                        none_star[j] = j;
                                                    }

                                                    return (
                                                        <div className="col-11 testimonial-box">
                                                            {/*top-----------------------*/}
                                                            <div className="box-top">
                                                                {/*profile---*/}
                                                                <div className="profile">
                                                                    {/*img--*/}
                                                                    <div className="profile-img">
                                                                        <img src={require('../Images/client.png')} />
                                                                    </div>
                                                                    {/*name-and-username*/}
                                                                    <div className="name-user" style={{ wordBreak: "break-all" }}>
                                                                        <strong>{val.name}</strong>
                                                                        <span>@{val.email}</span>
                                                                    </div>
                                                                </div>
                                                                {/*reviews----*/}
                                                                <div className="reviews">
                                                                    {
                                                                        Object.values(full_star).map((star, index) => {
                                                                            return (
                                                                                <i className="fas fa-star" />
                                                                            )
                                                                        })
                                                                    }
                                                                    {
                                                                        Object.values(none_star).map((star, index) => {
                                                                            return (
                                                                                <i className="far fa-star" />
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                            {/*Comments--------------------------------------*/}
                                                            <div className="client-comment">
                                                                <p>{val.message}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </section>
                                </div>
                        }

                        <div className="col-12 col-md-8 py-2">
                            <hr className='w-100 border border-primary' />
                            <div className="testimonial-heading">
                                <span>Comments</span>
                                <h4>Give Reviews</h4>
                            </div>
                            <div className="card p-3 mb-0">
                                <form className="row g-3" autoComplete='off'>
                                    <div className="col-md-6 py-1">
                                        <label htmlFor="inputEmail4" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="inputEmail4" placeholder='Enter Name ...' required onChange={(e) => { setusername(e.target.value) }} value={username} />
                                    </div>
                                    <div className="col-md-6 py-1">
                                        <label htmlFor="inputPassword4" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="inputPassword4" placeholder='Enter Email ...' required onChange={(e) => { setemail(e.target.value) }} value={email} />
                                    </div>
                                    <div className="col-12 py-1 text-center">
                                        <label htmlFor="inputAddress" className="form-label">Rating</label>
                                        <div className='d-flex justify-content-center'>
                                            <div className="rating" style={{ width: "fit-content" }}>
                                                <i className='fa fa-star' id='1' onClick={Reviews}></i>
                                                <i className='fa fa-star' id='2' onClick={Reviews}></i>
                                                <i className='fa fa-star' id='3' onClick={Reviews}></i>
                                                <i className='fa fa-star' id='4' onClick={Reviews}></i>
                                                <i className='fa fa-star' id='5' onClick={Reviews}></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 py-1">
                                        <label htmlFor="inputAddress" className="form-label">Message</label>
                                        <textarea type="text" className="form-control" id="inputAddress" placeholder="Message ..." rows={5} required onChange={(e) => { setmessage(e.target.value) }} value={message} />
                                    </div>
                                    <div className="col-12 pt-4 pb-2 text-center">
                                        <button type="submit" className="col-6 col-md-3 btn btn-primary" onClick={formSubmit}>SUBMIT</button>
                                    </div>
                                </form>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <FooterUser />
        </div>
    )
}

export default SingleBlogUser