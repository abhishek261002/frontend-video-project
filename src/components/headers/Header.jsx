import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "./SearchInput";
import LogoutBtn from "./LogoutBtn.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import authservice from "@/services/auth.service";

function Header() {
  const userStatus = useSelector((state) => state.status);
  const [avatar, setAvatar] = useState("")

    useEffect(()=>{
        const currentUser = async()=>{
            const user = await authservice.getCurrentUser();
            if(user){
                setAvatar(user?.userData?.avatar);
            }
        }
        currentUser()
    },[])

  return (
    <header>
      <nav class="bg-white border-gray-200 px-4 lg:px-8 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" class="flex items-center ">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Videostream
            </span>
          </Link>
          <div class=" w-1/3  p-0">
            <SearchInput />
          </div>
          <div class="flex items-center ">
            {!userStatus && (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="inline-block px-6 py-2 duration-200 hover:text-orange-600 rounded-full bg-black text-white font-semibold"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  class="inline-block px-6 py-2 duration-200 hover:text-orange-600 rounded-full bg-black text-white font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            )}
            {userStatus && (
              <div className="flex gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger><img src={avatar || ""} alt="user"  className="rounded-full h-8" /></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem><LogoutBtn /></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
