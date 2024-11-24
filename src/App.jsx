import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Routes, Route, useNavigate} from 'react-router-dom'
import AddSong from './pages/AddSong'
import AddAlbum from './pages/AddAlbum'
import ListSong from './pages/ListSong'
import ListAlbum from './pages/ListAlbum'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import ListUser from './pages/ListUser'
import AddUser from './pages/AddUser'
import ListArtist from './pages/ListArtist'
import AddArtist from './pages/AddArtist'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export const url = 'http://localhost:4000'

const App = () => {

  const user = useSelector((state) => state.auth.login?.currentUser)
  const navigate = useNavigate()

  useEffect(() => {
    if(!user){
      navigate("/login")
    }
  },[])

  return (
    <div className='flex min-h-screen'>
      
      <ToastContainer/>
      {user ? <Sidebar/> : null}
      <div className='flex-1 h-screen overflow-y-scroll bg-[#242424]'>
      {user ? <Navbar/> : null}
        <div className={`${user ? 'pt-8 pl-5 sm:pt-12 sm:pl-12' : 'flex items-center justify-center'}`}>
          {user ?
          <Routes>
            <Route path='/album/'element={<ListAlbum/>}/>
            <Route path='/album/add'element={<AddAlbum/>}/>
            <Route path='/song/' element={<ListSong/>}/> 
            <Route path='/song/add' element={<AddSong/>}/>
            <Route path='/user/' element={<ListUser/>}/> 
            <Route path='/user/add' element={<AddUser/>}/>
            <Route path='/artist/' element={<ListArtist/>}/> 
            <Route path='/artist/add' element={<AddArtist/>}/>
            <Route path='/login'element={<Login/>}/>
            <Route path='/register'element={<SignUp/>}/>
          </Routes>
          :
          <Routes>
              <Route path='/login'element={<Login/>}/>
              <Route path='/register'element={<SignUp/>}/>
          </Routes>
        }
          
            
        </div>
      </div>

    </div>
  )
}

export default App