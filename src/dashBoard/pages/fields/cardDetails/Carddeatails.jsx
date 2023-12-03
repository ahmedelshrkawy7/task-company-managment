import axios from 'axios';
import React, { Component, useEffect,useContext } from 'react';
import { serverApi } from '../../../../App';




const Carddetails = () => {
    const server = useContext(serverApi)

    const fetchPost=async()=>{
        await axios({
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