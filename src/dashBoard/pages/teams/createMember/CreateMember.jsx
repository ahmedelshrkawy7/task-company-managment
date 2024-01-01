
import Location from '../../../includes/location/Location';
import React, { useEffect, useRef, useState ,useContext} from 'react'
import './CreateMember.css'
import case1 from '../../../assets/Form/briefcase.svg'
import plus from '../../../assets/Form/icons.svg'
import camera from '../../../assets/Form/solar_camera-linear.svg'
import logo1 from '../../../assets/Form/Frame 1171275978 1.svg'
import bin from '../../../assets/Form/fluent_delete-28-regular.svg'
import dollar from '../../../assets/teams/dollar-circle.svg'
import { Link, useNavigate } from 'react-router-dom'
import Selectinput from '../../../components/selectinput/Selectinput'
import { Axios } from '../../../api/Axios';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { notify,error } from '../../../notifications/Toast';


const CreateMember = () => {




  let [phone,setPhone] =useState([]) ;
  let [technology,setTechnology] =useState([]) ;
  let [selecttechnology,setSelectTechnology] =useState([]) ;
  let [logoImage,setlogoImages] = useState() ;

  let [positions,setPositions] = useState([]) ;
  let [worktype,setWorktype] = useState([]) ;
  let [gender,setGender] = useState([]) ;
  let [currencies,setCurrencies] = useState([]) ;
  let [departments,setDepartments] = useState([]) ;
  let [selectedDep,setSelectedDep] = useState([]) ;
  let [selectedSpec,setSelectedSpec] = useState([]) ;
  let [governorate,setGovernorate] = useState([]) ;


  
  let phoneInput = useRef(0);
  let techInput = useRef(0);
  let logoImg = useRef(0);
  let submitBtn = useRef(0);
  let currency = useRef(0);

  const navigate  = useNavigate()

  const validationSchema = Yup.object().shape({
 
    first_name: Yup.string('first_name shuold be string').required('first_name is required *'),
  
  });


  const formik = useFormik({
    initialValues:{
      first_name :'' ,
      last_name: '' , 
      experience: '',
      gender_id: '',
      position_id: '',
      image: '',
      WorkType_id: '',
      email:'',
      mobile:[],
      workhours: '' ,
      salary:'' ,
      currency_id: '' ,
      technologies:[],
      departments:[],
      subdepartments:[],
    },
    validationSchema:validationSchema,

    onSubmit:(values)=>{
      console.log(values)
      console.log('values')
      handleSubmit();
      // navigate('/projects/projectlist')
      
    }
  })

 

  


//   const handleChange = (e) => {

//     const value = e.target.value;
//     console.log(value)

//         setData({
//         ...data,
//         [e.target.name]: value
//         });


//  };
  const handleIndex = (e) => {

   let index = e.target.childNodes[e.target.selectedIndex].getAttribute('name')

   console.log(e.target.name);

   formik.setFieldValue( [e.target.name], index)


        // setData({
        // ...data,
        // [e.target.name]: value
        // });


 };
  const handleIndexes = (e) => {

    const name = e.target.name
    const index =e.target.selectedIndex
    const id = e.target.childNodes[index].getAttribute('name')

   formik.setFieldValue( [name], [...formik.values[name],id])
        

 };

//  const handleChangeArray=(e)=>{
//     const value = e.target.value;
//     const name = e.target.name;


//         setData({
//         ...data,
//         [e.target.name]: value
//         });


//  }
//  const updateArray =(array , name  )=>{


//   setData((prev)=>{return ({ ...prev ,  [name] : [...array]})}  )
// }


 

  
    useEffect(()=> {
        fetchPost();
    }
    , [])

    const fetchPost=async()=>{

        const endpoints =['positions','worktypes','genders','currencies','departments','governments','technologies']
        try {
            Promise.all(endpoints.map((endpoint) => Axios.get(`/${endpoint}`))).then(([{data: positions}, {data: work_type}, {data: gender}, {data: currencies},{data:departments},{data :governorate},{data:technologies}] )=> {
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
                formik.setFieldValue('mobile',arr)
                phoneInput.current.value =''
            break ;   


            case 'tech' :
               
                setTechnology([...technology , ref.current.value]);

                // setData({...data , technologies : [...data['technologies'], ref.current.selectedIndex]})

            break ;    
            case 'department' :
                
                setSelectedDep([...selectedDep, ref.target.value]);


                // setData({...data , departments : [...data['departments'],  ref.target.selectedIndex]})

            break ;    
            case 'spec' :
                
                setSelectedSpec([...selectedSpec, ref.target.value]);

                // setData({...data , subdepartments : [...data['subdepartments'],  ref.target.selectedIndex]})

            break ;    
             
            default:;
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
             
             formik.setFieldValue('technologies',formik.values.technologies.filter((word,index)=>{return(index1 !== index )   }))

        break ;    
        case 'dep' :
             setSelectedDep(selectedDep.filter(( word ,index)=>{return (index1 !== index)}))
             formik.setFieldValue('departments',formik.values.departments.filter((word,index)=>{return(index1 !== index )   }))



        break ;    
        case 'spec' :

             setSelectedSpec(selectedSpec.filter(( word ,index)=>{return (index1 !== index)}))
             formik.setFieldValue('subdepartments',formik.values.subdepartments.filter((word,index)=>{return(index1 !== index )   }))

        break ; 
        
        default:;
    }
     
  }


  

  const handleSubmit= async()=>{ 

    
   
    await Axios({
     method: "post",
     url: `/employees`,
     data: formik.values,
   })
     .then(function (response) {
       notify('Member created successfully')
     })
     .catch(function (response) {
       error('Server Error')
     });
     
  }
    return (
        
        
    <>
    <Location head='Add Employee' main='Teams'/>
    <div className='dash__form'>
      <div className='dash__form-header' >
        <img src={case1} alt='case'/>
        <p style={{color:'#fff'}}>Create New Member</p>
      </div>
      <form onSubmit={formik.handleSubmit} >
        <div className='dash__form-logo'>
          <div  className='dash__form-logo-img'>
            <img src={logoImage? logoImage:logo1} alt='logo'/>
          </div>
          <div className='flex' style={{gap:'10px'}} onClick={()=>{logoImg.current.click() }}>
            <input name='logo' type="file" accept='image/*' hidden ref={logoImg} 
            onChange={({target:{files}})=>{setlogoImages(URL.createObjectURL(files[0])); formik.setFieldValue('image',files[0]) }}/>
            <img src={camera} alt='camera' style={{width:'18px'}}/>
            <p>Upload Logo</p>
          </div> 
        </div>
        
        <div className='dash__form-content'>
           
            <div className='dash__form-content_details'>

            <div>
              <p>First Name</p>
              <input name='first_name' type='text'  onChange={formik.handleChange} onBlur={formik.handleBlur}placeholder='First Name'></input>
              <span className='error'>{formik.touched.first_name && formik.errors.first_name}</span>
            </div>

            <div>
              <p>Last Name</p>
              <input name='last_name' type='text'   onChange={formik.handleChange}onBlur={formik.handleBlur}placeholder='Last Name'></input>
              <span className='error'>{formik.touched.last_name && formik.errors.last_name}</span>

            </div>

            <div>
              <p>Email</p>
              <input name='email' type='text'  onChange={formik.handleChange}onBlur={formik.handleBlur}placeholder='Email'></input>
              <span className='error'>{formik.touched.email && formik.errors.email}</span>

            </div>

            <div>
              <p>Phone Number</p>
              <div style={{display:'flex' ,flexDirection:'row',justifyContent:'flex-start',gap:'20px',alignItems:'center'}}>
                <input type='text' ref={phoneInput} placeholder='Phone Number' ></input>
                <div className='addLink' onClick={()=>{push(phoneInput, 'phone')}}   ><img src={plus} alt='addlink'/></div>
              </div>
            </div>
{phone[0]&&
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
}
            <div>
              <p>Work Hours</p>
              <input name='workhours' type='text'   onChange={formik.handleChange} onBlur={formik.handleBlur}placeholder='Work Hours'></input>
              <span className='error'>{formik.touched.workhours && formik.errors.workhours}</span>
            </div>
            
            <div>
              <p>Position</p>
              <select name='position_id' onChange={formik.handleChange} >

                <option selected hidden>-- select position --</option>
                {positions.map((position)=>{
                   return(
                    <option value={position.id}>{position.title}</option>
                   )

                })}
                
               
              </select>
            </div>
            
            <div>
              <p>Start date</p>
              <input name='experience' type='date'  onBlur={formik.handleChange} ></input>
            </div>
          

            <div className='dash__form-content_details-salary'>
              <p>Salary</p>

              <div style={{position:'relative'}}>

                <input name='salary' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Salary' onClick={()=>{currency.current.click()}}></input>
                <span className='error'>{formik.touched.salary && formik.errors.salary}</span>
                <select  name='currency_id'    onBlur={formik.handleChange}  ref={currency} >
                <option selected hidden>- EGP -</option>

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
              <select name='WorkType_id' onChange={formik.handleChange} >

              {worktype.map((w)=>{

                return(
                <option value={w.id}>{w.type}</option>
                )

                })}
                            
              </select>
            </div>

            <div>
              <Selectinput header='Governorate' name='government_id' data={governorate} fun={handleIndex}/>

            </div>


            <div>
              <p>Gender</p>
              <select name='gender_id' onBlur={formik.handleChange} >
               
              {gender.map((g)=>{

                    return(
                    <option value={g.id}>{g.gender}</option>
                    )

                    })}
              </select>
            </div>
              <div>
              <p>Address</p>
              <input name='address' type='text'  onChange={formik.handleChange}onBlur={formik.handleBlur} placeholder='Address' ></input>
            </div>
            <div>
              <p>Department</p>
              <select name='departments' onChange={(e)=> {push(e,'department');handleIndexes(e)}} >

              <option selected hidden>-- select Department --</option>

               {departments.map((department)=>{
                return(
                    <option name={department.id}>{department.title}</option>
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
              <select name='subdepartments' onChange={(e)=>{push(e,'spec');handleIndexes(e)}} >
              <option selected hidden>-- select Specialization --</option>

                {selecttechnology.map((department)=>{
                      return(
                          <option name={department.id}>{department.name}</option>
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
                <select name='technologies'  ref={techInput} onChange={(e)=>{ push( techInput, 'tech');handleIndexes(e)}}  >
                <option selected hidden>-- select Technology --</option>

                    {selecttechnology.map((department)=>{
                    return(
                        <option name={department.id}>{department.name}</option>
                    )

                  })}
                </select>
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
         <input type='submit' ref={submitBtn}  hidden/> 
      </form>
      
      <div className='dash__form-confirm'>
       <Link    onClick={()=>{submitBtn.current.click()}}>create</Link>
        <Link>back</Link>
        
      </div>
    </div>


    </>);
}
 
export default CreateMember;