import React from 'react'
import search from '../../assets/iconamoon_search-thin.svg'
import bell from '../../assets/notification.svg'
import user from '../../assets/Ellipse 3247.svg'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='dash__nav'>
      <div className='dash__nav-title'><h1>Dashboard</h1></div>
      <div className='dash__nav-content'>
        <div className='dash__nav-content-search'>
          <input type='text' placeholder='Search for anything'/>
          <img src={search} alt=''/>
        </div>

        <div className='dash__nav-content-bell'>
            <img  src={bell} alt=''/>
        </div>
          
          
         <div className='dash__nav-content-user'>
            <img src={user} alt=''/>
            <div className='dash__nav-content-user-name'>
              <h3>Eng Sherif</h3>
              <p>project manager</p>
            </div>
         </div>
        </div>
      </div>

  )
}

export default Navbar