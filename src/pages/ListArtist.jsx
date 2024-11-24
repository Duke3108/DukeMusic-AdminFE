import { useEffect, useState } from "react"
import axios from 'axios'
import { url } from "../App"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const ListArtist = () => {

  const navigate = useNavigate()
  const [data, setData] = useState([])

  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${url}/api/artist/`)
      if(response.data.success){
        setData(response.data.artists)
      }
    } catch (error) {
      toast.error(error)
    }
  }

  /*const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove`,{id})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchArtists()
      }
    } catch (error) {
      toast.error(`${error} occured`)
    }
  }*/

  useEffect(() => {
    fetchArtists()
  },[])

  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-white mb-4 mr-6">
        <p>Danh sách Nghệ sĩ</p>
        <p onClick={() => navigate('/artist/add')} className="cursor-pointer">add</p>
      </div>
      
      
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_1fr_0.5fr] items-center border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>

          <b></b>
          <b>Action</b>
        </div>
        {data.map((item,index) => {
          return (
            <div key={index} className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_1fr_0.5fr] items-center gap-2.5 p-3 bg-gray-100 border border-gray-300 text-sm mr-5">
                <img className="w-12" src={item.avatar} alt="avatar"/>
                <p>{item.name}</p>

                <p></p>
                <p  className="cursor-pointer">x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListArtist