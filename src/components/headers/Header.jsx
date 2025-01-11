import React,{useEffect , useState} from "react";
import { Link, useParams ,useNavigate } from "react-router-dom";
import {useDispatch , useSelector} from "react-redux"
import SearchInput from "./SearchInput";

function Header() {





  return (
    <header>
    <nav class="bg-white border-gray-200 px-4 lg:px-8 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://flowbite.com" class="flex items-center ">
                <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Videostream</span>
            </a>
            <div class="bg-red-500 w-1/3 p-0" >
                <SearchInput/>
            </div>
            <div class="flex items-center ">
                <a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                    Log in</a>
                <a href="#" class="text-gray-800 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                    Sign Up</a>
                
            </div>
            
        </div>
    </nav>
</header>
   
  )
}

export default Header