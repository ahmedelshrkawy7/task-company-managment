import React, { useEffect,useState,useContext } from 'react';
import './T_home.css'
import Location from '../../../includes/location/Location';
import plus from '../../../assets/Form/icons.svg'
import { Link } from 'react-router-dom';
import FieldCard from '../../../components/fieldCard/FieldCard';
import { Axios } from '../../../api/Axios';
import Member_details from '../member_details/Member_details';
import { Scroll } from '../../../includes/scrollHorizantly/Scroll';
import card_icon from  '../../../assets/teams/js.svg'



const T_home = () => {
  

  const[employees, setEmployees] = useState([]);
  const[cards, setCards] = useState([]);
  const[active, setActive] = useState([]);
  const[fetch, setFetch] = useState([]);
  const[route, setRoute] =useState('employees')
  const[popup, setPopup] = useState(false)
  const[employeeId , setemployeeId] = useState();
  const scrollRef = Scroll() ;


    console.log(cards)


  const routeFun = (id)=>{
    setRoute(`subdepartments/${id}/employees`)
  }


  const fetchPost = async () => {
    try {
      await Axios({
        method: "Get",
         url: `/technologies`,
      }).then((res)=> {setFetch( res.data.data.AllTechnologies )});

     
    } catch (err) {
      console.error(err);
    }
  };
  
  const fetchEmployees=async()=>{
    try {
      await Axios({
        method: "Get",
         url: `/${route}`,
      }).then((res)=> {setEmployees( res.data.data.employees );});
     
     
    } catch (err) {
      console.error(err);
    }

  };
  const fetchCards=async()=>{
    try {
      await Axios({
        method: "Get",
         url: `/subdepartments`,
      }).then((res)=> {setCards( res.data.data.Subdepartments );});
     
     
    } catch (err) {
      console.error(err);
    }

  };

  const toggle =(toggle)=>{

    setPopup(toggle)
    
  }

  useEffect(()=> {
     fetchPost();
     fetchCards();
  }
  , [])

  useEffect(()=> {
    fetchEmployees();
   
  }
  , [route])



  
    return (

     <>
     <Location main='Teams' head=' Team work'/>
  
   
      <div className='dashboard_allfields' style={{gap:'2rem'}}>

        <form style={{padding:'1rem 1.5rem'}}>
           <div className='team_cards' ref={scrollRef}>
           {/* <div className='team_cards-card' onClick={()=>{routeFun();let ar=[]; ar[-1]=1;  setActive(ar)}}>

                <div className='team_cards-card_img'>  <img src={card_icon} alt=' card icon' />  </div>

                <div className='team_cards-card_content'> <h4>All Employee</h4>   <span></span> </div>

                {               active[-1] &&  <div className='team_cards-card_line'/>
                }                </div> */}


            {cards.map((card,index)=>{
              return(
                <div className='team_cards-card' onClick={()=>{routeFun(card.id);let ar=[]; ar[index]=1;  setActive(ar)}}>

                  <div className='team_cards-card_img'>  <img src={card_icon} alt=' card icon' />  </div>

                  <div className='team_cards-card_content'> <h4>{card.title}</h4>   <span>{card.employee_count}</span> </div>

{               active[index] &&  <div className='team_cards-card_line'/>
}                </div>
              )
            })}

            {/* <FieldCard api='subdepartments' fun={routeFun}    /> */}


          </div>

        </form>


        <form>




     

          <h6 style={{fontWeight:'700',fontSize:'16px'}}>Worked with</h6>
        
        <div className='dashboard_teams-employees'>
          {
            employees?.map((person)=>{
              
              return(
               <div onClick={()=>{setPopup(true); setemployeeId(person.id) ;console.log(person) }}>
                  <img src={person.image}  alt='user'/>
                  <p>{person.first_name}&nbsp;{person.last_name}</p>
                  <p>{person.technologies && person?.technologies[0]?.name}</p>
                  <p>{person.governorate }</p>
               </div>

              )
            })
          }

         
          </div>
        
        </form>

        <div className='dash__form-confirm'>
        <Link  type='submit' hidden>create</Link>
        <Link>back</Link>
        
      </div>
        
      </div>


      
    
        { popup && <Member_details toggle={toggle}  employeeId={employeeId} />}
    
    </> 
    );
}
 
export default T_home;