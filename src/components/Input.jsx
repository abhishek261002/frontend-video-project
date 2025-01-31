import React,{useId}  from 'react'

const Input=React.forwardRef( function Input({label,
  bgColor="bg-white",  
  type="text",
  className = "",
  labelColor,
  ...props
    }, ref)
  {
    const id = useId();
    return(
      <div className='w-full'>
        {label && <label className={`inline-block mb-1 pl-1 ${labelColor}`}
        htmlFor={id}>
          {label}</label>}

          <input type={type}
            ref={ref}
            id={id}
            className={`px-3 py-2 rounded-lg  text-black outline-none ${bgColor} focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            {...props}
          />
      </div>
      
    )
  })

export default Input