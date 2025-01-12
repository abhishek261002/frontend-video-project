import axios from "axios"

export class Authservice{
    
    async createAccount({username , email ,password , avatar, fullName ,coverImage}){
       try {
         const userAccount = await axios.post("/api/v1/users/register",
             {username, email ,password , avatar, coverImage, fullName})
                 .then((response)=>{
                     const data = response.data.data;
                     if(data){
                         console.log(data);
                         return this.login({...data})
                     }
                 })
        if(!userAccount){
            return null
        }
       } 
       catch (error) {
        console.log("ERROR IN CREATING ACCOUNT :: ", error);
       }
     }

    async login({username ,email ,password}){
        try {
            const loginUser = await axios.post("/api/v1/users/login",
                {email, password ,username},
                {withCredentials : true}
            )
            if(!loginUser){
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
            const currentUser = await axios.get("/api/v1/users/get-currentuser",{
                withCredentials: true
            })

            if(!currentUser){
                return null
            }
            return currentUser
        } catch (error) {
            console.log("ERROR IN GET CURRENT USER :: ",error);
            throw error;
        }
    }

    async logout(){
        try {
            return await axios.post("/api/v1/users/logout",
                {withCredentials: true}
            )
        } catch (error) {
            console.log("ERROR IN LOGOUT USER :: ",error);
            throw error;
        }
    }

}

const authservice = new Authservice();

export default authservice;
