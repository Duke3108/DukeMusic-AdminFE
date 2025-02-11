import { useEffect, useState } from "react"
import { assets } from "../assets/assets"
import axios from 'axios'
import { url } from "../App"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const AddSong = () => {

  const [image,setImage] = useState(false)
  const [song,setSong] = useState(false)
  const [name,setName] = useState("")
  const [artistName,setArtistName] = useState("")

  const [albumName,setAlbumName] = useState("")
  const [albumId,setAlbumId] = useState("")
  const [loading,setLoading] = useState(false)
  const [albumData,setAlbumData] = useState([])
  const [artistId,setArtistId] = useState('')
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name',name)
      formData.append('image',image)
      formData.append('audio',song)

      if(!albumId){
        formData.append('albumId',"")
      }
      formData.append('artistId',artistId)
      formData.append('albumId',albumId)
      const response = await axios.post(`${url}/api/song/add`,formData)

      if(response.data.song){
        toast.success(response.data.message)
        setName("")
        setAlbumName("none")
        setImage(false)
        setSong(false)
        navigate('/song/')
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(`${error} occured`)
    }
    setLoading(false)
  }

  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`)
      if(response.data.success){
        setAlbumData(response.data.albums)
      }else{
        toast.error("Unable to load albums data")
      }
    } catch (error) {
      toast.error(`${error} occured`)
    }
  }

  const loadArtistData = async () => {
    if(albumName ){
      if(albumName !== "None"){
        const selectedAlbum = await axios.get(`${url}/api/album/${albumName}`)
        setAlbumId(selectedAlbum.data._id)
        setArtistId(selectedAlbum.data.artistId._id)
        const name = selectedAlbum.data.artistId.name
        //console.log(selectedAlbum,name)
        setArtistName(name)
      }else{
        setArtistName("")
      }
    }
  }

  const handleSelectAlbum = (e) => {
    setAlbumName(e.target.value)
  }

  useEffect(() => {
    loadArtistData()
  },[albumName])

  useEffect(() => {
    loadAlbumData()
  },[])


  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-white rounded-full animate-spin"></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-8 text-white">

      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Audio</p>
          <input onChange={(e) => setSong(e.target.files[0])} type="file" id="song" accept="audio/*" hidden/>
          <label htmlFor="song">
            <img src={song ? assets.upload_added : assets.upload_song } className="w-24 cursor-pointer"/>
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <p>Thumbnail</p>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden/>
          <label htmlFor="image">
            <img src={ image ? URL.createObjectURL(image) : assets.upload_area} className="w-24 cursor-pointer"/>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Tên bài hát</p>
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Tên bài hát" required className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px] rounded-md"/>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <select onChange={handleSelectAlbum} value={albumName}  className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px] rounded-md">
          <option className="text-black" disabled selected value>--Album--</option>
          <option className="text-black" value="None">None</option>
          {albumData.map((item,index) => (
            <option className="text-black" key={index} value={item.name}>{item.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Nghệ sĩ</p>
        <input onChange={(e) => setArtistName(e.target.value)} value={artistName} type="text" placeholder="--Nghệ sĩ--" required className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px] rounded-md"/>
      </div>

      <button type="submit" className="text-base text-black bg-white py-2.5 px-14 cursor-pointer w-[150px]">Add</button>
    </form>
  )
}

export default AddSong