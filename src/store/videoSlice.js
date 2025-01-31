import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    allVideos : [],
}

const videoSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
      setVideos: (state, action) => {
        state.allVideos = action.payload;
      },
      addVideo: (state, action) => {
        state.allVideos.push(action.payload);
      },
      removeVideo: (state, action) => {
        state.allVideos = state.allVideos.filter(video => video.id !== action.payload);
      },
    },
  });

export const { setVideos, addVideo, removeVideo } = videoSlice.actions;
export default videoSlice.reducer;
