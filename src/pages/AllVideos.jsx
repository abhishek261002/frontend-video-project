import React, { useEffect, useState } from 'react';
import Container from "../container/Container.jsx";
import {SearchX} from "lucide-react"
import videoservice from '../services/video.service.js';
import Videocard from '../components/video/Videocard.jsx';
import { setVideos } from "../store/videoSlice.js";
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

function AllVideos() {
    const [allVideos, setAllVideos] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation();
   
    // Function to get the search term from the query parameters
    const getSearchQuery = () => {
        const params = new URLSearchParams(location.search);
        return params.get("title") || '';  // Return search term or an empty string
    };

    const fetchVideos = async (search = '') => {
        try {
            const getallVideos = await videoservice.getAllVideos(search); // Pass search term to backend
            if (getallVideos) {
                setAllVideos(getallVideos.data);
                dispatch(setVideos(getallVideos.data));
            }
        } catch (error) {
            console.log("ERROR IN FETCHING ALL VIDEO :: ", error?.message);
            throw error;
        }
    };

    useEffect(() => {
        const searchTerm = getSearchQuery();  // Get search term from URL
        fetchVideos(searchTerm);  // Fetch videos based on the search term
    }, [location.search]);  // Dependency on URL search query

    return allVideos.length === 0 ?
        (<div className="w-full py-2 mt-4 text-center">
            <Container >
                    <div className="p-2 w-1/2 mx-auto flex flex-col gap-10 justify-center items-center">
                    <SearchX color='#9999' size={80}/>
                        <h1 className="text-4xl font-bold text-gray-500 tracking-widest">
                            Create new videos / No video available.........
                        </h1>

                </div>
            </Container>
        </div>) :
        (<div className='w-full py-1'>
            <Container>
                <div className='flex flex-wrap bg-white'>
                    {allVideos && allVideos.map((video) => (
                        <div key={video._id} className='p-8 w-1/4'>
                            <Videocard {...video} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
        );
}

export default AllVideos;
