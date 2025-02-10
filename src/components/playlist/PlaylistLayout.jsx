import Container from "@/container/Container";
import { Play, ArrowDownNarrowWide  } from 'lucide-react';
import playlistservice from "@/services/playlist.service";
import { Videocard } from "..";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PlaylistCard from "./PlaylistCard";
import PlaylistVideoList from "./PlaylistVideoList";
function PlaylistLayout() {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState({});
  const [videosInPlaylist, setVideosInPlaylist] = useState([]);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const playlistData = async () => {
      try {
        const playlist = await playlistservice.getPlaylistById(playlistId);
        if (playlist) {
          console.log(playlist);
          setPlaylist(playlist);
          setVideosInPlaylist(playlist.allVideosInPlaylist);
        }
      } catch (error) {
        setError(error?.message);
        throw error;
      }
    };
    playlistData();
  }, [refresh]);

  return (
    <div className="w-full bg-black p-8 ">
      <Container>
        <div className="w-full flex gap-4">
          <div class="flex flex-col  my-6 w-96 p-6 bg-gradient-to-b from-fuchsia-600 to-black h-screen shadow-sm border border-slate-200 rounded-lg">
            <div className="w-72 flex flex-col gap-4 p-4 h-full mx-auto rounded-2xl bg-white  bg-opacity-15">
              <img
                class="w-full  mx-auto object-cover rounded-xl"
                src={playlist?.coverVideoInPlaylist?.thumbnail}
                alt="profile-picture"
              />
              <h4 class="mb-1 p-1 text-xl font-semibold text-slate-800">
                {playlist?.name}
              </h4>
             
                <Link
                  to={`/users/c/${playlist?.playlistOwner?.username}`}
                  className="flex flex-row gap-3"
                >
                  <img
                    src={playlist?.playlistOwner?.avatar}
                    alt={playlist?.playlistOwner?.username}
                    className="rounded-3xl h-8 inline-block"
                  />
                  <h4 className="font-semibold text-white">
                    By {playlist?.playlistOwner?.fullName}
                  </h4>
                </Link>
                <h6 className="font-semibold font-mono flex gap-4">Playlist <Play />  {playlist?.countOfAllVideosInPlaylist} videos</h6>
            </div>
          </div>
          <div className="my-6 w-full bg-gradient-to-r from-stone-500 to-black rounded-3xl p-6 flex flex-col gap-2">
            <h3 className="text-white flex gap-4"><ArrowDownNarrowWide color="#FFFF"/> SORT</h3>
            {videosInPlaylist && videosInPlaylist.map((video) => (
                        <div key={video._id} className='p-2 w-full'>
                           <PlaylistVideoList {...video} setRefresh={setRefresh}/>
                        </div>
                    ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default PlaylistLayout;
