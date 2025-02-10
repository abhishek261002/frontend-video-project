import React from 'react'
import { useForm } from 'react-hook-form'
import {Input , Button} from "../index.js"
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
function SearchInput() {

  const {register, handleSubmit, watch}= useForm()
  const navigate =  useNavigate()
  const searchVideos= async(data)=>{
   console.log(data.searchQuery);
   navigate(`/search?title=${data.searchQuery}`)
  }

  return (
    
<div class="max-w-md mx-auto ">
<div className='w-full flex bg-gray-300 gap-2 items-center rounded-full ring-1 ring-gray-500'>

  <form className='w-full flex gap-0.5 ' onSubmit={handleSubmit(searchVideos)}>
  <Input 
  className = "focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent focus:shadow-[0px_0px_8px_0px_rgba(0,170,255,0.5)]"
    rounded="rounded-l-full"
    type="text"
    placeholder="search videos..."
    {...register("searchQuery")}
  />
  <Button bgColor='bg-gray-400'  rounded='rounded-r-full'
   type='submit'><Search color='#000000'/></Button>
  </form>


    </div>   

</div>

  )
}

export default SearchInput