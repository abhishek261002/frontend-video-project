import React, { useDebugValue, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Dropdowns, LikeDislikeBtn } from "../index.js";
function Comments({ content, createdBy, createdAt, likesOnComment,_id }) {
  
  const userId = useSelector((state) => state.userData?._id);
  const isOwnerOfComment = userId === createdBy._id ? true : false;

  return (
    <div className="w-full flex border-2 border-black rounded-xl px-2 pb-4 pt-2 gap-4">
      <Link to={`/users/c/${createdBy?.username}`} >
        <img
          src={createdBy?.avatar}
          alt={createdBy?.username}
          className="rounded-3xl h-10"
        />
      </Link>
      
      <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        <h6 className="text-sm font-bold font-mono">@{createdBy?.username}</h6>
        <h6 className="pt-0.4 text-xs font-extralight font-mono">{createdAt?.split("T")?.[0]}</h6>
      </div>
        <h6 className="text-lg text-slate-900 mb-1">{content}</h6>
        <LikeDislikeBtn LikesOnComment={likesOnComment} commentId={_id}/>
      </div>
     
      {isOwnerOfComment && (
        <div >
          <Button>EDIT</Button>
          <Button>DELETE</Button>
        </div>
      )}
    </div>
  );
}

export default Comments;
