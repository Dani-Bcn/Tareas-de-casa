import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import {motion} from 'framer-motion'
import { NavLink , useParams} from 'react-router-dom';

export default function ListTasks() {
  //Tenemos el id porque ya estamos en la página con la ruta id del child
  const {id} = useParams()
  const [child, setChild] = useState(null)
  const [task, setTask] = useState(null); 
  const[noRepaeatTasks, setNoRepeatTasks] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/task/`);       
        setTask(response.data.data)
      } catch (error) {
        console.error(error); 
      }
    }
    getData();
  }, []); 
useEffect(()=>{
 const getDataTasksChilds = async () => {
    try {      
      const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`);                
      getChild.data.data.tasks.map((e)=> noRepaeatTasks.push(e._id))
      setChild(getChild.data.data)                  
    } catch (error) { 
      console.error(error); 
    } 
  } 
getDataTasksChilds()
},[])
  const handleAddTask = async (e) =>{   
  if(noRepaeatTasks.includes(e)){         
    }else{  
        try{   
          await axios.put(`${process.env.REACT_APP_API_URL}/child/addTask/${id}/${e}`)  
          toast.success('Add new task !')    
          noRepaeatTasks.push(e)
        }catch(error){ 
      console.log(error)
    } 
  } 
}
return (
 
     <div >   
   {child && <h4> Add tasks to {child.name} for today</h4>}
   <hr />
      {task && (
        <div className='containerListTasks'> 
          {task.map((ele)=>(                     
            <motion.div key={ele._id} className='cardTasks'
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
            }}>
              <h2> {ele.name}</h2>         
              <img src={ele.imageUrl} onClick={()=>handleAddTask(ele._id)} width="100" alt="image"/>
              <h2>Points  {ele.points}</h2>
              </motion.div>             
            ))}            
        </div>
        )}
        <NavLink to={`/InfoChild/${id}`}><button>Save tasks</button> </NavLink>   
   
     {!task && (
      <div>
        <h2 className='noItems'>No tasks</h2>
      </div>
    )}
 </div>
  )
}      