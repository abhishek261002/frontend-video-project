import React, { useEffect, useRef, useState } from "react";
import cloudinary from "cloudinary-video-player";
import "cloudinary-video-player/cld-video-player.min.css";
import Container from "../../container/Container";
import videoservice from "../../services/video.service";
import commentservice from "../../services/comment.service.js";
import { useParams } from "react-router-dom";
import { Button, Input } from "../index.js";
import Comments from "../../pages/Comments.jsx";

function Videoplayer() {
  const { videoId } = useParams();
  const videoRef = useRef(null);
  const cloudinaryRef = useRef();
  const [video, setVideo] = useState("");
  // const [comments , setComments ] = useState([])
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
    //   const fetchComments = async()=>{
    //     try {
    //         const comments = await commentservice.getCommentsOnVideo(videoId)
    //         console.log(comments);
    //         if(comments.data){
    //             setComments(comments.data)
    //         }
    //     }
    //     catch (error) {
    //       console.log("ERROR IN FETCHING COMMENTS :: ", error?.message);
    //       throw error
    //     }
    // }

    // fetchComments()
    sourceUrl();
  }, []);

  return (
    <div className="py-8 flex justify-center ">
      <Container>
        <div className="w-full">
          {/* videoplayer */}
          <div className="w-3/4 bg-gray-500 mx-auto">
            <video
              ref={videoRef}
              className="cld-video-player cld-fluid"
            ></video>
            <h1 className="text-4xl font-semibold text-white font-serif text-center">
              title - {video?.title}
            </h1>
            <div className="w-full px-4 flex">
              <div className="w-1/2 flex gap-5 ">
                <img
                  src={video?.owner?.avatar}
                  alt={video?.owner?.username}
                  className="rounded-3xl h-10"
                />
                <div className="flex flex-col">
                  <h6 className="text-sm font-semibold font-mono">
                    {video?.owner?.fullName}
                  </h6>
                  <h6 className="text-xs font-extralight">
                    {video?.owner?.subscribersCount} subscribers
                  </h6>
                </div>
                <Button bgColor="bg-red-700" className="bg-black">
                  Subscribe
                </Button>
              </div>
              <div className="w-1/2 flex justify-end gap-4">
                <Button className="hover:bg-blue-700">
                  👍 {video?.totalLikesOnVideo} likes
                </Button>
                <Button className="hover:bg-blue-700">👎 dislike</Button>
                <Button
                  textColor="text-gray-800"
                  className="bg-gray-300 hover:bg-gray-400 font-bold"
                >
                  Download
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
          {/* comments */}
          {/* <div className="w-3/4 bg-red-500 mx-auto">
          <div className='flex flex-col' > 

            <Input
            type="text" 
            label="Create comment..."
            placeholder="enter new comment"
            />
                    {comments && comments.map((comment)=>(
                        <div key={comment._id} className='bg-green-500 p-4'> 
                        <Comments {...comment}/>
                    </div>
                    )    
                )}
                </div>
          </div> */}
          <Comments />
        </div>
      </Container>
    </div>
  );
}

export default Videoplayer;
