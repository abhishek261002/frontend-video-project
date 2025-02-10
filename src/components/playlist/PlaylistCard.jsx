import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ListVideo, EllipsisVertical, Trash2, Pencil } from "lucide-react";
import { Button, Input } from "../index.js";
import EditPlaaylistModal from "./EditPlaaylistModal.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import playlistservice from "@/services/playlist.service.js";

function PlaylistCard({
  _id,
  countOfAllVideosInPlaylist,
  coverVideoInPlaylist,
  name,
  description,
  updatedAt,
  setRefresh,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // For managing dialog state

  const deletePlaylistFromId = async () => {
    const deletePlaylist = await playlistservice.deletePlaylist(_id);
    if (deletePlaylist) {
      alert(`${name} deleted successfully`);
      setRefresh((prev) => !prev);
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="h-screen overflow-visible">
      <div>
        <Link to={`/video/${coverVideoInPlaylist?._id}`}>
          <div className="w-full p-2 rounded-xl bg-black text-white border-double border-spacing-2 backdrop-blur-md transition-all hover:scale-105">
            <div className="w-full justify-center mb-2">
              <div className="w-full bg-black  p-1.5 rounded-lg">
                <img
                  src={coverVideoInPlaylist?.thumbnail}
                  alt={coverVideoInPlaylist?.title}
                  className="rounded-xl h-40 hover:opacity-50 mx-auto"
                />
                <div className="flex items-center gap-1">
                  <ListVideo />
                  <h6 className="text-right text-xs font-bold">
                    {countOfAllVideosInPlaylist} videos
                  </h6>
                </div>
              </div>
              <div className="flex">
                <h4 className="w-full text-xl font-jaro font-thin text-center underline">
                  {name}
                </h4>
                <Link to="/playlists">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-300">
                      <DropdownMenuLabel>Playlists</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="justify-center">
                        <Button
                          onClick={deletePlaylistFromId}
                          bgColor="bg-gray-800"
                          className="flex w-full gap-10"
                        >
                          <Trash2 strokeWidth={1} size={20} /> Delete
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="justify-center">
                        <Button
                          bgColor="bg-gray-800"
                          onClick={openDialog} // Open dialog on button click
                          className="flex w-full gap-10"
                        >
                          <Pencil strokeWidth={1} size={20} /> Edit
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Link>
              </div>

              <div className="flex justify-evenly bg-black h-15">
                <div className="text-center gap-2 p-2">
                  <h6 className="text-sm font-extralight">
                    updatedAt- {updatedAt?.split("T")?.[0]}
                  </h6>
                  <Link to={`/playlists/${_id}`}>
                    <h6 className="text-sm font-light hover:font-semibold">
                      View full playlist
                    </h6>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Dialog for editing playlist */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle >Edit Playlist</DialogTitle>
              <DialogDescription>
                Make changes to your playlist here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            {/* Pass playlist data to the EditPlaaylistModal */}
            <EditPlaaylistModal
              data={{
                coverVideoInPlaylist,
                name,
                description,
                _id,
                updatedAt,
              }}
              setRefresh={setRefresh}
              setIsDialogOpen={setIsDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default PlaylistCard;
