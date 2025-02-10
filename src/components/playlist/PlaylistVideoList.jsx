import React from "react";
import { Link } from "react-router-dom";
import {Menu} from "lucide-react"
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import playlistservice from "@/services/playlist.service";

function PlaylistVideoList({
  _id,
  thumbnail,
  title,
  views,
  owner_details,
  duration,
  createdAt,
  setRefresh
},
) {
  function formatTime(duration) {
    const rounded = Math.trunc(duration);
    const hours = Math.floor(rounded / 3600);
    const minutes = Math.floor((rounded % 3600) / 60);
    const secs = (rounded % 60).toFixed(2);

    // Formatting to always show two digits for hours and minutes
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${secs.padStart(5, "0")}`;
  }
  const {playlistId} = useParams()

  const removeVideoFromPlaylist= async()=>{
   
    const removeVideo = await playlistservice.deleteVideoFromPlaylist({playlistId, videoId : _id})
    if(removeVideo){
      setRefresh((prev)=>!prev)  
    }
  }

  return (
    <div>
      <Link to={`/video/${_id}`}>
        <div className="w-full p-2 transition-all rounded-xl  bg-black text-white border-double border-spacing-2 border-2 backdrop-blur-md hover:scale-105">
          <div className="w-full justify-center mb-2">
            <div className="w-full flex justify-between items-center p-1.5 rounded-lg">
            <div className="flex">
            <div className="relative h-28">
                {/* Thumbnail Image */}
                <img
                  src={thumbnail}
                  alt={title}
                  className="rounded-xl h-28 w-full object-cover"
                />

                {/* Duration Overlay */}
                <h6 className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded">
                  {formatTime(duration).split(".")[0]}
                </h6>
              </div>
              <div className="px-2 flex flex-col gap-2">
                <h4 className="text-xl font-serif font-thin  ">{title}</h4>
                <h6 className="text-sm text-white text-opacity-60  font-mono">
                  {owner_details?.fullName} - {views} views -{" "}
                  {createdAt.split("T")[0]}{" "}
                </h6>
              </div>
            </div>
              
              <div className="bottom-0">
              <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu color="#2d68f0" strokeWidth={3} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Customize video</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/playlists/${_id}`}>
                <Button onClick={removeVideoFromPlaylist}>Remove from playlist</Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Link to={`/video/edit-video/:${_id}`}>
                <Button>Edit Button</Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
              </div>
              
            </div>
          </div>
        </div>
      </Link>
     
    </div>
  );
}

export default PlaylistVideoList;
