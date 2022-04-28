import React from 'react'
import './PageNotFound.css'
function PageNotFound() {
    
    

  return (
    <div className='pageNotFoundBox flex space-center align-items-center'>
        <div className="pageNotFound ">
            <span className='flex space-center align-items-center'>404</span>
            <span className='flex space-center align-items-center'>page not found</span>
        </div>
        <img src="/image/weep.gif" alt="" />
    </div>
  )
}

export default PageNotFound