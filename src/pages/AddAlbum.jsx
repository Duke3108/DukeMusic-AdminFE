/* eslint-disable react-hooks/rules-of-hooks */

import { assets } from "../assets/assets"
import axios from 'axios'
import { url } from "../App"
import { toast } from "react-toastify"
import { useState } from "react"

const addAlbum = () => {

  const [image,setImage] = useState(false)
  const [name,setName] = useState("")
  const [desc,setDesc] = useState("")
  const [colour,setColour] = useState("#ffffff")
  const [loading,setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name',name)
      formData.append('desc',desc)
      formData.append('image',image)
      formData.append('bgColour',colour)

      const response = await axios.post(`${url}/api/album/add`,formData)

      if(response.data.success){
        toast.success("Album added")
        setName("")
        setDesc("")
        setImage(false)
        setColour("#ffffff")
      }else{
        toast.error("Something went wrong")
      }
    } catch (error) {
      toast.error(`${error} occured`)
    }
    setLoading(false)
  }

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
    <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-white rounded-full animate-spin"></div>
  </div>
  ):(
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-8 text-white">
      
      <div className="flex flex-col gap-4">
          <p>Upload Imgae</p>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden/>
          <label htmlFor="image">
            <img src={ image ? URL.createObjectURL(image) : assets.upload_area} className="w-24 cursor-pointer"/>
          </label>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Type Here" required className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"/>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song description</p>
        <input onChange={(e) => setDesc(e.target.value)} value={desc} type="text" placeholder="Type Here" required className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"/>
      </div>

      <div className="flex flex-col gap-3">
        <p>Background Colour</p>
        <input onChange={(e) => setColour(e.target.value)} value={colour} type="color"/>
      </div>

      <button type="submit" className="text-base text-black bg-white py-2.5 px-14 cursor-pointer w-[150px]">Add</button>

    </form>
  )
}

export default addAlbum