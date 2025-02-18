import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import {login as storeLogin} from "../store/authSlice.js"
import authservice from "../services/auth.service.js";
import videoservice from "../services/video.service.js";
import Container from "../container/Container.jsx";
import { Videocard,Button } from "../components/index.js";
import { SubscribeBtn } from "../components/index.js";
function Channel() {
  const [allVideos,setAllVideos] = useState([])
  const [videosCount,setVideosCount] = useState(0)
  const [channel, setChannel] = useState();
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [refresh, setRefresh] = useState(false)
  const isAuthor = username && userData ? username === userData.username : false
  console.log(isAuthor);


const fetchVideos = async()=>{
    try {
      const getallVideos = await videoservice.getVideosFromChannel(username);
      if(getallVideos){
         console.log(getallVideos.data);
         setAllVideos(getallVideos.data?.allVideos)
         setVideosCount(getallVideos.data?.countOfVideos)
      }
    } 
    catch (error) {
     console.log("ERROR IN FETCHING ALL VIDEO :: ",error?.message);
     throw error;
    }

 }
 const fetchChannelData = async () => {
  if (username) {
    try {
      const getChannel = await authservice.getUserChannelProfile(username);
      if (getChannel?.data) {
        setChannel(getChannel?.data);
      }
    } 
    catch (error) {
      console.error("ERROR IN CHANNEL.JSX => GETCHANNEL :: ", error?.message);
    }
  } else {
    navigate("/");
  }
};
  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await authservice.getCurrentUser();
      if (user) {
        dispatch(storeLogin(user));
      }
    };
    getCurrentUser();
    fetchChannelData();
    fetchVideos();
    
  }, [refresh]);

  return channel ? (
    <div className="w-full py-8 flex flex-wrap">
      <Container className="flex flex-wrap">
        <div className="w-full py-4 lg:px-0 px-4">
        <img
            src={channel?.coverImage || "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Random-image.jpg/1200px-Random-image.jpg?20160526100125"}
            alt={channel?.username}
            className="rounded-3xl lg:h-full h-full sm:max-h-20  sm:w-full "
          />
        </div>

        <div className="w-full flex flex-wrap gap-10 justify-start  m-4 relative  rounded-xl p-8">
          <img
            src={channel?.avatar}
            alt={channel?.username} 
            className="rounded-full sm:w-52 sm:h-52 w-20 h-20 border-4 border-solid border-blue-500"
          />
        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-4xl font-semibold text-white font-mono">fullName : {channel?.fullName}</h1>
          <h1 className="text-xl font-semibold text-white">username @{channel?.username}</h1>
          <h6 className="text-sm font-bold text-white">Subscribers : {channel?.subscribersCount}</h6>
          <h6 className="text-sm font-bold text-white">channelsSubscribedToCount : { channel?.channelsSubscribedToCount}</h6>
          <h3 className="text-sm font-bold text-white" >No. of videos : {videosCount}</h3>
          {isAuthor && 
          <div className="flex gap-4 py-2">
        <Link to={`/c/${channel?.username}/edit-profile`}><Button>Customize Channel</Button></Link>
        <Link to={`/c/${channel?.username}/edit-videos`}><Button>Manage Videos</Button></Link>
          </div>
  
          }
         {!isAuthor && <SubscribeBtn channelId={channel?._id}/>}
        </div>
         
          {/* {isAuthor && (
            <div className="absolute right-6 top-6">
              APNA CHANNEL HAI
            </div>
          )} */}
        </div>

        <div className="w-full mb-6">
            {
              allVideos.length===0?   
              (<div className="w-full py-8 mt-4 text-center">
                  <Container>
                      <div className="flex flex-wrap">
                      <div className="p-8 w-full">
                      <h1 className="text-4xl font-bold text-gray-500 tracking-widest">
                          No video available.........
                      </h1>
                      </div>
                      </div>
                  </Container>
              </div>)  :
              (<div className='w-full py-1 '>
                  <Container className="flex flex-wrap">
                      <div className='w-full flex flex-wrap bg-gray-700' > 
                          {allVideos && allVideos.map((video)=>(
                              <div key={video._id} className='p-8 lg:w-1/4 sm:w-1/2 flex flex-wra'>
                              <Videocard {...video} setRefresh={setRefresh} />
                          </div>
                          )    
                      )}
                      </div>
                  </Container>
              </div>
            )
            }
          
        </div>
        
      </Container>
    </div>
  ) : null;
}

export default Channel;
