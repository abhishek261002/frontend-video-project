import React,{useDebugValue, useEffect, useState} from 'react'
import commentservice from "../../services/comment.service.js"
import { useSelector } from 'react-redux'
import {Button} from "../index.js"
function Comments({
    content,
    createdBy
}) {
   
  const userId = useSelector((state)=>(state.userData?._id))
  const isOwnerOfComment = userId===createdBy._id? true: false

  return (
    <div className='w-full border-2 border-black'>
        <img src={createdBy?.avatar}  alt={createdBy?.username} className='rounded-3xl h-10'/> 
      <h6>{content}</h6>
      {
        isOwnerOfComment && <div>
          <Button>EDIT</Button>
          <Button>DELETE</Button>
        </div>
      }
    </div>
  )
}

export default Comments