import {useFormik} from 'formik'

import Location from '../../../includes/location/Location';
import React, { useEffect, useRef, useState ,useContext} from 'react'
import './CreateMember.css'
import case1 from '../../../assets/Form/briefcase.svg'
import plus from '../../../assets/Form/icons.svg'
import camera from '../../../assets/Form/solar_camera-linear.svg'
import logo1 from '../../../assets/Form/Frame 1171275978 1.svg'
import bin from '../../../assets/Form/fluent_delete-28-regular.svg'
import dollar from '../../../assets/teams/dollar-circle.svg'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { serverApi } from '../../../../App';
import Selectinput from '../../../includes/selectinput/Selectinput';
import Addinput from '../../../includes/Addinput/Addinput';


const CreateMember = () => {



  const formik = useFormik({
    initialvalue:{
     
    first_name :'' ,
    last_name: '' , 
    
    },
    onSubmit:(values)=>{
      console.log('hi')
    },

  })
    
  const server =useContext(serverApi)

  let [phone,setPhone] =useState([]) ;
  let [technology,setTechnology] =useState([]) ;
  let [selecttechnology,setSelectTechnology] =useState([]) ;
  let [images,setImages] =useState([]) ;
  let [logoImage,setlogoImages] = useState() ;

  let [positions,setPositions] = useState([]) ;
  let [worktype,setWorktype] = useState([]) ;
  let [gender,setGender] = useState([]) ;
  let [currencies,setCurrencies] = useState([]) ;
  let [departments,setDepartments] = useState([]) ;
  let [selectedDep,setSelectedDep] = useState([]) ;
  let [selectedSpec,setSelectedSpec] = useState([]) ;
  let [governorate,setGovernorate] = useState([]) ;


//   console.log(technology)
  
  let phoneInput = useRef(0);
  let techInput = useRef(0);
  let fileInput = useRef('');
  let logoImg = useRef(0);
  let submitBtn = useRef(0);

  let [data ,setData ] =  useState( { 

    first_name :'' ,
    last_name: '' , 
    experience: 'On going',
    gender_id: '2',
    position_id: '2',
    image: '',
    WorkType_id: '3',
    email:'',
    mobile:[],
    workhours:8 ,
    salary:'5000' ,
    currency_id: '1' ,
    technologies:[],
    departments:[],
    subdepartments:[],
    
  })

  console.log(data)
 


  const handleChange = (e) => {

    const value = e.target.value;
    console.log(value)

        setData({
        ...data,
        [e.target.name]: value
        });


 };
  const handleIndex = (e) => {

   const value = e.target.selectedIndex;

        setData({
        ...data,
        [e.target.name]: value
        });


 };

 const handleChangeArray=(e)=>{
    const value = e.target.value;
    const name = e.target.name;


        setData({
        ...data,
        [e.target.name]: value
        });


 }
 const updateArray =(array , name  )=>{


  setData((prev)=>{return ({ ...prev ,  [name] : [...array]})}  )
}


 

  
    useEffect(()=> {
        fetchPost();
    }
    , [])

    const fetchPost=async()=>{

        const endpoints =['positions','worktypes','genders','currencies','departments','governments','technologies']
        try {
            Promise.all(endpoints.map((endpoint) => axios.get(`${server}/${endpoint}`))).then(([{data: positions}, {data: work_type}, {data: gender}, {data: currencies},{data:departments},{data :governorate},{data:technologies}] )=> {
               setPositions(positions.data.Positions);
               setWorktype(work_type.data.Types);
               setGender(gender.data.allgenders);
               setCurrencies(currencies.data.Currencies );
               setDepartments(departments.data.Departments);
               setGovernorate(governorate.data.governorates);
               setSelectTechnology(technologies.data.Technologies)
              });
         
         
        } catch (err) {
          console.error(err);
        }
    
      };
 



//  useEffect(()=>{
//    setData( { ...data ,  attachments : [...Attachments]} )
//    ;
//  },[Attachments]);

  

  let push=(ref,inputName)=>{


     if( 1){

        switch(inputName){

            case 'phone' :
              
                let arr = [...phone, ref.current.value];
                setPhone([...phone , ref.current.value]);
                setData({...data , mobile : arr})
            break ;   


            case 'tech' :
               
                setTechnology([...technology , ref.current.value]);
                setData({...data , technologies : [...data['technologies'], ref.current.selectedIndex+1]})

            break ;    
            case 'department' :
                
                setSelectedDep([...selectedDep, ref.target.value]);

                setData({...data , departments : [...data['departments'],  ref.target.selectedIndex+1]})

            break ;    
            case 'spec' :
                
                setSelectedSpec([...selectedSpec, ref.target.value]);

                setData({...data , subdepartments : [...data['subdepartments'],  ref.target.selectedIndex+1]})

            break ;    
             
        }
    
     }
  }

  let removeLink=(index1,inputName)=>{

    switch(inputName){
        case 'phone' :
            setPhone(phone.filter(( word ,index)=>{return (index1 !== index)}))
        break ;    
        case 'tech' :
             setTechnology(technology.filter(( word ,index)=>{return (index1 !== index)}))
             setData({...data , technologies : data['technologies'].filter((word,index)=>{return(index1 !== index )   })  })

        break ;    
        case 'dep' :
             setSelectedDep(selectedDep.filter(( word ,index)=>{return (index1 !== index)}))
             setData({...data , departments : data['departments'].filter((word,index)=>{return(index1 !== index )   })  })

        break ;    
        case 'spec' :

             setSelectedSpec(selectedSpec.filter(( word ,index)=>{return (index1 !== index)}))

             setData({...data , subdepartments : data['subdepartments'].filter((word,index)=>{return(index1 !== index )   })  })
             

        break ;    
    }
     
  }


  

  const handleSubmit= async()=>{ 

    
   
    submitBtn.current.click(); 
    console.log(data); 
    await axios({
     method: "post",
     url: `${server}/employees`,
     data: data,
     headers: { "Content-Type": "multipart/form-data" },
   })
     .then(function (response) {
       console.log(response);
     })
     .catch(function (response) {
       console.log(response);  
     });
     
  }
    return (
        
        
    <>
    <Location head=' Teams'/>
    <div className='dash__form'>
      <div className='dash__form-header' >
        <img src={case1} alt='case'/>
        <p style={{color:'#fff'}}>Create New Member</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className='dash__form-logo'>
          <div  className='dash__form-logo-img'>
            <img src={logoImage? logoImage:logo1} alt='logo'/>
          </div>
          <div className='flex' style={{gap:'10px'}} onClick={()=>{logoImg.current.click() }}>
            <input name='logo' type="file" accept='image/*' hidden ref={logoImg} 
            onChange={({target:{files}})=>{setlogoImages(URL.createObjectURL(files[0])); setData( {...data ,  image :files[0]} ) }}/>
            <img src={camera} alt='camera' style={{width:'18px'}}/>
            <p>Upload Logo</p>
          </div> 
        </div>
        
        <div className='dash__form-content'>
           
            <div className='dash__form-content_details'>

            <div>
              <p>First Name</p>
              <input name='first_name' type='text'  onChange={handleChange}></input>
            </div>

            <div>
              <p>Last Name</p>
              <input name='last_name' type='text'  onChange={handleChange}></input>
            </div>

            <div>
              <p>Email</p>
              <input name='email' type='text'  onChange={handleChange}></input>
            </div>

            <div>
              <p>Phone Number</p>
              <div style={{display:'flex' ,flexDirection:'row',justifyContent:'flex-start',gap:'20px',alignItems:'center'}}>
                <input type='url' ref={phoneInput} ></input>
                <div className='addLink' onClick={()=>{push(phoneInput, 'phone')}}   ><img src={plus} alt='addlink'/></div>
              </div>
            </div>

            <div className='dash__form-content_links' style={{width: '100%'}}> 

                 { phone.map((link , index1)=>{
                
                return(

                    <div className='dash__form-content_links-link' style={{width:'100%'}} >

                        <div className='dash__form-content_links-link-a' style={{width:' 165px'}}>
                            <a href={link} target='blank'>{link}</a>
                        </div>
                        <div className='dash__form-content_links-link-icon' onClick={()=>{removeLink(index1,'phone')}}>
                            <img src={bin} alt='bin'/>
                        </div>

                    </div>
                )

                })    } 
            

            </div>

            <div>
              <p>Work Hours</p>
              <input name='workhours' type='text'  onChange={handleChange}></input>
            </div>
            
            <div>
              <p>Position</p>
              <select name='position_id' >

                {positions.map((position)=>{

                   return(
                    <option value={position.id}>{position.title}</option>
                   )

                })}
                
               
              </select>
            </div>
            
            <div>
              <p>Start date</p>
              <input name='experience' type='date' onChange={handleChange} ></input>
            </div>

            <div className='dash__form-content_details-salary'>
              <p>Salary</p>

              <div style={{position:'relative'}}>

                <input></input>
                <select  name='salary'   onChange={handleChange} >
            
                    <option value=""></option>
                {currencies.map((currency)=>{

                    return(
                    <option value={currency.id}>{currency.currency}</option>
                    )

                    })}
                                    
              </select>
            </div>
              {/* <img src={dollar} alt='dollar'/> */}

              
            </div>

            <div>
              <p>Work Type</p>
              <select name='WorkType_id' >

              {worktype.map((w)=>{

                return(
                <option value={w.id}>{w.type}</option>
                )

                })}
                            
              </select>
            </div>

            <Selectinput header='Governorate' name='government_id' data={governorate} fun={handleIndex}/>

            <div>
              <p>Gender</p>
              <select name='gender_id' >
               
              {gender.map((g)=>{

                    return(
                    <option value={g.id}>{g.gender}</option>
                    )

                    })}
              </select>
            </div>
            <div>
              <p>Department</p>
              <select name='departments' onChange={(e)=> {push(e,'department')}} >
               {departments.map((department)=>{
                return(
                    <option>{department.title}</option>
                )

               })}
                
              </select>
            </div>
            { selectedDep[0]&& <div className='dash__form-content_links' style={{width: '100%'}}>
            { selectedDep.map((link , index1)=>{
                  
                  return(

                      <div className='dash__form-content_links-link' style={{height:'40px'}} >

                          <div className='dash__form-content_links-link-a' style={{width:' 165px'}}>
                              <a href={link} target='blank'>{link}</a>
                          </div>
                          <div className='dash__form-content_links-link-icon' onClick={()=>{removeLink(index1,'dep')}}>
                              <img src={bin} alt='bin'/>
                          </div>

                      </div>
                  )

                  })    }  

            </div>}


            <div>
              <p>Specialization</p>
              <select name='subdepartments' onChange={(e)=>{push(e,'spec')}} >
                {selecttechnology.map((department)=>{
                      return(
                          <option key={department.id}>{department.name}</option>
                      )

                    })}
              </select>
            </div>
            { selectedSpec[0]&& <div className='dash__form-content_links' style={{width: '100%'}}>
            { selectedSpec.map((link , index1)=>{
                  
                  return(

                      <div className='dash__form-content_links-link' style={{height:'40px'}} >

                          <div className='dash__form-content_links-link-a' style={{width:' 165px'}}>
                              <a href={link} target='blank'>{link}</a>
                          </div>
                          <div className='dash__form-content_links-link-icon' onClick={()=>{removeLink(index1,'spec')}}>
                              <img src={bin} alt='bin'/>
                          </div>

                      </div>
                  )

                  })    }  

            </div>}


            
             <div>
              <p>Technologies</p>
              <div style={{display:'flex' ,flexDirection:'row',justifyContent:'flex-start',gap:'20px',alignItems:'center'}}>
                <select  ref={techInput}  required >
                    {selecttechnology.map((department)=>{
                    return(
                        <option key={department.id}>{department.name}</option>
                    )

                  })}
                </select>
                <div className='addLink' onClick={()=>{ push( techInput, 'tech')}}   ><img src={plus} alt='addlink'/></div>
              </div>
            </div>
           { technology[0]&&
            <div className='dash__form-content_links' style={{width: '100%'}}>
            { technology.map((link , index1)=>{
                  
                  return(

                      <div className='dash__form-content_links-link' style={{height:'40px'}} >

                          <div className='dash__form-content_links-link-a' style={{width:' 165px'}}>
                              <a href={link} target='blank'>{link}</a>
                          </div>
                          <div className='dash__form-content_links-link-icon' onClick={()=>{removeLink(index1,'tech')}}>
                              <img src={bin} alt='bin'/>
                          </div>

                      </div>
                  )

                  })    }  

            </div>}
             
        </div>
       
            
         

        </div>
         <input type='submit' value='click' /> 
      </form>
      
      <div className='dash__form-confirm'>
       <Link to ='/projects'  type='submit' onClick={()=>{handleSubmit()}}>create</Link>
        <Link>back</Link>
        
      </div>
    </div>


    </>);
}
 
export default CreateMember;