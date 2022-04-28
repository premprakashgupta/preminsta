import React, { useEffect } from 'react'
import './Status.css'

import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import statusdata from '../../Statusdata'

function Status() {
  
    
  return (
    <>
      <div className="status_box">
         <span id="left"> <ChevronLeft/></span>
         <span id="right"><ChevronRight/></span>
          <div className="status" id="status">
              <ul>
                { 
                statusdata.map(element=>(
                    <li key={element.statusImg}>
                    <span className="statusimg_background">
                        <img src={element.statusImg} alt=""/>
                    </span>
                     
                     <span className="status_name">{element.statusUser}</span>
                 </li>
                ))
                
                 }
                 
                  
              </ul>
          </div>
      </div>
    </>
  )
}

export default Status