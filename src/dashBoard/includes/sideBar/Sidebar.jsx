import React ,{useRef, useState} from 'react'
import './Sidebar.css'
  import{ icon1,icon2,icon3,icon4,icon5,icon6 ,icon7,icon8,arrowR,arrowD,logo } from './imports'
  import{Link} from 'react-router-dom'
const Sidebar = () => {
  
  
  let arr =[{img: icon1 , p:'Home'},{img:icon4 , p:'Fields',img2:arrowD ,sub1:'Department',sub2:'Specialization'},{img:icon5, p:'Teams'},{img: icon2 , p:'Projects' },{img: icon8 , p:'Projects Management ',img2:arrowD},{img:icon3 , p:'Tasks'},
  {img:icon6 , p:'Settings'}]

  const[value , setValue] = useState([]);
  const[active , setActive] = useState([]);
 

  return (
    
    <div className='dash__sidebar'>
            <div className='arrow'><img src={arrowR} alt='arrow'/></div>

      <div className='dash__sidebar-content' >
        <div className='dash__sidebar-content-logo'>
          <img src={logo} alt='logo'/>
          <div></div>
        </div>
        <div className='dash__sidebar-content-icons '>
       
          {arr.map((item,index)=>{
            return(
              <>
            <Link to={item.p} className= {value[index]?'active' : ''} onClick={()=>{setValue(()=>{let ar=[]; ar[index]=1; return ar ;  }); }}
                  key={item.index}  >
             <div className='image'> <img src={item.img} alt=''/></div>
              <p> {item.p} </p>
              <img src={item.img2?item.img2:''} alt='' style={{marginTop:'7px'}}/>
              
            </Link>
            <div className={value[index]&&item.sub1? 'sub' :'hide'}>
             <div className={active[0]?'active1':''} onClick={()=>{setActive([1,0])}}> <Link to={item.sub1}>{item.sub1  }</Link></div>
             <div className={active[1]?'active1':''} onClick={()=>{setActive([0,1])}}> <Link to={item.sub2}>{item.sub2  }</Link></div>
             {/* <div className={}> <Link to={item.sub2}>{item.sub2  }</Link></div> */}
            </div>
            </>
            )
          })}

        </div>
      </div>
      <div className='dash__sidebar-card'>
        <img src={icon7} alt=''/>
        <div>
          <h2>Need help ?</h2>
          <p>Please check our docs</p>
        </div>
        <button>DOCUMENTATION</button>

      </div>

    </div>
  )
}

export default Sidebar