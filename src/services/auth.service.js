import axios from "axios"
import { BASE_URL } from "../conf/conf";

axios.defaults.withCredentials= true;

export class Authservice{
    
    async createAccount({username , email ,password , avatar, fullName ,coverImage}){
       try {
        const formData = new FormData();

        formData.append("username",username)
        formData.append("email",email)
        formData.append("password",password)
        formData.append("avatar",avatar)
        formData.append("fullName",fullName)
        if(coverImage){
            formData.append("coverImage",coverImage) 
        }

        const userAccount = await axios.post(`${BASE_URL}/users/register`,
                formData )
                 
        if(!userAccount){
            return null
           }
        if(userAccount){
            return this.login({email, username, password})
        }
        return userAccount
       } 
       catch (error) {
        console.log("ERROR IN CREATING ACCOUNT :: ", error);
       }
     }

    async login({username ,email ,password}){
        try {
            const loginUser = await axios.post(`${BASE_URL}/users/login`,
                {email, password ,username},
                
            )
            if(!loginUser){
                console.log("NOT FOUND");
                return null
            }
            return loginUser
        } 
        catch (error) {
            console.log("ERROR IN LOGIN :: ",error);
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            const currentUser = await axios.get(`${BASE_URL}/users/current-user`,
            )

            if(!currentUser){
                console.log("NOT GETTING CURRENT USER");
                return null
            }
            return currentUser.data?.data
        } catch (error) {
            console.log("ERROR IN GET CURRENT USER :: ",error?.message);
            throw error;
        }
    }

    async logout(){
        try {
            return await axios.post(`${BASE_URL}/users/logout`,
                {withCredentials: true}
            )
        } catch (error) {
            console.log("ERROR IN LOGOUT USER :: ",error);
            throw error;
        }
    }

    async changePassword({inputOldPassword, inputNewPassword}){
        try {
            const changePass = await axios.post(`${BASE_URL}/users/change-password`,
                {inputNewPassword, inputOldPassword},
                {withCredentials: true}
            )

            if(!changePass){
                return null
            }
            return changePass

            } 
        catch (error) {
            console.log("ERROR IN CHANGING USER PASSWORD :: ",error?.message);
            throw error;
        }
    }

    async updateAccountDetails({email, fullName}){
        try {
            const updatedAccount = await axios.post(`${BASE_URL}/users/edit-accdetails`,
                {email, fullName},
                {withCredentials: true}
            )

            if(!updatedAccount){
                return null
            }
            return updatedAccount
            }
        catch (error) {
            console.log("ERROR IN UPDATE ACCOUNT DETAILS :: ",error?.message);
            throw error
        }
    }

    async editUserAvatar({avatar}){
        try {
            const formData = new FormData();

            formData.append("avatar",avatar)

            const updatedAvatar = await axios.post(`${BASE_URL}/users/edit-useravatar`,
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log(`Upload Progress: ${percentCompleted}%`);
                    },
                    withCredentials: true
                }
                )

            if(!updatedAvatar){
                return null
            }

            return updatedAvatar
            } 
        catch (error) {
            console.log("ERROR IN UPDATING AVATAR :: ",error?.message);
            throw error;
        }
    }

    async editUserCoverImage({coverImage}){
        try {
            const formData = new FormData()

            formData.append("coverImage",coverImage)

            const updatedCoverImage = await axios.post(`${BASE_URL}/users/edit-usercoverimage`,
                formData,
                { 
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log(`Upload Progress: ${percentCompleted}%`);
                    }
                   , withCredentials: true
                }
            )

            if(!updatedCoverImage){
                return null
            }

            return updatedCoverImage
            } 
        catch (error) {
            console.log("ERROR IN UPDATING COVER IMAGE :: ",error?.message);
            throw error;
        }
    }

    async getUserChannelProfile(username){
        try {
            const channel = await axios.get(`${BASE_URL}/users/c/${username}`,
            )

            if(!channel){
                return null
            }
            return channel.data
            } 
        catch (error) {
            console.log("ERROR IN FETCHING CHANNEL PROFILE :: ",error?.message);
            throw error
        }
    }

    async getUserWatchHistory(){
        try {
            const watchHistory = await axios.get(`${BASE_URL}/users/watch-history`,
                {withCredentials: true}
            )

            if(!watchHistory){
                return null
            }

            return watchHistory
            } 
        catch (error) {
            console.log("ERROR IN FETCHING WATCH HISTORY :: ",error?.message);
            throw error;
        }
    }
    
}

const authservice = new Authservice();

export default authservice;
