/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import {motion} from 'framer-motion';
import Swal from 'sweetalert2';
import { NavLink }from 'react-router-dom'

export default function ListTasks() {
const [refresh, setRfresh] = useState(false)
  const [task, setTask] = useState(null); 
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/task/`);       
        setTask(response.data.data)
        console.log(response.data)
      } catch (error) {
        console.error(error); 
      }
    }
    getData();
  }, [refresh])

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

  const handleDelete= async(e)=>{  
    console.log(e)
    setRfresh(!refresh)
      try {      
        await axios.delete(`${process.env.REACT_APP_API_URL}/task/${e}`);
       toast.success('Delete task !')  
      } catch (error) { 
        console.error(error); 
      }   
  }
  return (
  <motion.div className='tasksBack'
  animate={{
    opacity:[0,1]
  }}
  transition={{
    duration:1
  }}>
      <NavLink to="/CreateTask">
        <motion.button className='butt'
            animate={{
              x:[-100,50,0],          
            }}
            transition={{
              duration:1
            }}
        ><h4>Create task</h4></motion.button>
        </NavLink>      
          <motion.hr 
            animate={{
              scaleX:[0.2,1],
              x:[-150,1]
            }}
         />      
      {task && (
        <div className='containerListTasks' > 
          {task.map((ele)=>(
            <motion.div key={ele._id}className='cardTasksEdit'         
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
              delay:0.5
            }}          
            >
              <h3> {ele.name}</h3>        
              <img src={ele.imageUrl}/>     
              <h2>Points  {ele.points}</h2>
                <NavLink to={`/EditTask/${ele._id}`}><button>Edit task</button></NavLink> 
              <button onClick={()=>handleConfirm(ele._id)}>Delete task</button>                   
            </motion.div>             
          ))}       
        </div>)} 
        {!task && (
          <div>
            <h2 className='noItems'>No tasks</h2>
          </div>
        )}
    </motion.div>
  )
}      