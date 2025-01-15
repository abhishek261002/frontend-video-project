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
        path:"/login",
        element:<Login/>
      },
      {
        path: "/signup",
        element:<Signup/>
      },
      {
        path: "/users/c/:username",
        element:<Channel/>
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
