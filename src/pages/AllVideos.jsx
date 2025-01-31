import React,{useEffect,useState} from 'react'
import Container from "../container/Container.jsx"
import videoservice from '../services/video.service.js'
import Videocard  from '../components/video/Videocard.jsx'
import {setVideos} from "../store/videoSlice.js"
import { useDispatch } from 'react-redux'
function AllVideos() {
    const [allVideos, setAllVideos] = useState([]);
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchVideos = async()=>{
            try {
              const getallVideos = await videoservice.getAllVideos();
              if(getallVideos){
                 console.log(getallVideos);
                 setAllVideos(getallVideos.data)
                 dispatch(setVideos(getallVideos.data))
              }
            } 
            catch (error) {
             console.log("ERROR IN FETCHING ALL VIDEO :: ",error?.message);
             throw error;
            }
    
         }
        fetchVideos();
    },[])

    return allVideos.length===0?   
        (<div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500 tracking-widest">
                    Create new videos / No video available.........
                </h1>
                </div>
                </div>
            </Container>
        </div>)  :
        (<div className='w-full py-1 '>
            <Container>
                <div className='flex flex-wrap bg-white' > 
                    {allVideos && allVideos.map((video)=>(
                        <div key={video._id} className='p-8 w-1/4'> 
                        <Videocard {...video}/>
                    </div>
                    )    
                )}
                </div>
            </Container>
        </div>
      )
}

export default AllVideos
