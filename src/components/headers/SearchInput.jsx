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
<div className='w-full flex bg-gray-300 gap-2 items-center rounded-2xl p-2'>
<Search/>
  <form className='w-full flex gap-2' onSubmit={handleSubmit(searchVideos)}>
  <Input 
    type="text"
    placeholder="search videos..."
    {...register("searchQuery")}
  />
  <Button type='submit'>Search</Button>
  </form>


    </div>   

</div>

  )
}

export default SearchInput