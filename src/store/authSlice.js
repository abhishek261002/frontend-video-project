import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
    likedVideos:[],
    likedComments:[],
    subscribedChannels:[]
}
const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        login:(state,action)=>{
            state.status = true,
            state.userData = action.payload.userData;
            state.likedVideos = action.payload.likedVideos;
            state.likedComments = action.payload.likedComments;
            state.subscribedChannels = action.payload.subscribedChannels;
        },
        logout:(state,action)=>{
            state.status = false,
            state.userData = null,
            state.likedComments = [],
            state.likedVideos = [],
            state.subscribedChannels = []
        },
        toggleSubscription:(state,action)=>{
            const channelId = action.payload
            if(state.subscribedChannels.includes(channelId)){
                state.subscribedChannels = state.subscribedChannels.filter((id)=> id !== channelId );
            }
            else{
                state.subscribedChannels.push(channelId)
            }
        },
        toggleVideoLike:(state,action)=>{
            const videoId = action.payload;
            if(state.likedVideos.includes(videoId)){
                state.likedVideos = state.likedVideos.filter((id)=> id!== videoId)
            }
            else{
                state.likedVideos.push(videoId)
            }
        },
        toggleCommentLike:(state,action)=>{
            const commentId = action.payload;
            if(state.likedComments.includes(commentId)){
                state.likedComments = state.likedComments.filter((id)=> id!== commentId)
            }
            else{ 
                state.likedComments.push(commentId)
            }
        }
    }
})

export default authSlice.reducer;

export const {login , logout , toggleSubscription , toggleVideoLike , toggleCommentLike} = authSlice.actions