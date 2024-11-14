import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/apiRequest";
import { useDispatch } from 'react-redux'

const Login = () => {

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    const newUser = {
      username: username,
      password: password
    }
    loginUser(newUser, dispatch, navigate)
  }
  

  return (
    <section className="flex flex-col justify-center items-center mt-12 rounded-xl h-[400px] w-[400px] bg-[rgb(218,218,218)]">
    <div className="text-2xl font-bold"> Log in</div>
    <form onSubmit={handleLogin} className="flex flex-col mt-4 text-sm font-semibold w-[200px] ">
        <label>USERNAME</label>
        <input 
          className="p-2 m-3 rounded-s w-full" 
          type="text" 
          placeholder="Enter your username" 
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>PASSWORD</label>
        <input 
          className="p-2 m-3 rounded-s w-full" 
          type="password" 
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="cursor-pointer self-center mt-4 p-3 rounded-s text-white bg-[rgb(161,161,161)]" type="submit"> Continue </button>
    </form>
    <div className="text-base mt-8 mx-4 "> Dont have an account yet? </div>
    <Link className="cursor-pointer mt-4 text-[rgb(105,105,105)] font-bold" to="/register">Register</Link>
</section>
  )
}

export default Login