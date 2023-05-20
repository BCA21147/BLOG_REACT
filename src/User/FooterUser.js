import React, { useEffect, useState } from 'react'
import './UserFooter.css'
import axios from 'axios';
const FooterUser = () => {

    const [header_data, setheader_data] = useState([]);
    const [footer_data, setfooter_data] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/get_all_blog')
            .then((res) => { console.log(res.data.data); setfooter_data(res.data.data) })
            .catch((err) => { console.log("Data Not Found."); })
        axios.get('http://localhost:5000/get_all_catagory')
            .then((res) => { console.log(res.data.data); setheader_data(res.data.data) })
            .catch((err) => { console.log("Data Not Found."); })
    }, [])

    return (
        <div>
            {/* Footer */}
            <footer className="text-center text-white" style={{ background: "#218deb" }}>
                {/* Grid container */}
                <div className="container p-4">
                    {/* Section: Social media */}
                    <section className="mb-4">
                        {/* Facebook */}
                        <a className="btn btn-outline-dark btn-floating m-1" href="#" role="button"><i className="fab fa-facebook-f" /></a>
                        {/* Twitter */}
                        <a className="btn btn-outline-dark btn-floating m-1" href="#" role="button"><i className="fab fa-twitter" /></a>
                        {/* Google */}
                        <a className="btn btn-outline-dark btn-floating m-1" href="#" role="button"><i className="fab fa-google" /></a>
                        {/* Instagram */}
                        <a className="btn btn-outline-dark btn-floating m-1" href="#" role="button"><i className="fab fa-instagram" /></a>
                        {/* Linkedin */}
                        <a className="btn btn-outline-dark btn-floating m-1" href="#" role="button"><i className="fab fa-linkedin-in" /></a>
                        {/* Github */}
                        <a className="btn btn-outline-dark btn-floating m-1" href="#" role="button"><i className="fab fa-github" /></a>
                    </section>
                    {/* Section: Social media */}
                    {/* Section: Form */}
                    <section className="">
                        <form onSubmit={(e) => { e.preventDefault(); document.getElementById('form5Example21').value = "" }}>
                            {/*Grid row*/}
                            <div className="row d-flex justify-content-center">
                                {/*Grid column*/}
                                <div className="col-auto">
                                    <p className="pt-2">
                                        <strong className='text-dark'>Sign up for our newsletter</strong>
                                    </p>
                                </div>
                                {/*Grid column*/}
                                {/*Grid column*/}
                                <div className="col-md-5 col-12">
                                    {/* Email input */}
                                    <div className="form-outline form-white mb-4">
                                        <input type="email" id="form5Example21" className="form-control" required placeholder='Email address ...' />
                                        {/* <label className="form-label" htmlFor="form5Example21">Email address</label> */}
                                    </div>
                                </div>
                                {/*Grid column*/}
                                {/*Grid column*/}
                                <div className="col-auto">
                                    {/* Submit button */}
                                    <button type="submit" className="btn btn-outline-dark mb-4" style={{ fontWeight: "600" }}>
                                        Subscribe
                                    </button>
                                </div>
                                {/*Grid column*/}
                            </div>
                            {/*Grid row*/}
                        </form>
                    </section>
                    {/* Section: Form */}
                    {/* Section: Links */}
                    <section>
                        {/*Grid row*/}
                        <div className="user_footer row" style={{ gap: "10px 0px" }}>

                            {
                                header_data.map((val, i) => {
                                    var a = 0;
                                    return (
                                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0" key={i}>
                                            <h5 className="text-uppercase"><a href={`/Single_Catagory/${val._id}`} className='text-dark'>{val.catagory}</a> </h5>
                                            <ul className="list-unstyled mb-4 mb-sm-1">
                                                {
                                                    footer_data.map((innerval, j) => {
                                                        if(val.catagory == innerval.blog_catagory)
                                                        {
                                                            a++;
                                                        }
                                                        return (
                                                            <>
                                                                {
                                                                    val.catagory == innerval.blog_catagory && a<=3
                                                                        ?
                                                                        <li>
                                                                            <a href={`/Single_Blog/${innerval._id}`} className="text-white">{innerval.blog_title}</a>
                                                                        </li>
                                                                        :
                                                                        // console.log("Blog Not Found..!")
                                                                        console.log()
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        {/*Grid row*/}
                    </section>
                    {/* Section: Links */}
                </div>
                {/* Grid container */}
                {/* Copyright */}
                <div className="user_footer text-center p-3" style={{ backgroundColor: '#0074D9' }}>
                    © {new Date().getFullYear()} Copyright :
                    <a className="text-white" href="/"> Blog.com</a>
                </div>
                {/* Copyright */}
            </footer>
            {/* Footer */}
        </div>
    )
}

export default FooterUser