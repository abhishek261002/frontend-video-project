import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Menu } from 'lucide-react';
import {removeVideo} from "../../store/videoSlice.js"
import videoservice from '@/services/video.service';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Button } from '../ui/button';
function Videocard({
    _id, thumbnail, title ,views, owner, duration, createdAt, setRefresh
    }) {
        const dispatch = useDispatch();
        const userData = useSelector((state) => state.auth.userData);
        const {username} = useParams()
        const isAuthor = username && userData ? username === userData.username : false
        const deleteVideoFromId= async()=>{
            const deleteVideo = await videoservice.deleteVideo(_id);
            if(deleteVideo){
                console.log(deleteVideo);
                dispatch(removeVideo(deleteVideo))
                setRefresh((prev)=> !prev)
            }
        }
        function formatTime(duration) {
            const rounded = Math.trunc(duration)
            const hours = Math.floor(rounded / 3600);
            const minutes = Math.floor((rounded % 3600) / 60);
            const secs = (rounded % 60).toFixed(2);
        
            // Formatting to always show two digits for hours and minutes
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${secs.padStart(5, '0')}`;
        }
        

  return (
    <div>
        <Link to={`/video/${_id}`}>
        <div className='w-full p-2 rounded-xl bg-black text-white border-double border-red-500 border-2 backdrop-blur-md hover:scale-105'>
            <div className='w-full justify-center mb-2'>
                <div className='w-full bg-black p-1.5 rounded-lg'>
                    <img src={thumbnail}  alt={title} className='rounded-xl h-40'/>
                    <h6 className='text-right text-xs font-bold'>{formatTime(duration).split(".")[0]} </h6>
                </div>
                <h4 className='text-xl font-serif font-thin text-center underline'>{title}</h4>
                <div className='flex justify-evenly  bg-black h-15'>
                    {owner && 
                    <div className='bg-green' >
                        <Link to={`/users/c/${owner?.username}`}>
                        <img src={owner?.avatar}  alt={owner?.username} className='rounded-3xl h-8'/>  
                        <h4 className='text-xs font-extralight'>@{owner?.username}</h4>
                        </Link>
                    </div>
                    }
                    
                    <div className='  text-center gap-2 p-2'>
                    
                    <h6 className='text-xs font-extralight'>views- {views} </h6>
                    <h6 className='text-xs font-extralight'>createdAt- {createdAt.split("T")[0]}</h6>
                    </div>
                   
                </div>
           
            </div>
        </div>
    </Link>
         {isAuthor && <DropdownMenu>
                  <DropdownMenuTrigger><Menu/></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Customize video</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link to={`/video/edit-video/:${_id}`}>
                            <Button>Edit Button</Button>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                            <Button onClick={deleteVideoFromId}>DELETE</Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>}
    </div>
    
  )
}

export default Videocard