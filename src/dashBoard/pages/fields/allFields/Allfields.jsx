import React,{useEffect, useState,useContext} from 'react'
import './Allfields.css'
import Location from '../../../includes/location/Location';
import dots from '../../../assets/fields/more.svg'
import user from '../../../assets/fields/solar_user-rounded-linear.svg'
import cardimg from '../../../assets/fields/Ellipse 3260.svg'
import Personcard from '../../../components/personCard/Personcard';
import { useParams } from 'react-router-dom';
import plus from '../../../assets/Form/icons.svg'
import { Link } from 'react-router-dom'
import { serverApi } from '../../../../App';
import { Axios } from '../../../api/Axios';


const Allfields = () => {

  const {id}= useParams();
  const[fetch, setFetch] = useState([]);
  const[employees, setEmployees] = useState([]);
  const[index, setIndex] = useState(0);
  const[active, setActive] = useState([1]);
  const[in1 , setI] = useState();
  

  function request(){
      
  }
  const fetchPost = async () => {
    try {
      await Axios({
        method: "Get",
         url: `/departments/${id}/subdepartments`,
      }).then((res)=> {setFetch( res.data.data.specializations )});

     
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEmployees=async()=>{
    try {
      await Axios({
        method: "Get",
         url: `/technology-employees/${in1}`,
      }).then((res)=> {setEmployees( res.data.data.Employees );});
     
     
    } catch (err) {
      console.error(err);
    }

  };

  useEffect(()=> {
    fetchPost();
    fetchEmployees();
   
  }
  , [in1])

  return (
    <>
    <Location main='Fields' head='Specialization'/>
    <div className='dash__create'>
      <div className='dash__create-head'>

        <h4 ><span>{fetch.length}</span> Total Specialization are added</h4>
          
      </div>
      <Link to='/specialization' className='dash__create-button'>
          
          <img src={plus} alt='plus'/>
          <h2>Specialization</h2>
        </Link>
    </div>


    <div className='dashboard_allfields'>
  

      <div className='dashboard_allfields_toggle'>
       {
        
       fetch.map((sub,index)=>{
        
        
        return(

          <div className={ active[index]? 'active':''} key={sub.id}  onClick={()=> { setIndex(index); setActive(()=>{let arr=[]; arr[index]=1; return arr } ) }}>

            <h5>{sub.title}</h5>
             <p>{fetch.length} Technologies</p>
          </div>
        )
       })
       }
       
      </div>

      <form>
        <div className='dashboard_allfields-technology'>
        
          {
           fetch[index]?.technologies.map((sub)=>{
               

            return(
           <div className='dashboard_allfields-technology-card' key={sub.id} onClick={()=>{setI(sub.id)}}>
              <div className='img'>
                <img src={sub.logo} alt='cardImg'/>
              </div>
              <div className='dashboard_allfields-technology-card_content'>
                  <div>
                    <h6>{sub.name}</h6>
                    <img src={dots} alt='dots'/>
                  </div>
                  <div style={{gap:'10px'}}>
                    <img src={user} alt='user'/>
                    <p> {sub.employees_count}</p>
                  </div>
            </div>
            

          </div>
            )
          })

          }
          
         
        </div>
        <div className='dashboard_allfields-employees'>
         {
          employees?.map((person)=>{
            return(
              <Personcard name ={person.first_name} experience ={person.experience }
              position ={person.position} image={person.image}
              key={person.id}
              />
            )
          })
         }
         
        </div>
      </form>
      <div className='dash__form-confirm'>
        <Link  type='submit' hidden>create</Link>
        <Link to='/Department'>back</Link>
        
      </div>
    </div>
    </>
  )
}

export default Allfields