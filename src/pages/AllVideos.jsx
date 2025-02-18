import React, { useEffect, useState } from "react";
import Container from "../container/Container.jsx";
import { SearchX } from "lucide-react";
import videoservice from "../services/video.service.js";
import Videocard from "../components/video/Videocard.jsx";
import { setVideos } from "../store/videoSlice.js";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function AllVideos() {
  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  // Function to get the search term from the query parameters
  const getSearchQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("title") || ""; // Return search term or an empty string
  };

  const fetchVideos = async (search = "") => {
    try {
      setLoading(true);
      const getallVideos = await videoservice.getAllVideos(search); // Pass search term to backend
      if (getallVideos) {
        setAllVideos(getallVideos.data);
        dispatch(setVideos(getallVideos.data));
      }
    } catch (error) {
      setError(error?.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchTerm = getSearchQuery(); // Get search term from URL
    fetchVideos(searchTerm); // Fetch videos based on the search term
  }, [location.search]); // Dependency on URL search query

  return allVideos.length === 0 ? (
    <div className="w-full py-2 mt-4 text-center">
      <Container>
        <div className="p-2 w-1/2 mx-auto  flex flex-col gap-10 justify-center items-center">
          <SearchX color="#9999" size={80} />
          <h1 className="text-4xl font-bold text-gray-500 tracking-widest">
            Create new videos / No video available.........
          </h1>
        </div>
      </Container>
    </div>
  ) : (
    <div className="w-full py-1 ">
      <Container className="flex flex-wrap">
        {error && <p className="text-xl text-red-500">{error}</p>}
        <div className="w-full flex flex-wrap bg-[url('../../../public/background-6993426_1280.jpg')] to-zinc-300">
          {allVideos &&
            allVideos.map((video) => (
              <div key={video._id} className="p-8 lg:w-1/4 sm:w-1/2 flex flex-wrap">
                <Videocard {...video} loading={loading} />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
}

export default AllVideos;
