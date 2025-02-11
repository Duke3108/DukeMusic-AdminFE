/* eslint-disable react-hooks/rules-of-hooks */

import { assets } from "../assets/assets"
import axios from 'axios'
import { url } from "../App"
import { toast } from "react-toastify"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const addAlbum = () => {

  const [image,setImage] = useState(false)
  const [name,setName] = useState("")
  const [release,setRelease] = useState("")
  const [colour,setColour] = useState("#ffffff")
  const [loading,setLoading] = useState(false)
  const [artistName,setArtistName] = useState("")
  const [artistData,setArtistData] = useState([])
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name',name)
      formData.append('releaseYear',release)
      formData.append('image',image)
      formData.append('bgColour',colour)

      const artist = await axios.get(`${url}/api/artist/${artistName}`)
      
      if(artist){
        formData.append('artistId',artist.data.artists._id)
      }else{
        formData.append('artistId',"")
      }
      
      const response = await axios.post(`${url}/api/album/add`,formData)

      if(response.data.album){
        toast.success(response.data.message)
        setName("")
        setRelease("")
        setImage(false)
        setArtistName("")
        setColour("#ffffff")
        navigate('/album/')
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(`${error} occured`)
    }
    setLoading(false)
  }

  const loadArtistData = async () => {
    try {
      const response = await axios.get(`${url}/api/artist/`)
      if(response.data.success){
        setArtistData(response.data.artists)
      }else{
        toast.error("Không thể tải dữ liệu Nghệ sĩ")
      }
    } catch (error) {
      toast.error(`${error} occured`)
    }
  }
  useEffect(() => {
    loadArtistData()
  },[])

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
    <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-white rounded-full animate-spin"></div>
  </div>
  ):(
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-8 text-white">
      
      <div className="flex flex-col gap-4">
          <p>Thumbnail Album</p>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden/>
          <label htmlFor="image">
            <img src={ image ? URL.createObjectURL(image) : assets.upload_area} className="w-24 cursor-pointer"/>
          </label>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Tên album</p>
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="--Tên Album--" required className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px] rounded-md"/>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Nghệ sĩ</p>
        <select onChange={(e) => setArtistName(e.target.value)} className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px] rounded-md">
          <option className="text-black" disabled selected value>
            --Tên nghệ sĩ--
          </option>
          <option className="text-black" value="">None</option>
          {artistData.map((item,index) => (
            <option className="text-black" key={index} value={item.name}>{item.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Năm phát hành</p>
        <select 
          onChange={(e) => setRelease(e.target.value)} 

          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px] rounded-md" 
          aria-invalid="false"
        >
          <option className="text-black" disabled selected value>
            --Năm phát hành--
          </option>
          {Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (_, i) => 2020 + i).map((year) => (
            <option className="text-black" key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3">
        <p>Màu nền</p>
        <input onChange={(e) => setColour(e.target.value)} value={colour} type="color"/>
      </div>

      <button type="submit" className="text-base text-black bg-white py-2.5 px-14 cursor-pointer rounded-md w-[150px]">Thêm Album</button>

    </form>
  )
}

export default addAlbum