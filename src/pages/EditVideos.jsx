import React, { useEffect, useState } from "react";
import { login as storeLogin } from "@/store/authSlice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import authservice from "@/services/auth.service";
import videoservice from "@/services/video.service";
import Container from "@/container/Container";
import { Videocard } from "@/components";
function EditVideos() {
  const [allVideos, setAllVideos] = useState([]);
  const { username } = useParams();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const isOwner =
    username && user ? username === user.userData?.username : false;
  const getCurrentUser = async () => {
    const user = await authservice.getCurrentUser();
    if (user) {
      dispatch(storeLogin(user));
      setUser(user);
    }
  };
  const fetchVideos = async () => {
    try {
      const getallVideos = await videoservice.getVideosFromChannel(username);
      if (getallVideos) {
        console.log(getallVideos.data);
        setAllVideos(getallVideos.data?.allVideos);
      }
    } catch (error) {
      console.log("ERROR IN FETCHING ALL VIDEO :: ", error?.message);
      throw error;
    }
  };
  useEffect(() => {
    fetchVideos();
    getCurrentUser();
  }, []);

  return (
    <div className="py-8">
      <Container>
        {isOwner && <div className="w-full p-4">
            {
                allVideos.map((video)=>(
                 <div key={video?._id} className='p-8 w-1/4'>
                        <div className="w-full bg-red-500">
                            
                        </div>
                    </div>
                ))
            }
            </div>}
        {!isOwner && <div>apna hai</div>}
      </Container>
    </div>
  );
}

export default EditVideos;
