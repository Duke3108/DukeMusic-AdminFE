import { useEffect } from "react"
import { deleteUser, getAllUsers } from "../redux/apiRequest"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { loginSuccess } from "../redux/authSlice"
import { createAxios } from "../createInstance"

const ListUser = () => {

  const user = useSelector((state) => state.auth.login.currentUser)
  const userList = useSelector((state) => state.user.users?.allUsers)
  const msg = useSelector((state) => state.user?.msg)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let axiosJWT = createAxios(user,dispatch,loginSuccess)

  const handleDelete = (id) => {
    deleteUser(user?.accessToken,dispatch,id,axiosJWT)
    if(user?.admin){
      toast.success(msg)
    }else{
      toast.error(msg)
    }
  }

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
    if(user?.accessToken){
      getAllUsers(user?.accessToken, dispatch, axiosJWT)
    }
  },[])

  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-white mb-4 mr-6">
        <p>All Songs List</p>
        <p onClick={() => navigate('/user/add')} className="cursor-pointer">add</p>
      </div>

      <div>
        <div className="sm:grid hidden grid-cols-[1fr_2fr_1fr_0.5fr] items-center border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Name</b>
          <b>Email</b>
          <b>Role</b>
          <b>Action</b>
        </div>
        {userList?.map((user,index) => {
          return (
            <div key={index} className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 bg-gray-100 border border-gray-300 text-sm mr-5">
                <p>{user?.username}</p>
                <p>{user?.email}</p>
                <p>{`${user?.admin ? 'admin' : 'user'}`}</p>
                <p onClick={() => handleDelete(user._id)} className="cursor-pointer">x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListUser