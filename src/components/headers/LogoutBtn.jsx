import React from 'react'
import { useDispatch } from 'react-redux'
import { logout as storeLogout } from '../../store/authSlice.js'
import { useNavigate } from 'react-router-dom'
import authservice from '../../services/auth.service.js'
function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async()=>{
     try {
        
           const logout = await authservice.logout();
           if(logout){
               dispatch(storeLogout())
           }
           navigate("/")
     } catch (error) {
        console.log("ERROR IN LOGGING OUT :: ",error?.message);
        throw error
     }
    }


  return (
    <button
    className='inline-block px-6 py-2 duration-200 hover:text-orange-600 rounded-full bg-black text-white font-semibold'
    onClick={handleLogout}>Logout
    </button>
  )
}

export default LogoutBtn