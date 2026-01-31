import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
function Summary({
  summary ,
  className=""
}) {
  
  return (
    <div className={` my-auto font-semibold  ${className}`}>
 <ScrollArea className=" w-full max-w-md bg-gradient-to-r from-slate-500 to-slate-800 rounded-md border p-3 text-xs">
      {summary || "Loading Summary....."}
    </ScrollArea>

    </div>
  )
}

export default Summary