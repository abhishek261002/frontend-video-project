import React from 'react'
import {Button} from '../index.js'
import { useSelector, useDispatch } from "react-redux";
import subscriptionservice from "../../services/subscription.service.js"
import {toggleSubscription as storeToggleSub } from "../../store/authSlice.js"
function SubscribeBtn({channelId}) {

    const subscribedChannels = useSelector((state)=>(state.auth.subscribedChannels))
    const isSubscribed = subscribedChannels.includes(channelId)? true: false;
    const dispatch = useDispatch()
    const toggleSubscription = async()=>{
        try {
            const toggleSub = await subscriptionservice.toggleSubscription(channelId)
            if(toggleSub){
              console.log(toggleSub);
              dispatch(storeToggleSub(channelId))
            }
        } 
        catch (error) {
            console.log("ERROR IN TOOGLE SUB FRONTEND  :: ",error?.message);
            throw error
        }
    }



  return (<div>
    {isSubscribed?<Button onClick={toggleSubscription} bgColor="bg-gray-700" rounded="rounded-3xl" className="text-sm hover:bg-gray-400">Subscribed </Button>:
        <Button onClick={toggleSubscription} bgColor="bg-red-700" >Subscribe</Button>}
  </div>

  )
}

export default SubscribeBtn