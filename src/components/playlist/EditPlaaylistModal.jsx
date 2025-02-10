import React from "react";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../index.js";
import playlistservice from "@/services/playlist.service.js";

function EditPlaaylistModal({ data, setRefresh, setIsDialogOpen }) {
  const { register, handleSubmit } = useForm();
  const { coverVideoInPlaylist, name, description, updatedAt, _id } = data;

  const editPlaylistById = async (formData) => {
    try {
      formData.playlistId = _id;
      console.log("data", formData);
      const editPlaylist = await playlistservice.updatePlaylist({
        ...formData,
      });
      if (editPlaylist) {
        console.log(editPlaylist);
        setRefresh((prev) => !prev);
        setIsDialogOpen((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid gap-4 py-4 ">
        <img
                  src={coverVideoInPlaylist?.thumbnail}
                  alt={coverVideoInPlaylist?.title}
                  className="rounded-xl h-40 mx-auto hover:opacity-70"
         />
      <form
        onSubmit={handleSubmit(editPlaylistById)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-4">
        <Input
        className="focus:ring-2 focus:ring-indigo-400 transition-all"
          type="text"
          label="Name :"
          placeholder="Edit name..."
          defaultValue={name}
          {...register("name")}
        />
        <Input
        className="focus:ring-2 focus:ring-indigo-400 transition-all"
          type="text"
          label="Description :"
          placeholder="Edit description..."
          defaultValue={description}
          {...register("description")}
        />
        </div>
        

        <Button bgColor="bg-violet-700" type="submit"
        className="hover:bg-violet-900">Save changes</Button>
      </form>
    </div>
  );
}

export default EditPlaaylistModal;
