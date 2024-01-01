import React, { Component, useEffect,useContext } from 'react';
import { serverApi } from '../../../../App';
import { Axios } from '../../../api/Axios';




const Carddetails = () => {
    const server = useContext(serverApi)

    const fetchPost=async()=>{
        await Axios({
            url: `${server}/subdepartments`,
            method:'Get' ,

        }).then((res)=> console.log(res))

    }

    useEffect(()=>{
        fetchPost();
    },[])

    return (  

        <></>
    );
}
 
export default Carddetails;