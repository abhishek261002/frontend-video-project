import axios from "axios"
import { BASE_URL } from "../conf/conf.js"

axios.defaults.withCredentials= true;

export class SubscriptionService{

    async subscribedChannels(){
       try {
         const subsChannels = await axios.get(`${BASE_URL}/get-subscribed-channels`);
         if(!subsChannels){
            return null
         }
         return subsChannels.data?.data
       } 
       catch (error) {
        console.log("ERROR IN FETCHING ALL SUBSCRIBED CHANNELS :: ",error?.message);
        throw error;
       }
    } 

    async toggleSubscription(channelId){
         try {
            const toggle = await axios.post(`${BASE_URL}/subscription/c/${channelId}/toggle-subscription`)
            if(!toggle){
               return null
            }
            return toggle.data?.data   
         } 
         catch (error) {
            console.log("ERROR IN TOGGLE SUBSCRIPTION :: ",error?.message);
            throw error
         }
    }
}


const subscriptionservice = new SubscriptionService();

export default subscriptionservice