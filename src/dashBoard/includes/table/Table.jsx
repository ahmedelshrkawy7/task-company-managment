import React, { useContext, useEffect, useState} from 'react'
import eye from '../../assets/project/bi_eye.svg'
import pen from '../../assets/project/edit-2.svg'
import trash from '../../assets/project/trash.svg'
import setting from '../../assets/project/setting-2.svg'
import { Link, useNavigate } from 'react-router-dom';
import { Axios } from '../../api/Axios'
import Label from '../../components/label/Label'

 

  
const Table = ({th,api,res_key,attributes,eye_route,trash_route}) => {

    
  const [projects,setProjects] = useState([]);
  const navigate = useNavigate();


  const fetchPost = async () => {
    try {
      const response = await Axios({
        method: "Get",
         url: `/${api}`,
      });
      setProjects(response.data.data[res_key]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=> {
    fetchPost();
  }
  , [])



  return (
   
    <div className='project_table' >
      <table >
        <tr className='project_table-head'>

          {th?.map((th)=>{
            return(
              <th>{th}</th>
            )
          })}
         
        </tr>
       
       {projects?.map((project)=>{
        
       
        return(
          <tr className='project_table-body'>
             <td style={{fontWeight:'600'}}>{project['title']}</td>

            {attributes?.map((attribute)=>{
                return(
                    <td>{project[attribute]}</td>
                )
            })

            }
              <td><Label text={project['status']}/></td>

          <td className='project_table-body_icons'>
            <img src={eye} alt='eye'onClick={()=>{navigate(`${eye_route}/${project.id}`)}} />
            <img src={pen} alt='pen'/>
            <img src={trash} alt='trash'/>
            <img src={setting} alt='setting' onClick={()=>{navigate(`${trash_route}/${project.id}`)}}/>
          </td>
          

          </tr>
        )
       })}
         
        


      </table>

      
      {/* <div className='dash__form-confirm'>
       <Link to ='/projects/projectlist'  type='submit' hidden>create</Link>
       <Link to ='/projects'>back</Link>
        
      </div> */}
    </div>

  )
}

export default Table