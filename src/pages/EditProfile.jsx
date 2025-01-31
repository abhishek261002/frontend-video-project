import authservice from "@/services/auth.service";
import { login as storeLogin } from "@/store/authSlice";
import Container from "@/container/Container";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Button } from "../components/index.js";

function EditProfile() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const isOwner =
    username && user ? username === user.userData?.username : false;
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await authservice.getCurrentUser();
      if (user) {
        dispatch(storeLogin(user));
        setUser(user);
      }
    };
    getCurrentUser();
  }, []);

  const editCoverImage = async (data) => {
    const coverImageFile = data.coverImage?.[0] || "";
    const editCover = await authservice.editUserCoverImage(coverImageFile);
    if (editCover) {
      console.log("EDIT COVER IMAGE SUCCEASS");
    }
    navigate("/");
  };

  const editAvatar = async (data) => {
    const avatarImageFile = data.avatar?.[0];
    const editavatarr = await authservice.editUserAvatar(avatarImageFile);
    if (editavatarr) {
      console.log("EDIT AVATAR IMAGE SUCCEASS");
    }
    navigate("/");
  };

  const editFullNameAndEmail = async (data) => {
    console.log(data);
    const updateAccountDetails = await authservice.updateAccountDetails({
      ...data,
    });
    if (updateAccountDetails) {
      console.log("SUCCESSFULLY UPDATED ACCOUNT DETAILS");
    }
    navigate("/");
  };

  return (
    <div className="py-8">
      <Container>
        {/* own channel */}
        {isOwner && (
          <div className="w-full p-4 flex flex-col">
            <h1 className="my-6 text-white font-semibold text-4xl font-mono">
              Channel Customization :
            </h1>
            <div className="flex flex-col p-20 gap-20 bg-gray-700 rounded-3xl">
              {/* div for edit Cover Image */}
              <div className="flex  gap-6 p-6 border-2 border-indigo-400 rounded-2xl">
                <img
                  src={user?.userData?.coverImage}
                  className="w-1/6"
                  alt={user?.userData?.username}
                />
                <form
                  onSubmit={handleSubmit(editCoverImage)}
                  className="flex flex-col gap-4 justify-center items-center"
                >
                  <Input
                    type="file"
                    labelColor="text-white"
                    label="Edit Cover-Image : "
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("coverImage")}
                  />
                  <Button type="submit" className="w-full">
                    EDIT COVER-IMAGE
                  </Button>
                </form>
              </div>
              {/* div for edit avatar */}
              <div className="flex  gap-6 p-6 border-2 border-indigo-400 rounded-2xl">
                <img
                  src={user?.userData?.avatar}
                  className="w-1/6"
                  alt={user?.userData?.avatar}
                />
                <form
                  onSubmit={handleSubmit(editAvatar)}
                  className="flex flex-col gap-4 justify-center items-center"
                >
                  <Input
                    type="file"
                    labelColor="text-white"
                    label="Edit Avatar : "
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("avatar")}
                  />
                  <Button type="submit" className="w-full">
                    EDIT AVATAR
                  </Button>
                </form>
              </div>
              {/* div for editing fullName and email */}
              <div className="flex gap-6 p-6 border-2 border-indigo-400 rounded-2xl">
                <form
                  onSubmit={handleSubmit(editFullNameAndEmail)}
                  className="flex flex-col gap-6"
                >
                  <Input
                    type="text"
                    labelColor="text-white"
                    label="Edit Fullname : "
                    defaultValue={user?.userData?.fullName}
                    {...register("fullName")}
                  />
                  <Input
                    type="text"
                    labelColor="text-white"
                    label="Edit Email : "
                    defaultValue={user?.userData?.email}
                    {...register("email")}
                  />
                  <Button type="submit">Update Account Details</Button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* not the owner's channel  */}
        {!isOwner && (
          <div className="w-full h-screen text-white flex flex-col gap-4 justify-center items-center">
            <h1 className="text-3xl">
              OOPS you don&apos;t have permission to view this page
            </h1>
            <h4>
              You need to be signed in to an account that has access. Try
              switching or signing in to an account that has permission
            </h4>
          </div>
        )}
      </Container>
    </div>
  );
}

export default EditProfile;
