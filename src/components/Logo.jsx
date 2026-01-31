import React from 'react'
import { Link } from 'react-router-dom'
function Logo({width = "100px"}) {
  return (
    <div>
      <Link to="/" class="flex items-center ">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span class="self-center text-xl font-semibold whitespace-nowrap text-white">
              Videostream
            </span>
          </Link>
    </div>
  )
}

export default Logo