import axios from "axios";
import {BASE_URL} from "../conf/conf.js"

export class Videoservice{

    async uploadVideo({videoFile, title ,description, isPublished, thumbnail, owner}){
        try {
            const formData = new FormData();
            // Step 2: Append files
            formData.append("videoFile", videoFile); // 'videoFile' is the key expected by the backend
            formData.append("thumbnail", thumbnail);

            // Step 3: Append text fields
            formData.append("title", title);          // Add title
            formData.append("description", description); // Add description
            formData.append("isPublished", isPublished); // Add publish status
            formData.append("owner", owner);

            const upload = await axios.post(`${BASE_URL}/video/video-upload`,
            formData,
            { 
                withCredentials: true, // If authentication cookies or tokens are needed
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(`Upload Progress: ${percentCompleted}%`);
                },
            }
        )
            if(!upload){
                return null
            }
            return upload;
        } 
        catch (error) {
            console.log("ERROR IN UPLOADING VIDEO :: ",error?.message);
            throw error;
        }
    }

    async deleteVideo(videoId){
        try {
            const deletevideo = await axios.post(`${BASE_URL}/video/video-delete`,
                                { videoId},
                                {withCredentials: true}
                            )
            if(!deletevideo){
                return null
            }
            return deletevideo.data?.data
        } 
        catch (error) {
            console.log("ERROR IN DELETE VIDEO :: ",error?.message);
            throw error;
        }
    }

    async getAllVideos(searchQuery = "") {
        try {
            // Construct the URL with the query parameter if searchQuery is provided
            const url = searchQuery 
                ? `${BASE_URL}/video/all-videos?title=${encodeURIComponent(searchQuery)}`
                : `${BASE_URL}/video/all-videos`;
    
            const allvideos = await axios.get(url);
    
            if (!allvideos) {
                return null;
            }
            return allvideos.data;
        } 
        catch (error) {
            console.log("ERROR IN GETTING ALL VIDEOS :: ", error?.message);
            throw error;
        }
    }
    

    async editVideo({newThumbnail, title, description, videoId}){
        try {
            const formData = new FormData();

            formData.append("newThumbnail",newThumbnail)
            formData.append("title",title)
            formData.append("description",description)
            formData.append("videoId",videoId)
            
            const editedvideos = await axios.post(API_ENDPOINTS.EDIT_VIDEO.toString(),
            formData,
            {withCredentials:  true}
            )
            if(!editedvideos){
                return null
            }
            return editedvideos
        } 
        catch (error) {
            console.log("ERROR IN EDIT VIDEO :: ",error?.message);
            throw error;
        }
    }

    async streamVideo(videoId){
        try {
            const streamvideo = await axios.post(`${BASE_URL}/video/${videoId}`,
            )
            if(!streamvideo){
                return null
            }
            return streamvideo.data?.data
        } 
        catch (error) {
            console.log("ERROR IN STREAM VIDEO :: ",error?.message);
            throw error;
        }
    }
    
    async getVideosFromChannel(username){
        try {
            const allVideosOfChannel = await axios.get(`${BASE_URL}/video/c/${username}`)
        if(!allVideosOfChannel){
            return null
        }
        return allVideosOfChannel.data
        } 
        catch (error) {
            console.log("ERROR IN GETTING VIDEOS FROM CHANNEL :: ",error?.message);
            throw error;
        }
    }
    
    async pushVideoToWatchHistory({videoId}){
        try {
            const addToWatchHistory = await axios.post(`${API_ENDPOINTS.PUSH_VIDEO_TO_WATCH_HISTORY}`,
                { videoId},
                {withCredentials: true}
            )

            if((!addToWatchHistory)){
                return null
            }
            return addToWatchHistory
        } 
        catch (error) {
            console.log("ERROR IN PUSHING VIDEO TO WATCH HISTORY :: ",error?.message);
            throw error;
        }
    }

    async toggleIsPublished({videoId}){
        try {
            const togglePublish = await axios.post(`${API_ENDPOINTS.TOGGLE_IS_PUBLISHED}`,
                {videoId},
                {withCredentials: true}
            )
            if(!togglePublish){
                return null
            }
            return togglePublish
        } 
        catch (error) {
            console.log("ERROR IN TOGGLE PUBLISH STATUS :: ",error?.message);
            throw error;    
        }
    }

}

const videoservice = new Videoservice();

export default videoservice