import React, { useState } from 'react';
import './Setting.css'
import Location from '../../includes/location/Location';
import Addform from '../../includes/Addform/Addform'



const Settings = () => {
    const [settings, setSettings] = useState()
    const [style, setStyle] = useState([])


    const handleStyle=(i)=>{
        let arr =[]
        arr[i]=1 ;
        setStyle(arr)
    }

    return ( 
        <div className='dash__settings'>
        <Location head='Settings' />
        <div className='dash__buttons '>
          
            <div className={style[0]?'clicked':''} onClick={()=>{setSettings(['position', 'junior','positions','title']);handleStyle(0)}}>Add Position</div>
            <div className={style[1]?'clicked':''} onClick={()=>{setSettings(['Work Type', 'Onsite','worktypes','type']);handleStyle(1)}}>Add Work Type</div>
            <div className={style[2]?'clicked':''} onClick={()=>{setSettings(['Gender', 'Male','genders','gender']);handleStyle(2)}}>Add Gender</div>
            <div className={style[3]?'clicked':''} onClick={()=>{setSettings(['Currency', 'EGP','currencies','currency']);handleStyle(3)}}>Add Currency</div>

        </div>



        {settings &&   <Addform header={settings[0]}  placeholder ={settings[1]} api={settings[2]} arrName={settings[3]} />}


      
        </div>
   
    );
}
 
export default Settings;


