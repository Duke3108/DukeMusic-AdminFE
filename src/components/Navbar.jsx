import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/apiRequest"
import { useNavigate } from "react-router-dom"
import { createAxios } from "../createInstance"
import { logoutSuccess } from "../redux/authSlice"

const Navbar = () => {

  const user = useSelector((state) => state.auth.login.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let axiosJWT = createAxios(user,dispatch,logoutSuccess)

  const handleLogout = () => {
    logout(dispatch,user?._id,navigate,user?.accessToken,axiosJWT)
  }
  return (
    <div className='flex text-white justify-between navbar w-full border-b-2 border-gray-50 px-5 sm:px-12 py-4 text-lg'>
        <p >{user?.username}</p>
        <p className="cursor-pointer" onClick={handleLogout}>LOG OUT</p>
    </div>
  )
}

export default Navbar