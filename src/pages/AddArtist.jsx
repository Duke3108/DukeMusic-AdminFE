import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddArtist = () => {
  const [bg, setBg] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("avatar", avatar); 
      formData.append("bg", bg);

      const response = await axios.post(`${url}/api/artist/add`, formData);

      if (response.data.newArtist) {
        toast.success(response.data.message);
        setName("");
        setAvatar(false);
        setBg(false);

        navigate("/artist/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };
  
  const handleBgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBg(file);
    }
  };
  

  useEffect(() => {
    return () => {
      if (avatar) URL.revokeObjectURL(avatar);
      if (bg) URL.revokeObjectURL(bg);
    };
  }, [avatar, bg]);


  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-white rounded-full animate-spin"></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-8 text-white">
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Ảnh đại diện</p>
          <input
            onChange={handleAvatarChange}
            type="file"
            name="avatar"
            id="avatar"
            accept="avatar/*"
            hidden
          />
          <label htmlFor="avatar">
            <img
              src={avatar ? URL.createObjectURL(avatar) : assets.upload_area}
              className="w-24 cursor-pointer"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <p>Ảnh nền</p>
          <input
            onChange={handleBgChange}
            type="file"
            name="bg"
            id="bg"
            accept="bg/*"
            hidden
          />
          <label htmlFor="bg">
            <img
              src={bg ? URL.createObjectURL(bg) : assets.upload_area}
              className="w-24 cursor-pointer"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Tên nghệ sĩ</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Type Here"
          required
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
        />
      </div>

      <button
        type="submit"
        className="text-base text-black bg-white py-2.5 px-14 cursor-pointer w-[150px]"
      >
        Add
      </button>
    </form>
  );
};

export default AddArtist;
