import axios from "axios";
import { BASE_URL } from "../conf/conf.js";


export class LikeService{

    async toggleCommentLike({videoId, commentId}){
        try {
            const toggleLike = await axios.post(`${BASE_URL}/like/c/:${videoId}/toggle-like-comment`,
                {commentId},
                {withCredentials: true}
            )
    
            if(!toggleLike){
                return null
            }
            return toggleLike
        } 
        catch (error) {
            console.log("ERROR IN TOGGLE COMMENT LIKE :: ",error?.message);    
            throw error;
        }
    }

    async toggleVideoLike(videoId){
        try {
            const toggleLike = await axios.post(`${BASE_URL}/like/video`,
                {videoId},
                {withCredentials: true}
            )
    
            if(!toggleLike){
                return null
            }
            return toggleLike
        } 
        catch (error) {
            console.log("ERROR IN TOGGLE VIDEO LIKE :: ",error?.message);    
            throw error;
        }
    }

    async toggleTweetLike({ tweetId}){
        try {
            const toggleLike = await axios.post(`${BASE_URL}/like/toggle-like-tweett`,
                {tweetId},
                {withCredentials: true}
            )
    
            if(!toggleLike){
                return null
            }
            return toggleLike
        } 
        catch (error) {
            console.log("ERROR IN TOGGLE COMMENT LIKE :: ",error?.message);    
            throw error;
        }
    }

    async getLikedVideo(){
        try {
            const allLikedVideos = await axios.get(`${BASE_URL}/like/get-likedVideos`,
                {withCredentials: true}
            )

            if(!allLikedVideos){
                return null
            }
            return allLikedVideos
            } 
        catch (error) {
            console.log("ERROR IN FETCHING ALL LIKED VIDEOS :: ",error?.message);
            throw error;
        }
    }
}

const likeservice = new LikeService();

export default likeservice