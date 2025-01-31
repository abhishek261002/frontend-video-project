import videoservice from "@/services/video.service";
import authservice from "@/services/auth.service.js";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../index.js";
import { useNavigate } from "react-router-dom";
import { Loader } from 'lucide-react';
function VideoUpload() {
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading]= useState(false)
  const navigate = useNavigate()
  const videoUpload = async (data) => {
    setIsLoading(true)
    try {
      const videoFile = data.videoFile[0];
      const thumbnail = data.thumbnail?.[0];
      data.owner = user?.userData?._id;
      const video = await videoservice.uploadVideo({...data,
        thumbnail,
        videoFile
      });
      if (video) {
        navigate("/")
      }
      setIsLoading(false)
    } catch (error) {
      throw error
    }
  };
  useEffect(()=>{
    const getCurrentUser = async () => {
      const user = await authservice.getCurrentUser();
      if (user) {
        setUser(user);
      }
    };
    getCurrentUser();
  },[])
  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
       {!isLoading && <form onSubmit={handleSubmit(videoUpload)}>
          <Input
            label="Title : "
            placeholder="Enter the title for your video.."
            {...register("title", {
              required: true,
            })}
          />
          <Input
            label="Description : "
            placeholder="Enter your description"
            {...register("description", {
              required: true,
            })}
          />
          <Input
            label="VideoFile :"
            type="file"
            className="mb-4"
            accept="video/*"
            {...register("videoFile", { required: true })}
          />
          <Input
            label="Thumbnail :"
            type="file"
            className="mb-4 "
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("thumbnail", { required: true })}
          />
          <fieldset className="border-4 border-black p-4 mb-4 flex gap-4">
            <legend>Select isPublished :</legend>
            <div className="flex gap-2">
              <input type="radio"  name="true" value={true} checked
              {...register("isPublished")} />
              <label for="true">true </label>
            </div>
            <div className="flex gap-2">
              <input type="radio"  name="false" value={false}
              {...register("isPublished")} />
              <label for="false">false</label>
            </div>
          </fieldset>

          <Button type="submit" className="w-full">
            Upload
          </Button>
        </form>}
       {isLoading && <div className="w-svh min-h-svh flex flex-col justify-center items-center gap-10">
        <Loader className='animate-spin' size={200} />
        <h6 className="text-3xl font-semibold font-jaro ">Video is uploading.....</h6>
       </div>}
      </div>
    </div>
  );
}

export default VideoUpload;
