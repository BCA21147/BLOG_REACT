import Carousel from 'react-bootstrap/Carousel';
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Slid() {

    const [silder_data, setsilder_data] = useState([]);

    useEffect(() => {
        axios.get('https://cute-gray-ant-suit.cyclic.app/get_all_catagory')
            .then((res) => { console.log(res.data.data); setsilder_data(res.data.data) })
            .catch((err) => { console.log("Data Not Found."); })
    }, [])

    return (
        <>

            {/* <div className="owl-carousel owl-theme">
                <div className="item"><img src="https://avatars.mds.yandex.net/i?id=b96ed85dad2cbbe66739df9d8c50dcd1933eab4f-9181674-images-thumbs&n=13" alt /></div>
                <div className="item"><img src="https://4kwallpapers.com/images/wallpapers/jokuls-rl-n-glacier-lagoon-iceland-ice-bergs-mountains-5760x3788-1599.jpg" alt /></div>
                <div className="item"><img src="https://avatars.mds.yandex.net/i?id=ddd01b9961d67d5cda50381f3ecf0bd1-4219907-images-thumbs&n=13" alt /></div>
                <div className="item"><img src="https://avatars.mds.yandex.net/i?id=7e625ddc072444ed1f8d102411d4e74e321022b5-8608462-images-thumbs&n=13" alt /></div>
                <div className="item"><img src="https://avatars.mds.yandex.net/i?id=b82987a76a862b9f451608cb31e669d619342d63-4345430-images-thumbs&n=13" alt /></div>
            </div> */}

            {/* <Carousel className='text-primary'>
                <Carousel.Item interval={1000} pause="false">
                    <img
                        className="d-block w-100"
                        src="https://4kwallpapers.com/images/wallpapers/jokuls-rl-n-glacier-lagoon-iceland-ice-bergs-mountains-5760x3788-1599.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1000} pause="false">
                    <img
                        className="d-block w-100"
                        src="https://4kwallpapers.com/images/wallpapers/jokuls-rl-n-glacier-lagoon-iceland-ice-bergs-mountains-5760x3788-1599.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="https://4kwallpapers.com/images/wallpapers/jokuls-rl-n-glacier-lagoon-iceland-ice-bergs-mountains-5760x3788-1599.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel> */}


            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    {
                        silder_data.map((val, i) => {
                            return (
                                <>
                                    <li data-target="#carouselExampleIndicators" data-slide-to={i} className={(i == 0) ? "active" : ""} />
                                </>
                            )
                        })
                    }
                </ol>
                <div className="carousel-inner">
                    {
                        silder_data.map((val, i) => {
                            return (
                                <>
                                    <div className={(i == 0) ? "carousel-item active" : "carousel-item"} data-interval="2500">
                                        <a href={`/Single_Catagory/${val._id}`}>
                                            <img className="d-block w-100" src={val.image} alt={val.image} />
                                        </a>
                                        {/* <div class="carousel-caption d-none d-md-block">
                                            <h1 className="text-primary">{val.catagory}</h1>
                                        </div> */}
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                </a>
            </div>

        </>
    );
}

export default Slid;
