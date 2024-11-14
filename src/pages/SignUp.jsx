import { useState } from "react"
import { registerUser } from "../redux/apiRequest"
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"

const SignUp = () => {

  const [email,setEmail] = useState("")
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    const newUser = {
      email: email,
      password: password,
      username: username
    }
    registerUser(newUser,dispatch,navigate)
  }

  return (
    <section className="flex flex-col justify-center items-center mt-12 rounded-xl h-[400px] min-w-[20%] bg-[rgb(218,218,218)]">
            <div className="font-bold text-2xl"> Sign up </div>
            <form onSubmit={handleRegister} className="flex flex-col mt-4 text-sm font-semibold w-[200px] ">
                <label>EMAIL</label>
                <input onChange={(e) => setEmail(e.target.value)} className="p-2 m-3 rounded-s w-full"  type="text" placeholder="Enter your email" />
                <label>USERNAME</label>
                <input onChange={(e) => setUsername(e.target.value)} className="p-2 m-3 rounded-s w-full"  type="text" placeholder="Enter your username" />
                <label>PASSWORD</label>
                <input onChange={(e) => setPassword(e.target.value)} className="p-2 m-3 rounded-s w-full"  type="password" placeholder="Enter your password" />
                <button className="cursor-pointer self-center mt-4 p-3 rounded-s text-white bg-[rgb(161,161,161)]" type="submit"> Create account </button>
            </form>
        </section>
  )
}

export default SignUp