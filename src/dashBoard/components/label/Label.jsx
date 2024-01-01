import React from 'react'
import './Label.css'

const Label = ({text}) => {

  let color , back ;

  switch(text){
    case 'Completed':
      color = '#1370E4';
      back='#1370E41A'
    break;
    case 'medium':
      color = '#21BD1E';
      back='#04D3001A'
    break;
    case 'In Progress':
      color = '#21BD1E';
      back='#04D3001A'
    break;
    case 'Delayed':
      color = '#F24040';
      back='#FDF0F0'
    break;

     default:;
  }

  
  return (
    <div className='label' style={{backgroundColor:back}}>
        <h2 style={{color:color}}>{text}</h2>
    </div>
  )
}

export default Label