import React from 'react'

function Container({children ,className=""}) {
  return  <div className={`w-full  mx-auto px-4 py-4 bg-black ${className}`}
  >{children}</div>;
  
}

export default Container