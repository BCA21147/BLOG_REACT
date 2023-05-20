import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import HeaderAdmin from './HeaderAdmin';
import FooterAdmin from './FooterAdmin';

const EditCatagory = () => {

    const { id } = useParams();

    var nav = useNavigate();

    const [catagory, setcatagory] = useState('');
    const [image, setimage] = useState('');
    const [Imagefile, setfile] = useState('');
    const [Imagepath, setpath] = useState('');

    useEffect(() => {
        axios.get(`https://cute-gray-ant-suit.cyclic.app/admin/get_single_catagory/${id}`, {
            headers: {
                Authorization: document.cookie.split('=')[1]
            }
        })
            .then((res) => {
                setcatagory(res.data.data.catagory); setimage(res.data.data.image);
                document.getElementById('text').value = res.data.data.image;
                document.getElementById('file').disabled = true;
                if (res.data.data = [] && res.data.Token == 'Expire') {
                    nav('/admin');
                }
            })
    }, [])

    const handleImages = (e) => {
        var text = document.getElementById('text');
        var file = document.getElementById('file');

        if (text.value == '') {
            file.disabled = false;
            setimage('');
        }
        else {
            file.disabled = true;
            setimage(e.target.value);
        }
        if (file.files.length == 0) {
            text.disabled = false;
            setpath('');
        }
        else {
            text.disabled = true;
            setfile(e.target.files[0]);

            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                setpath(reader.result);
            }
        }

        if (file.disabled) {
            setimage(e.target.value);
        }
        else {
            setfile(e.target.files[0]);
        }

    }

    const handleInput = (e) => {
        if (e.target.name == "catagory") { setcatagory(e.target.value); }
        // if (e.target.name == "image") { setimage(e.target.value); }
    }

    const submitData = (e) => {
        e.preventDefault();
        axios.post(`https://cute-gray-ant-suit.cyclic.app/admin/update_catagory/${id}`, {
            catagory: catagory,
            image: image,
            Imagefile
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: document.cookie.split('=')[1]
            }
        })
            .then((res) => {
                if (res.data.data = [] && res.data.Token == 'Expire') {
                    nav('/admin');
                }
                alert("CATAGORY - EDIT Successfully."); setcatagory(''); setimage('');
            })
            .catch((err) => { console.log(err); });
        nav('/admin/view_catagory');
    }

    return (
        <div>
            <div className='hold-transition sidebar-mini'>
                <div class="wrapper">
                    <HeaderAdmin active={'edit_catagory'} />
                    <div className="content-wrapper d-flex justify-content-center flex-column">

                        <div className="row m-0 p-5 d-flex justify-content-center">
                            <div className="col-md-7">
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title w-100 text-center">EDIT CATAGORY Example</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={submitData} autoComplete='off'>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Catagory Name</label>
                                                <input type="text" value={catagory} name='catagory' onChange={handleInput} required className="form-control" id="exampleInputEmail1" placeholder="Enter Name" />
                                            </div>
                                            <div className="row">
                                                <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                                                    <label><div>Image</div></label>
                                                    <img src={(image == '') ? Imagepath : image} alt="No Image Found..!" className='w-100' srcset="" />
                                                </div>
                                                <div className="col-8">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Image URL</label>
                                                        <input type="text" id='text' name='image' onChange={handleImages} required className="form-control" placeholder="Enter URL" />
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-5"><hr /></div>
                                                        <div className="col-2 text-center">Or</div>
                                                        <div className="col-5"><hr /></div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="file" class="js-labelFile">
                                                            <i class="icon"></i>
                                                            <span class="js-fileName">Choose a file</span>
                                                        </label>
                                                        <input type="file" name="file" id="file" class="input-file" onChange={handleImages} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer d-flex justify-content-center">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                    <FooterAdmin />
                </div>
            </div>
        </div>
    )
}

export default EditCatagory