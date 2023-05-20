import React, { useEffect, useState } from 'react'
import HeaderAdmin from './HeaderAdmin';
import axios from 'axios';
import FooterAdmin from './FooterAdmin';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {

    const nav = useNavigate();

    const [option, setoption] = useState([]);

    useEffect(() => {
        axios.get('https://cute-gray-ant-suit.cyclic.app/admin/get_catagory', {
            headers: {
                Authorization: document.cookie.split('=')[1]
            }
        })
            .then((res) => {
                console.log(res.data.data); setoption(res.data.data)
            })
            .catch(() => { })
    }, [])

    const [title, settitle] = useState('');
    const [image, setimage] = useState('');
    const [desc, setdesc] = useState('');
    const [catagory, setcatagory] = useState('');
    const [Imagefile, setfile] = useState('');
    const [Imagepath, setpath] = useState('');


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
        if (e.target.name == "title") { settitle(e.target.value); }
        if (e.target.name == "image") { setimage(e.target.value); }
        if (e.target.name == "desc") { setdesc(e.target.value); }
        if (e.target.name == "catagory") { setcatagory(e.target.value); }
    }
    const submitData = (e) => {
        e.preventDefault();
        axios.post('https://cute-gray-ant-suit.cyclic.app/admin/add_blog',
            {
                title: title,
                image: image,
                description: desc,
                catagory: (catagory == '') ? option[0].catagory : catagory,
                auther: localStorage.getItem('User_Data_Name'),
                Imagefile
            }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: document.cookie.split('=')[1]
            }
        }
        )
            .then((res) => {
                if (res.data.data = [] && res.data.Token == 'Expire') {
                    nav('/admin');
                }
                alert("BLOG - ADD Successfully."); settitle(''); setimage(''); setdesc(''); setcatagory(option[0].catagory);
                setimage('');
                setfile('');
                setpath('');
                document.getElementById('text').value = '';
                document.getElementById('file').value = '';
                document.getElementById('file').disabled = false;
                document.getElementById('text').disabled = false;
           })
            .catch((err) => { console.log(err); })
    }
    return (
        <div className='hold-transition sidebar-mini'>
            <div class="wrapper">
                <HeaderAdmin active={'add_blog'} />
                <div className="content-wrapper d-flex justify-content-center flex-column">

                    <div className="row m-0 p-5 d-flex justify-content-center">
                        <div className="col-md-7">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title w-100 text-center">ADD-BLOG Example</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form onSubmit={submitData} autoComplete='off'>
                                    <div className="card-body">
                                        <div class="form-group">
                                            <label>Select Catagory</label>
                                            <select class="form-control" onChange={handleInput} name='catagory' required>
                                                {
                                                    option.map((val, i) => {
                                                        return (
                                                            <>
                                                                {
                                                                    (catagory == val.catagory)
                                                                        ? <option className='text-uppercase' value={val.catagory} selected>{val.catagory}</option>
                                                                        : <option className='text-uppercase' value={val.catagory} >{val.catagory}</option>
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Title</label>
                                            <input type="text" value={title} name='title' onChange={handleInput} required className="form-control" id="exampleInputEmail1" placeholder="Enter Title" />
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
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Description</label>
                                            <input type="text" value={desc} name='desc' onChange={handleInput} required className="form-control" id="exampleInputEmail1" placeholder="Enter Description" />
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
    )
}

export default AddBlog