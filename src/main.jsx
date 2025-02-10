import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { RouterProvider, createBrowserRouter,} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from "./pages/Signup.jsx"
import AllVideos from './pages/AllVideos.jsx';
import Channel from './pages/Channel.jsx';
import EditProfile from './pages/EditProfile.jsx';
import Videoplayer from "./components/video/Videoplayer.jsx"
import EditVideos from './pages/EditVideos.jsx';
import VideoUpload from './pages/VideoUpload.jsx';
import Playlists from './pages/Playlists.jsx';
import PlaylistLayout from './components/playlist/PlaylistLayout.jsx';
const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children: [
      {
        path: "/",
        element:<AllVideos/>
      },
      {
        path: "/search",
        element: <AllVideos />, // Reusing AllVideos component for search
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path: "/signup",
        element:<Signup/>
      },
      {
        path: "/playlists",
        element:<Playlists/>,
      },
      {
        path: "/playlists/:playlistId",
        element: <PlaylistLayout/>
      },
      {
        path: "/users/c/:username",
        element:<Channel/>,
      },
      {
        path:"/c/:username/edit-profile",
        element: <EditProfile/>
      },
      {
          path:"/c/:username/edit-videos",
          element: <EditVideos/>
      },
      {
        path: "/video/:videoId",
        element:<Videoplayer/>,
      },
      {
        path: "/video/video-upload",
        element:<VideoUpload/>,
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
