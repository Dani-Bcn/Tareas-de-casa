/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { NavLink , useParams} from 'react-router-dom';
import {motion} from 'framer-motion'

export default function ListTasks() {
  const {id} = useParams()
  const [child, setChild] = useState(false)
  const [task, setTask] = useState(null); 
  useEffect(()=>{
    const getDataTasksChilds = async () => {
      try {      
        const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`);     
        setChild(getChild.data.data)   
      } catch (error) { 
        console.error(error); 
      } 
    }   
    getDataTasksChilds() 

    const getData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/task/`);       
            setTask(response.data.data)
        } catch (error) {
            console.error(error); 
        }
    }
    getData();   
  },[task]); 

const handleConfirm=(e)=>{
  Swal.fire({
    title: 'Are you sure to delete task?',
    showDenyButton: true,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
     handleDelete(e)
    } 
  })
} 
const handleDelete = async (e)=>{
    try{
        await axios.put(`${process.env.REACT_APP_API_URL}/child/deleteTask/${id}/${e}`)
        toast.success('Delete task !')  
    }catch(error){
        console.log(error)
    }
}

  return (
    <div>
      <motion.h2
        animate={{
          x:[-200,50,0],          
        }}
        transition={{
          duration:1
        }}
      >What tasks do you want to delete?</motion.h2> 
      <div className='containerListTasks'>
      <motion.hr 
       animate={{
        scaleX:[0,1],
        x:[-150,1]
      }}
      transition={{
        delay:0.4
      }}/>
        {child && (
          child.tasks.map((e)=>{
            return (
              <motion.div  className='cardTasks' onClick={()=>{handleConfirm(e._id)}} key={e._id}
              initial={{             
                x:-300,
                opacity:0
               }}  
              whileInView={{             
                x:0,
                opacity:1            
              }}
              transition={{
                duration:0.5,
                delay:0.4
              }}
              >
                <h3>{e.name}</h3>
                <img src={e.imageUrl}></img>  
              </motion.div>               
            )            
          })           
        )}        
      </div>   
   {child &&
     <NavLink className="containerTasksDone" to="/ListChilds"><button >Done</button> </NavLink>                   
   }
     {!task && (
          <div>
            <h2 className='noItems'>No tasks</h2>
          </div>
        )}        
      </div>
  )
}      