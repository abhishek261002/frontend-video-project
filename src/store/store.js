import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./authSlice.js"
import videoreducer from "./videoSlice.js"
const store = configureStore({
    reducer:{
        auth : authreducer,
        videos : videoreducer
    } 
})

export default store;