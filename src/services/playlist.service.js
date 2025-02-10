import axios from "axios";
import { BASE_URL } from "@/conf/conf";

export class PlaylistService{

    async createPlaylist({name, description}){
        try {
            const createdPlaylist = await axios.post(`${BASE_URL}/playlist/create-playlist`,
                {name,description},
                {withCredentials: true}
            )
            if(!create){
                return null
            }
            return createdPlaylist.data?.data
        } 
        catch (error) {
            console.log("ERROR IN CREATE PLAYLIST :: ", error?.message);
            throw error
        }
    }

    async deletePlaylist(playlistId){
        try {
            const deletingPlaylist = await axios.post(`${BASE_URL}/playlist/delete-playlist`,
                {playlistId},
                {withCredentials: true}
            )
            if(!deletingPlaylist){
                return null
            }
            return deletingPlaylist.data?.data
        } 
        catch (error) {
            console.log("ERROR IN DELETE PLAYLIST :: ", error?.message);
            throw error
        }
    }

    async updatePlaylist({playlistId, name, description}){
        try {
            const updatedPlaylist = await axios.post(`${BASE_URL}/playlist/edit-playlist`,
                {playlistId , name ,description},
                {withCredentials: true}
            )
            if(!updatedPlaylist){
                return null
            }
            return updatedPlaylist.data?.data
        } 
        catch (error) {
            console.log("ERROR IN UPDATE PLAYLIST :: ", error?.message);
            throw error
        }
    }

    async addVideoToPlaylist({videoId, playlistId }){
        try {
            const addVideoPlaylist = await axios.post(`${BASE_URL}/playlist/add-video-playlist`,
                {playlistId ,videoId},
                {withCredentials: true}
            )
            if(!addVideoPlaylist){
                return null
            }
            return addVideoPlaylist.data?.data
        } 
        catch (error) {
            console.log("ERROR IN ADDING VIDEO TO PLAYLIST :: ", error?.message);
            throw error
        }
    }

    async deleteVideoFromPlaylist({playlistId ,videoId}){
        try {
            const removeVideoFromPlaylist = await axios.post(`${BASE_URL}/playlist/c/${playlistId}/remove-video-playlist`,
                videoId,
                {withCredentials : true}
            )
            if(!removeVideoFromPlaylist){
                return null
            }
            return removeVideoFromPlaylist.data?.data
        } 
        catch (error) {
            console.log("ERROR IN REMOVING VIDEO FROM PLAYLIST :: ", error?.message);
            throw error
        }
    }

    async getPlaylistById(playlistId){
        try {
            const getPlaylist = await axios.get(`${BASE_URL}/playlist/c/${playlistId}/get-playlist`,
                {withCredentials : true}
            )
            if(!getPlaylist){
                return null
            }
            return getPlaylist.data?.data
        } 
        catch (error) {
            console.log("ERROR IN GETTING PLAYLIST BY ID :: ", error?.message);
            throw error
        }
    }

    async getAllUserPlaylists(){
        try {
            const getPlaylist = await axios.get(`${BASE_URL}/playlist/get-userplaylists`,
                {withCredentials : true}
            )
            if(!getPlaylist){
                return null
            }
            return getPlaylist.data?.data
        } 
        catch (error) {
            console.log("ERROR IN GETTING ALL USER'S PLAYLISTS:: ", error?.message);
            throw error
        }
    }
}

const playlistservice = new PlaylistService();

export default playlistservice