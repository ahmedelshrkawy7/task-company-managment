import React, { useContext, useEffect, useState} from 'react'
import eye from '../../assets/project/bi_eye.svg'
import pen from '../../assets/project/edit-2.svg'
import trash from '../../assets/project/trash.svg'
import setting from '../../assets/project/setting-2.svg'
import axios from 'axios'
import { serverApi } from '../../../App'
import { Link, useNavigate } from 'react-router-dom';




const Table_member = ({th,api,res_key, attributes}) => {

    const [data,setData] = useState([]);
    console.log("🚀 ~ file: Table_member.jsx:16 ~ data:", data)
  const navigate = useNavigate();
  const server = useContext(serverApi)


  const fetchPost = async () => {
    try {
      const response = await axios({
        method: "Get",
         url: `${server}/${api}`,
      });
      setData(response.data.data[res_key]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=> {
    fetchPost();
  }
  , [api])



  return (

    <div className='project_table'>
            <table >
                    <tr className='project_table-head'>

                        { th?.map((cell)=>{
                            return(

                                <th>{cell}</th>
                            )
                        })

                        }

                        <th>Actions</th>
                    
                    </tr>
                    
                    {data?.map((cell)=>{
                    
                    
                    return(
                        <tr className='project_table-body'>

                            
    
                            <td>{cell.title}</td>
                            <td>{cell.phase_name}</td>
                            <td>{cell.title} </td>
                            <td>{cell.status} </td>
                            <td>{cell.priority}</td>
                            <td style={{display:'flex' , justifyContent:'space-around'}}> <img src='' alt='image' style={{width:'32px' ,height:'32px',borderRadius:'50%' }}/>      {cell.employee.first_name}&nbsp;{cell.employee.last_name}</td>
                           
                           
                           
                            <td className='project_table-body_icons'>
                            <img src={eye} alt='eye'onClick={()=>{navigate(`/Task Management/list/view`)}} />
                            <img src={pen} alt='eye'/>
                            <img src={trash} alt='eye'/>
                            <img src={setting} alt='eye' onClick={()=>{navigate(`/projects/Phase/${cell.id}`)}}/>
                            </td> 
                        

                        </tr>
                    )
                    })}
                    
                    


            </table>
    </div>
  )
}

export default Table_member