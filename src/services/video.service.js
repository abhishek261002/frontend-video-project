import axios from "axios";
import {API_ENDPOINTS} from "../conf/conf"


export class Videoservice{

    async uploadVideo({videoFile, title ,description, isPublished, thumbnail}){
        try {
            const upload = await axios.post(API_ENDPOINTS.UPLOAD_VIDEO.toString(),
            {
               videoFile,title, description, isPublished, thumbnail 
            },
            {withCredentials: true}
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

    async deleteVideo({videoId}){
        try {
            const deletevideo = await axios.post(API_ENDPOINTS.DELETE_VIDEO.toString(),
                                { videoId},
                                {withCredentials: true}
                            )
            if(!deletevideo){
                return null
            }
            return deletevideo
        } 
        catch (error) {
            console.log("ERROR IN DELETE VIDEO :: ",error?.message);
            throw error;
        }
    }

    async getAllVideos(){
        try {
            const allvideos = await axios.get(API_ENDPOINTS.ALL_VIDEOS.toString()
            )
            if(!allvideos){
                return null
            }
            return allvideos
        } 
        catch (error) {
            console.log("ERROR IN GETTING ALL VIDEOS :: ", error?.message);
            throw error;
        }
    }

    async editVideo({newThumbnail, title, description, videoId}){
        try {
            const editedvideos = await axios.post(API_ENDPOINTS.EDIT_VIDEO.toString(),
            { newThumbnail , title , description, videoId},
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

    async streamVideo({videoId}){
        try {
            const streamvideo = await axios.post(API_ENDPOINTS.STREAM_VIDEO.toString(),
            { videoId}
            )
            if(!streamvideo){
                return null
            }
            return streamvideo
        } 
        catch (error) {
            console.log("ERROR IN STREAM VIDEO :: ",error?.message);
            throw error;
        }
    }
    
    async getVideosFromChannel({username}){
        try {
            const allVideosOfChannel = await axios.get(API_ENDPOINTS.GET_CHANNEL_VIDEOS.toString(),
            { username}
        )
        if(!allVideosOfChannel){
            return null
        }
        return allVideosOfChannel
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