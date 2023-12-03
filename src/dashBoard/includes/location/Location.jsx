import React from 'react'
import './Location.css'


const Location = ({main,head}) => {
  return (
    
      <div className='dash__location'>
        <div className='flex'>
         {main && <h2> {main} &nbsp;/  </h2>}
          <h2>  &nbsp; { head}</h2>
        </div>
        <div>
          <select>
            <option value="1">Last 30 day</option>
          </select>
        </div>

      </div>
    
    
  )
}

export default Location