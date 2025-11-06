// src/config.js
export const BASE_URL = "http://localhost:8000/api/v1";

export const API_ENDPOINTS = {
    //user
  REGISTER: `${BASE_URL}/users/register`,
  LOGIN: `${BASE_URL}/users/login`,
  LOGOUT: `${BASE_URL}/users/logout`,
  GET_CURRENT_USER: `${BASE_URL}/users/get-currentuser`,

  //video
  UPLOAD_VIDEO: `${BASE_URL}/video/video-upload`,
  DELETE_VIDEO: `${BASE_URL}/video/video-delete`,
  ALL_VIDEOS : `${BASE_URL}/video/all-videos`,
  EDIT_VIDEO: `${BASE_URL}/video/edit-video`,
  STREAM_VIDEO: `${BASE_URL}/video/stream-video`,
  GET_CHANNEL_VIDEOS: `${BASE_URL}/video/c/:username`,
  PUSH_VIDEO_TO_WATCH_HISTORY: `${BASE_URL}/video/watch-history`,
  TOGGLE_IS_PUBLISHED: `${BASE_URL}/video/c/:videoId`,

  
};
