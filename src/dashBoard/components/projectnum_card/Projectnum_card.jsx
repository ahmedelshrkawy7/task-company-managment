import React from 'react'
import './Projectnum_card.css'

const Projectnum_card = ({header,num,icon,footer,nav}) => {
   

  return (
    <div className='projectnum_card '  >
        <div className='projectnum_card-content'>
            <p>{header}</p>
            <h4><span> {num} </span>{footer}</h4>
        </div>
        <div className='projectnum_card-img'>
            <img src={icon} alt='icon'/>
        </div>
        
    </div>
  )
}

export default Projectnum_card