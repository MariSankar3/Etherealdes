import React from 'react'

function Common_Layout({title,img,details}) {
  return (
    <div className='flex flex-col w-full'>
        <div className='flex '>
            {title}
            {img}
        </div>
        {details}
    </div>
  )
}

export default Common_Layout