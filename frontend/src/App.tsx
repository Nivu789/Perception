import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import Publish from './pages/Publish'
import ProtectedRoute from './components/ProtectedRoute'
import EditBlog from './pages/EditBlog'


function App() {
  
  return (
    <>
    <Routes>
      <Route path='/' element={<Outlet/>}></Route>
        <Route index element={<Signin/>}></Route>
        <Route element={<ProtectedRoute/>}>
            <Route path='/blog/:id' element={<Blog/>}></Route>
            <Route path='/blogs' element={<Blogs/>}></Route>
            <Route path='/publish' element={<Publish/>}></Route>
            <Route path='/blog/edit/:id' element={<EditBlog/>}></Route>
        </Route>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      
      <Route path='*' element={<div>Nott found</div>}></Route>
    </Routes>

    </>
  )
}

export default App
