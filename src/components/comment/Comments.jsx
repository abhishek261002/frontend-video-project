import React, { useDebugValue, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Dropdowns, LikeDislikeBtn,Input } from "../index.js";
import commentservice from "@/services/comment.service.js";
import { useForm } from "react-hook-form";
function Comments({ content, createdBy, createdAt, likesOnComment,_id, setRefresh }) {
  
  const userId = useSelector((state) => state.auth.userData?._id);
  const [isEditing, setIsEditing] = useState(false)
  const {register, handleSubmit} = useForm()
  const isOwnerOfComment = userId === createdBy._id ? true : false;
  const {videoId} = useParams()
 
  const deleteCommentById= async()=>{
      const deleteComment = await commentservice.deleteComment(_id);
      if(deleteComment){
        console.log(deleteComment);
        setRefresh((prev)=> !prev)
      }
  }
  const handleEditClick = ()=>{
    setIsEditing(!isEditing)
  }
  const editCommentById = async(data)=>{
 
   try {
     setIsEditing(true)
     console.log(_id, data.newContent);
     const editComment = await commentservice.editComment({ commentId: _id, newContent: data.newContent, videoId })
     if(editComment){
       console.log(editComment);
       setIsEditing(false)
       setRefresh((prev)=> !prev)
     }
   } catch (error) {
    console.log("error :: ",error);
    throw error
   }
  }

    return (
    <div className="w-full flex border-2 border-black rounded-xl px-2 pb-4 pt-2 gap-4">

      <>
      <Link to={`/users/c/${createdBy?.username}`} >
        <img
          src={createdBy?.avatar}
          alt={createdBy?.username}
          className="rounded-3xl h-10"
        />
      </Link>
      <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <h6 className="text-sm font-bold font-mono">@{createdBy?.username}</h6>
        <h6 className="pt-0.4 text-xs font-extralight font-mono">{createdAt?.split("T")?.[0]}</h6>
      </div>
       {!isEditing ? <h6 className="text-lg text-slate-900 mb-1">{content}</h6> :
        <form onSubmit={handleSubmit(editCommentById)}
        className="flex gap-2">
        <Input
        type="text"
        defaultValue={content}
        {...register("newContent")}
        />
        <Button type="submit">Save</Button>
      </form>
       }
        <LikeDislikeBtn initialLikesOnComment={likesOnComment} commentId={_id}/>
      </div>
      {isOwnerOfComment && !isEditing && (
  <div >
    <Button className="mr-2" onClick={handleEditClick}>EDIT</Button>
    <Button onClick={deleteCommentById}>DELETE</Button>
  </div>
)}

     </> 
    
    </div>
  );
}

export default Comments;
