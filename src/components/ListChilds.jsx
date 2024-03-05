/* eslint-disable array-callback-return */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink ,useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion'

export default function ListChilds() {
const storedToken = localStorage.getItem('authToken');
let isChilds = false
const navigate = useNavigate()
const [childs, setChilds] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/child/mine`, { headers: { Authorization: `Bearer ${storedToken}` }});
        setChilds(response.data.data)
        console.log(childs)
      } catch (error) {
        console.error(error);
      }
  }
    getData();
  }, []);  
  if(childs.length !== 0){
    isChilds=true 
   
  }else{
    isChilds=false
     console.log(childs)
  }  
  return (
    <motion.div    
    animate={{
      opacity:[0,1]
    }}
    transition={{
      duration:1
    }}>    
      <motion.h4 
          animate={{
            x:[-100,50,0],
            opacity:[0.2,1]            
          }}
          transition={{
            duration:1
          }}
      >Parent's section</motion.h4>
      <motion.hr 
       animate={{
        scaleX:[0,1],
        x:[-150,1]
      }}
      transition={{
        delay:0.2
      }}/>        
      {isChilds && (
        <motion.div className='containerListTasks'        
        animate={{
          x:[200,-50,0],
          borderRadius: ["10%", "100%"],
          opacity:[0.2,1]
        }}
        transition={{
          duration:1
        }}        
        >     
         {childs.map((ele)=>(
          <NavLink key={ele._id} className="cardChildInfo"to={`/InfoChild/${ele._id}`}>                                            
            <h5>Info</h5>
            <img  src={ele.imageUrl} width="100" alt="imgchild" />    
            <h3>{ele.name}</h3>  
          </NavLink>
         ))}       
        <button onClick={()=>navigate("/AddChild")}><h4>Add child</h4></button>           
        </motion.div>
        )}    
         {!isChilds &&(
      <motion.div className='marginPage'
      animate={{
        x:[100,-50,0],
        opacity:[0,1]
      }}
      transition={{
        duration:1
      }}>
        <h4>We don't have children yet, let's add them</h4> 
       <button onClick={()=>navigate("/AddChild")}><h4>Add child</h4></button>      
      </motion.div>        
    ) }         
    </motion.div>
  )
}

        
 