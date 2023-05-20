import React, { useEffect, useState } from 'react'
import HeaderUser from './HeaderUser'
import FooterUser from './FooterUser'
import SliderUser from './SliderUser'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import './UserIndex.css';
import axios from 'axios'

const IndexUser = () => {

  const [catagory_data, setcatagory_data] = useState([]);
  const [blog_data, setblog_data] = useState([]);
  const [search, setsearch] = useState('');

  const getData = () => {
    axios.get('http://localhost:5000/get_all_catagory')
      .then((res) => { console.log(res.data.data); setcatagory_data(res.data.data) })
      .catch((err) => { console.log("Data Not Found."); })
  }

  useEffect(() => {
    getData();
    axios.get('http://localhost:5000/get_all_blog')
      .then((res) => { console.log(res.data.data); setblog_data(res.data.data) })
      .catch((err) => { console.log("Data Not Found."); })
  }, [])

  const searchData = (e) => {
    if (e.target.value == '') {
      getData();
    }
    else {
      axios.get(`http://localhost:5000/search_catagory/${e.target.value}`)
        .then((res) => {
          setcatagory_data(res.data.data)
        })
        .catch((err) => { console.log("Data Not Found."); })
    }
  }

  return (
    <div>
      <HeaderUser />
      <SliderUser />

      <div className="user_card py-5">
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
          <div className="row pt-4 d-flex justify-content-center">
            {
              catagory_data.map((val, i) => {

                var num = 0;
                for (var j = 0; j < blog_data.length; j++) {
                  if (val.catagory == blog_data[j].blog_catagory) { num++; }
                }
                // console.log("Total = " + blog_data.length);
                // console.log(val.catagory + " = " + num);
                var rate = num * 5 / blog_data.length;
                // console.log(rate+1);
                var full_star = {};
                var none_star = {};
                for (let f = 0; f < rate; f++) {
                  full_star[f] = f
                }
                for (let f = 0; f <= 4 - rate; f++) {
                  none_star[f] = f
                }
                return (
                  <div className="col-sm-12 col-md-6 col-lg-4 p-3" key={i}>
                    <div className="card p-3 h-100">
                      <a href={`/Single_Catagory/${val._id}`}><img src={val.image} alt={val.catagory} srcset="" className='rounded' className="w-100" /></a>
                      <div className="h5 pt-3 text-center text-capitalize"><a href={`/Single_Catagory/${val._id}`} className='text-dark'>{val.catagory}</a></div>
                      <div className="h4 text-center text-warning">
                        {
                          Object.values(full_star).map((r, index) => {
                            return (
                              <AiFillStar className='mx-1' />
                            )
                          })
                        }
                        {
                          Object.values(none_star).map((r, index) => {
                            return (
                              <AiOutlineStar className='mx-1' />
                            )
                          })
                        }
                      </div>
                      <div className="text-center"><a href={`/Single_Catagory/${val._id}`}><div className="btn btn-primary">View More...</div></a></div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

      <FooterUser />
    </div>
  )
}

export default IndexUser