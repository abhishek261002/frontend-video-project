import React, { useEffect, useRef, useState } from "react";
import cloudinary from "cloudinary-video-player";
import { Skeleton } from "@/components/ui/skeleton"
import OpenAI from "openai";
import Summary from "./Summary";
import { useSelector, useDispatch } from "react-redux";
import "cloudinary-video-player/cld-video-player.min.css";
import Container from "../../container/Container";
import videoservice from "../../services/video.service";
import likeservice from "@/services/like.service";
import { useParams, Link } from "react-router-dom";
import { Button, Input, SubscribeBtn } from "../index.js";
import Comments from "../../pages/Comments.jsx";
import { ThumbsUp, ArrowDownToLine } from "lucide-react";
import { toggleVideoLike } from "@/store/authSlice";

function Videoplayer() {
  const { videoId } = useParams();
  const videoRef = useRef(null);
  const cloudinaryRef = useRef();
  const [video, setVideo] = useState({});
  const [summary, setSummary] = useState("");
  const [summaryVisible, setSummaryVisible] = useState(false);
  const dispatch = useDispatch();
  // const [comments , setComments ] = useState([])
  const likeVideoFromId = async () => {
    const likeVideo = await likeservice.toggleVideoLike(video?._id);
    if (likeVideo) {
      toggleVideoLike();
      alert(likeVideo?.data?.message);
      dispatch(toggleVideoLike(video?._id));
    }
  };
  const cloudinaryDownloadUrl = video?.videoFile?.replace(
    "/upload/",
    "/upload/fl_attachment/"
  );
  const likedVideos = useSelector((state) => state.auth.likedVideos);
  const isAlreadyLiked = likedVideos.includes(videoId) ? true : false;
  const loadSummary = async()=> {
      const videoRes = await videoservice.streamVideo(videoId);
        if (!videoRes) return;
        setVideo(videoRes);
      
      const transcriptUrl = videoRes?.videoFile?.replace("video", "raw").replace("mp4", "transcript");
      //const summary = await videoservice.getVideoSummary(transcriptUrl)
      const transcriptText = await fetch(transcriptUrl).then((res) => res.text());
      
      //console.log(transcriptText);
      const summary = await videoservice.getVideoSummary(transcriptText? transcriptText : "");
      
      setSummary(summary?.data);
      
    }
  useEffect(() => {
    
    const loadVideo = async () => {
      try {
        // fetch video details from backend
        const videoRes = await videoservice.streamVideo(videoId);
        if (!videoRes) return;
        setVideo(videoRes);
        
        // Initialize Cloudinary player
        if (!cloudinaryRef.current) {
          cloudinaryRef.current = window.cloudinary;
        }
        //http://res.cloudinary.com/dj6qarh3j/video/upload/v1762109360/lslqujijidxqp3av5a7s.mp4
        //https://res.cloudinary.com/dj6qarh3j/raw/upload/v1762109363/lslqujijidxqp3av5a7s.transcript

        const player = cloudinaryRef.current.videoPlayer(videoRef.current, {
          cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
          controls: true,
          showJumpControls: true,
          showQualitySelector: true,
          qualitySelector: {
            default: "auto", // can also be '1080p', '720p', etc.
            display: "always", // show the button even with one source
          },
          sourceTypes: ["hls"], // or ['hls', 'dash', 'mp4']
          fluid: true,
          muted: false,
          autoplay: false,
          preload: "auto",
        });

        // Set the video source AFTER video details are available
        player.source(videoRes.videoPublicIdForCloudinary, {
          textTracks: {
            captions: {
              label: "English (Auto)",
              default: true,
            },
            // optional customization
            options: {
              theme: "videojs-default",
              fontFace: "Palatino",
              fontSize: "90%",
              gravity: "bottom",
              wordHighlightStyle: {
                color: "royalblue",
              },
            },
            subtitles: {
              label: "English",
              default: true,
              maxWords: 3,
              wordHighlight: true,
            },
          },
        });
      } catch (err) {
        console.error("Error initializing player:", err);
      }
    };
    
      
   loadVideo();
   
}, [videoId]);

  return (
    <div className=" flex justify-center ">
      <Container>
        <div className="w-full  bg-gray-500 p-4">
          {/* videoplayer */}
          <div className="w-full    ml-1.5 rounded-3xl p-2">
            <div className="w-full gap-2  flex">
              <div className="w-3/4 ">
<video
                ref={videoRef}
                className=" cld-video-player  cld-fluid rounded-3xl"
              ></video>
              </div>
              <div className="w-1/4 flex items-center justify-center  my-auto">
{!summaryVisible && <div className="flex flex-col gap-4 ">
  <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[200px] rounded-xl bg-gradient-to-r from-neutral-300 to-stone-400" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px] bg-gradient-to-r from-neutral-300 to-stone-400" />
        <Skeleton className="h-4 w-[150px] bg-gradient-to-r from-neutral-300 to-stone-400" />
      </div>
    </div>
<Button className="   text-xs py-2"
bgColor="bg-gradient-to-r from-violet-500 to-purple-500" 
onClick={async()=>
  {await loadSummary();
   setSummaryVisible(true)

}}
>generate video summary</Button>
</div> }
               {summaryVisible &&
               <div className="flex flex-col gap-4 ">
                <h1 className="text-center bg-gray-100 rounded-xl px-2 font-bold"> VIDEO SUMMARY GENERATED </h1>
<Summary className=" w-full  text-xs  text-white" summary = {summary?.replace(".", "/n")} />
               </div>
                 }
              </div>
              
            </div>
           
            <div className=" w-3/4  sm:mt-4 text-white flex flex-wrap bg-opacity-5 bg-[url('../.././public/shade-9330020_1280.png')] backdrop-blur-3xl rounded-3xl">
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
                  <Button
                    bgColor="bg-gray-700"
                    className="hover:bg-black flex gap-2"
                    onClick={likeVideoFromId}
                  >
                    {isAlreadyLiked ? (
                      <>
                        <ThumbsUp />
                        {video?.totalLikesOnVideo} likes
                      </>
                    ) : (
                      <>
                        <ThumbsUp color="" fillOpacity={90} fill="#2246d8" />
                        {video?.totalLikesOnVideo} likes
                      </>
                    )}
                  </Button>

                  <Button
                    textColor="text-gray-800"
                    className="bg-gray-300 hover:bg-gray-400 font-bold px-1 py-1 text-sm"
                  >
                    <a
                      href={cloudinaryDownloadUrl}
                      className="flex gap-1"
                      download
                    >
                      <ArrowDownToLine size={20} />
                      Download
                    </a>
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
