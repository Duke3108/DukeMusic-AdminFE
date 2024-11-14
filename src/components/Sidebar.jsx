import { NavLink, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { FaUser } from "react-icons/fa";
import { PiUserListFill } from "react-icons/pi";

const Sidebar = () => {

    const navigate = useNavigate()
  return (
    <div className='bg-white border-r-2 border-black min-h-screen pl-[4vw]'>
        <img onClick={() => navigate('/')} src={assets.logo} className='mt-5 w-[max(10vw,100px)] hidden sm:block cursor-pointer' alt=""/>
        <img onClick={() => navigate('/')} src={assets.logo_small} className='mt-5 w-[max(5vw,40px)] mr-5 block sm:hidden cursor-pointer' alt=""/>

        <div className='flex flex-col gap-5 mt-10'>
            
            <NavLink to='song/list' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#121212] text-sm font-medium'>
                <img src={assets.song_icon} className='w-5' alt=''/>
                <p className='hidden sm:block'>List Song</p>
            </NavLink>

            <NavLink to='album/list' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#121212] text-sm font-medium'>
                <img src={assets.album_icon} className='w-5' alt=''/>
                <p className='hidden sm:block'>List Album</p>
            </NavLink>

            <NavLink to='artist/list' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#121212] text-sm font-medium'>
                <span className='w-5'><PiUserListFill size={20}/></span>
                <p className='hidden sm:block'>List Artist</p>
            </NavLink>

            <NavLink to='user/list' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#121212] text-sm font-medium'>
            <span className='w-5'><FaUser size={16}/></span>
                <p className='hidden sm:block'>List User</p>
            </NavLink>


        </div>
    </div>
  )
}

export default Sidebar