import React, { useEffect ,useContext,useState} from 'react'
import './Projectcard_details.css'
import { Location } from '../../../routes/import'
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';
import img from '../../../assets/teams/7979c40b3eb344fd79e3be5a449402cc.jfif'
import word from '../../../assets/Form/svgexport-18 1.svg'
import  pdf  from '../../../assets/Form/svgexport-10 (18) 1.svg'
import rar  from '../../../assets/Form/svgexport-6 (2) 1.svg'
import attach from '../../../assets/fields/Attach.png'
import download from '../../../assets/fields/import.svg'
import { serverApi } from '../../../../App'
import Table from '../../../includes/table/Table';
import { useNavigate, useParams } from 'react-router-dom';
import eye from '../../../assets/project/bi_eye.svg'
import pen from '../../../assets/project/edit-2.svg'
import trash from '../../../assets/project/trash.svg'
import setting from '../../../assets/project/setting-2.svg'
import Table_member from '../../../includes/table_member/Table_member';
import View_attachments from '../../../components/view_attachments/View_attachments';
import { Axios } from '../../../api/Axios';




const Projectcard_details = () => {

  const {projectid} = useParams();
  
  const navigate =useNavigate()
  const server = useContext(serverApi)
  const [table_data,setTable_data] = useState([]);
  const [project,setProject] = useState([]);
  const[fetch, setFetch] = useState([]);
  const[phase_index, setPhase_index] = useState(1);
  const[active, setActive] = useState([1]);


  const fetchPost = async () => {
    try {
      await Axios({
        method: "Get",
         url: `${server}/projects`,
      }).then((res)=> {setTable_data(res.data.data.allprojects)});

     
    } catch (err) {
      console.error(err);
    }
  };
  const fetchhead = async () => {
    try {
      await Axios({
        method: "Get",
         url: `${server}/projects/${projectid}`,
      }).then((res)=> {setProject( res.data.data.project )});

     
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    fetchPost();
    fetchhead();
  },[])

 
  
  var options = {
    show:true ,
    series: [Math.floor(project?.progress)],
    chart: {
    // height: 100,
    type: 'radialBar',
    padding: 0,
    margin:0,
  },
  plotOptions: {
    track: {
      background: '#fff',
      strokeWidth: '97%',
      margin: 0, // Remove track margin
    },
    dataLabels: {
      show: false, // Hide the data labels
    },
   
    radialBar: {
      labels:{
        show:false,
        name:{
          show:false,
        },
        dataLabels:{
          name:{
            show:false
          }
        },
        total:{
          show:false,
                
        },
        value:{
            show:true ,
            fontSize:'50px',
            fontFamily:'Lato'
        }
        },
      hollow: {
        margin:0 ,
        size: '45%',
        background:'#fff',
      }
    },
  },
  colors: ['#1370E4'],
  labels: ["Progress "],
  stroke:{
    show:true,
    lineCap:'round',
    curve:'smooth'
  },
  grid: {
    show: false,
    padding: {
        top: 0,
        right: 0,
        bottom:0,
        left: 0
    },   
  
},

 
  };

 



 const th =['Task Title','Start Date','Priority','Status','End Date','Member'];
 const attributes=['title','type','start','end','status'];

  return (



    <>
    <Location main='Projects ' head='ERP Development' />

    <div className='Projectcard_details-data'  style={{margin:'3rem 0'}}>


      <div className='Projectcard_details-data_status'>
        <div className='Projectcard_details-data_status-header'>

          <h4>Project Status</h4>
          <div>
            <h4>{project.status}</h4>
          </div>

        </div>

        <div className='Projectcard_details-data_status-chart' >

          
        <ReactApexChart
          options={options}
          series={options.series}
          // stroke={options.stroke}
          grid = {options.grid}
          plotOptions={options.plotOptions}
          type="radialBar"
          height={250}
          width={250}
        />
        {/* <Chart
          options={options}
          series={options.series}
          stroke={options.stroke}
          grid = {options.grid}
          
          type="radialBar"
          height={200}
          width={200}
        /> */}
      
        </div>

      </div>


      <div className='Projectcard_details-data_information'>
        <h2>Project Information</h2>
        <div className='Projectcard_details-data_information-content'>
          <div className='Projectcard_details-data_information-content_img'>
            <img  src={project.logo} alt=''/>
          </div>
          <div className='Projectcard_details-data_information-content_list'>
            <div style={{display:'flex' ,alignItems:'center'}}><span/>  <h2>   Project Name  &nbsp; :   &nbsp; </h2>  <p>   {project.title}</p></div>
            <div style={{display:'flex' ,alignItems:'center'}}><span/>  <h2>   Start Date    &nbsp; :   &nbsp; </h2>  <p>   {project.start}</p></div>
            <div style={{display:'flex' ,alignItems:'center'}}><span/>  <h2>   End Date      &nbsp; :   &nbsp; </h2>  <p>   {project.end}</p></div>
            <div style={{display:'flex' ,alignItems:'center'}}><span/>  <h2>   Phase Number  &nbsp; :   &nbsp; </h2>  <p>   {project.phases_count} &nbsp;Phases</p></div>
            <div style={{display:'flex' ,alignItems:'center'}}><span/>  <h2>   Team Number   &nbsp; :   &nbsp; </h2>  <p>  {project.employee_count} &nbsp;Members</p></div>
       
          </div>
        </div>

      </div>
      
    </div>

    <div className=' dash__form' >
        
        <div className='dashboard_allfields_toggle'>
        {
          
          project?.phases?.map((sub,index)=>{

          return(

            <div style={{width:'50%'}} className={ active[index]&&'active'} key={sub.id}  onClick={()=> { setPhase_index(sub.id); setActive(()=>{let arr=[]; arr[index]=1; return arr } ) }}>

              <h5>{sub.title}</h5>

            </div>
          )
        })
        }
        
        </div>

        <form style={{flexDirection:'column'}}>

          <h2 style={{fontSize:'24px'}}>Make an Automatic Payment System that enable the design</h2>

          <div className='Projectcard_details-data_information-content_list' style={{flexDirection:'row' ,justifyContent:'space-between',width:'100%' }}>
            <div style={{display:'flex' ,alignItems:'center'}}><span  style={{background:'#1370E4'}} />  <h2>  Deadline  &nbsp; :   &nbsp; </h2>  <p>{project?.phases ? project?.phases[phase_index]?.end : ''} </p></div>
            <div style={{display:'flex' ,alignItems:'center'}}><span  style={{background:'#1370E4'}}/>  <h2>  Progress  &nbsp; :   &nbsp; </h2>  <p>  {project?.phases ? Math.floor(project?.phases[phase_index]?.progress) : ''}&nbsp;%</p></div>
            <div style={{display:'flex' ,alignItems:'center'}}><span  style={{background:'#1370E4'}}/>  <h2>  No.of Members   &nbsp; :   &nbsp; </h2>  <p>   {project?.phases ? project?.phases[phase_index]?.employee_count : ''}</p></div>
       
          </div>
          

          {/* <Table th={th} api='projects' res_key='allprojects'
                 attributes={attributes} eye_route='/projects/view' trash_route='/projects/Phase'  /> */}

         <Table_member th={th} api={`projects/1?phase_id=${phase_index}`} res_key='tasks'  
                      attributes={attributes}  eye_route='/projects/view' trash_route='/projects/Phase' />
                
{/*         
          <div className='dash__viewtask-attachments'>
                    <h2 className="head">URL :</h2>
                  
                        
                        <div  className='dash__viewtask-attachments_content'>
                            <div>
                              <div className='attach-head'>
                                <img src={attach} alt=''/>
                                <h3 >Document Links</h3>
                              </div>
                              <div className='dash__form-content_links'>
                                
                                { project.links?
                                        project?.links?.map((link)=>{
                                            return(
                                                <div className='dash__form-content_links-view'>
                                                    <h3>{link}</h3>
                                                </div>
                                            )
                                        })
                                        :<p>no links</p>
                                    }
                            

                              
                                  
                                  
                              </div>
                            </div>


                            <div>
                                <div className='attach-head'>
                                    <img src={attach} alt=''/>
                                    <h3 >Attachments</h3>
                                </div>
                              
                                <div className='dash__form-content_attach_upload flex' style={{gap:'25px', flexWrap:'wrap', justifyContent:'flex-start'}} >

                                    
                                    
            
                                        
                                            
                                            {project.attachments? project.attachments.map((attachment)=>{

                                              if( attachment.attachment_type == 'image'){

                                                  return(
                                                    <div className='dash__form-content_attach_upload-image' key={project.id}>
          
                                                    <div className='dash__form-content_attach_upload-image_file'>
                                                      
                                                    <img src={attachment.attachment_path} alt='attach img'/>
                                                    </div>

                                                </div>
                      
                                                  )
                                              }
                                            }):<p>no attachments</p>}
            
                                </div>
                        
                            </div>
                      

                            <div>
                                <div className='attach-head'>
                                    <img src={document} alt=''/>
                                    <h3 > Documents</h3>
                                </div>


                                <div className='attach-files'>
                                      
                                {project.attachments?  project?.attachments?.map((attachment)=>{

                                    if( attachment.attachment_type != 'image'){

                                

                                        return(

                                            <div className='attach-file'>
                                                <div>
                                                    <img src={pdf} alt='files'/>
                                                </div>
                                                <div>
                                                    <h3>Project Details</h3>
                                                    <p>20 page . 4,4 MB</p>
                                                </div>
                                                <div style={{marginLeft:'auto'}}>
                                                    <img src={download} alt=''/>
                                                </div>
                                                
                                            </div>
                                        )


                                    }
                                    }) :<p>no docs</p> }
                                  
                                </div>
                                
                              
                            </div>
                        </div>
                        
                    </div> */}


                    <View_attachments links= {project?.phases ? project?.phases[phase_index]?.links : []} 
                                       attachs ={project?.phases ? project?.phases[phase_index]?.attachments : [] }  />


         </form>
    </div>
            
  

    

        
    </>
  )
}

export default Projectcard_details