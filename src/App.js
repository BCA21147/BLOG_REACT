import './App.css';
import './ScrollBar_User_Admin.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import IndexAdmin from './Admin/IndexAdmin';
import AddAdmin from './Admin/AddAdmin';
import ViewAdmin from './Admin/ViewAdmin';
import AddCatagory from './Admin/AddCatagory';
import ViewCatagory from './Admin/ViewCatagory';
import AddBlog from './Admin/AddBlog';
import ViewBlog from './Admin/ViewBlog';
import ViewComment from './Admin/ViewComment';
import EditAdmin from './Admin/EditAdmin';
import EditCatagory from './Admin/EditCatagory';
import EditBlog from './Admin/EditBlog';
import IndexUser from './User/IndexUser';
import SingleCatagoryUser from './User/SingleCatagoryUser';
import SingleBlogUser from './User/SingleBlogUser';
import LoginAdmin from './Admin/LoginAdmin';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMinutes_Value } from './Counter/CounterSlice';
import { setSecond_Value } from './Counter/CounterSlice_1';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const interval = setInterval(() => {

      if (localStorage.getItem('Second') == 0 && localStorage.getItem('Minites') > 0) {
        localStorage.setItem('Second', 59);
        localStorage.setItem('Minites', localStorage.getItem('Minites') - 1);
      }
      if (localStorage.getItem('Minites') >= 0 && localStorage.getItem('Second') > 0) {
        localStorage.setItem('Second', localStorage.getItem('Second') - 1);
      }

      dispatch(setMinutes_Value());
      dispatch(setSecond_Value());

    }, 1000)
    return () => clearInterval(interval);
  }, [])

  const nav = useNavigate();

  const VerifyToken = () => {
    axios.get('http://localhost:5000/admin/get_admin', {
      headers: {
        // Authorization:sessionStorage.getItem('Token')
        Authorization: document.cookie.split('=')[1]
      }
    })
      .then((res) => {
        if (res.data.data = [] && res.data.Token == 'Expire') {
          nav('/admin');
        }
      })
      .catch(() => { })
  }

  return (
    <>

      <Routes>
        <Route path='*' element={<IndexUser />}></Route>
        <Route path='/' element={<IndexUser />}></Route>
        <Route path='/single_catagory/:catagory' element={<SingleCatagoryUser />}></Route>
        <Route path='/single_blog/:blog' element={<SingleBlogUser />}></Route>
        <Route path='/single_blog/next_page/:blog' element={<SingleBlogUser />}></Route>
        <Route path='/single_blog/prev_page/:blog' element={<SingleBlogUser />}></Route>


        <Route path='/admin' element={<LoginAdmin />}></Route>


        {/* <Route path='/admin/index' element={<IndexAdmin />}></Route> */}
        <Route path='/admin/index' element={<><VerifyToken /><IndexAdmin /></>}></Route>
        <Route path='/admin/add_admin' element={<><VerifyToken /><AddAdmin /></>}></Route>
        <Route path='/admin/view_admin' element={<><VerifyToken /><ViewAdmin /></>}></Route>
        <Route path='/admin/edit_admin/:id' element={<><VerifyToken /><EditAdmin /></>}></Route>
        <Route path='/admin/add_catagory' element={<><VerifyToken /><AddCatagory /></>}></Route>
        <Route path='/admin/view_catagory' element={<><VerifyToken /><ViewCatagory /></>}></Route>
        <Route path='/admin/edit_catagory/:id' element={<><VerifyToken /><EditCatagory /></>}></Route>
        <Route path='/admin/add_blog' element={<><VerifyToken /><AddBlog /></>}></Route>
        <Route path='/admin/view_blog' element={<><VerifyToken /><ViewBlog /></>}></Route>
        <Route path='/admin/edit_blog/:id' element={<><VerifyToken /><EditBlog /></>}></Route>
        <Route path='/admin/view_comment' element={<><VerifyToken /><ViewComment /></>}></Route>
      </Routes>

    </>
  );
}

export default App;
