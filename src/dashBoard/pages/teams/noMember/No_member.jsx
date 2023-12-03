import React from 'react'
import './No_member.css'
import empty from '../../../assets/teams/Group 1171276220 1.svg'
import Location from '../../../includes/location/Location'
import plus from '../../../assets/Form/icons.svg'
import { Link } from 'react-router-dom';


const No_member = () => {
    return (
        <>
        <Location head='Teams'/>
        <div className='dash__create'>
      <div className='dash__create-head'>

        <h4 style={{fontSize:' 16px'}}> &nbsp; Total Teams are added</h4>
          
      </div>
       <Link to='/createmember' className='dash__create-button'>
          
          <img src={plus} alt='plus'/>
          <h2>Member</h2>
        </Link> 



        </div>
        <div className='dashboard__teams-empty'>
            <div className='dashboard__teams-empty_img'>

                  <img src={empty} alt='empty'/> 
           </div>
            <div className='dashboard__teams-empty_content'>

                <h3>No Teams has created</h3>
                <p>Click to add <Link to='/createmember'>New Member</Link></p>

            </div>

        </div>
        </>
     
    
    
     );
}
 
export default No_member;