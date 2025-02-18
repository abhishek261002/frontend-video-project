import React, { useEffect, useRef, useState } from "react";
import cloudinary from "cloudinary-video-player";

import { useSelector , useDispatch} from "react-redux";
import "cloudinary-video-player/cld-video-player.min.css";
import Container from "../../container/Container";
import videoservice from "../../services/video.service";
import likeservice from "@/services/like.service";
import { useParams, Link , } from "react-router-dom";
import { Button, Input , SubscribeBtn } from "../index.js";
import Comments from "../../pages/Comments.jsx";
import { ThumbsUp,ArrowDownToLine  } from 'lucide-react';
import { toggleVideoLike } from "@/store/authSlice";

function Videoplayer() {
  const { videoId } = useParams();
  const videoRef = useRef(null);
  const cloudinaryRef = useRef();
  const [video, setVideo] = useState("");
  const dispatch = useDispatch()
  // const [comments , setComments ] = useState([])
  const likeVideoFromId= async()=>{
    const likeVideo = await likeservice.toggleVideoLike(video?._id);
    if(likeVideo){
      toggleVideoLike()
      alert(likeVideo?.data?.message );
      dispatch(toggleVideoLike(video?._id))
    }
  }
  const cloudinaryDownloadUrl = video?.videoFile?.replace('/upload/', '/upload/fl_attachment/');

  const likedVideos = useSelector((state)=>(state.auth.likedVideos))
  const isAlreadyLiked = likedVideos.includes(videoId) ? true : false
  console.log(isAlreadyLiked);

  useEffect(() => {
    const sourceUrl = async () => {
      if (cloudinaryRef.current) return;
      cloudinaryRef.current = window.cloudinary;
      const player = cloudinaryRef.current.videoPlayer(videoRef.current, {
        cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        controls: true,
        width: 400,
        height: 300,
      });
      try {
        const video = await videoservice.streamVideo(videoId);
        if (video) {
          const videoDetails = await video;
          if (videoDetails) {
            setVideo(videoDetails);
          }
          const source = await video.videoPublicIdForCloudinary;
          if (source) {
            player.source(source);
          }
        }
      } catch (error) {
        console.log("ERROR IN GETTING  SOURCE URL :: ", error?.message);
      }
    };
    sourceUrl();
  }, []);

  return (
    <div className=" flex justify-center ">
      <Container>
        <div className="w-full  bg-gray-500 p-4">
          {/* videoplayer */}
          <div className="w-full lg:w-3/4  mx-auto rounded-3xl p-2">
          <div className="">
          <video
              ref={videoRef}
              className="cld-video-player cld-fluid rounded-3xl "
            ></video>
          </div>
           <div className=" w-full sm:mt-4 text-white flex flex-wrap bg-opacity-5 bg-[url('../.././public/shade-9330020_1280.png')] backdrop-blur-3xl rounded-3xl">
           <h1 className="text-2xl font-semibold my-4 mx-4 text-white font-serif text-start">
              title - {video?.title}
            </h1>
            <div className="w-full px-4 flex justify-between">
              <div className="sm:w-1/2 w-full flex sm:gap-5 ">
                <Link to={`/users/c/${video?.owner?.username}`}>
                <img
                  src={video?.owner?.avatar}
                  alt={video?.owner?.username}
                  className="rounded-3xl sm:h-10 h-10"
                />
                </Link>
                <div className="flex flex-col">
                  <h6 className="text-sm font-semibold font-mono">
                    {video?.owner?.fullName}
                  </h6>
                  <h6 className="text-xs font-extralight">
                    {video?.owner?.subscribersCount} subscribers
                  </h6>
                </div>
                <SubscribeBtn channelId={video?.owner?._id} />
              </div>
              <div className="   flex flex-wrap justify-end sm:gap-4 gap-1">
                <Button bgColor="bg-gray-700" className="hover:bg-black flex gap-2"
                onClick={likeVideoFromId}
                >
                 {isAlreadyLiked ?          
                 <>
                 <ThumbsUp/>
                 {video?.totalLikesOnVideo} likes
                 </>  : 
                 <> 
                 <ThumbsUp color="" fillOpacity={90} fill="#2246d8"/>
                 {video?.totalLikesOnVideo} likes</>
                 }
                </Button>
               
                <Button
                  textColor="text-gray-800"
                  className="bg-gray-300 hover:bg-gray-400 font-bold px-1 py-1 text-sm"
                >
                  <a href={cloudinaryDownloadUrl} className="flex gap-1" download><ArrowDownToLine size={20}/>Download</a>
                </Button>
              </div>
            </div>
            <div className="w-full p-4 flex flex-col gap-2">
              <div className="flex gap-4">
                <h6 className="text-sm font-semibold font-mono">
                  {video?.views} views
                </h6>
                <h6 className="text-sm font-semibold font-mono">
                  createdAt : {video?.createdAt?.split("T")[0]}{" "}
                </h6>
              </div>
              <h6 className="text-sm  font-mono">
                Description - {video?.description}
              </h6>
            </div>
            </div> 
           
          </div>
          <Comments />
        </div>
      </Container>
    </div>
  );
}

export default Videoplayer;
