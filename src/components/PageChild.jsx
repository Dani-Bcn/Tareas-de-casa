import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion'

export default function PageChild() {
const navigate = useNavigate()
const {id} = useParams() 
const [child, setChild] = useState(null);
const [points, setPoints] = useState(0)
const [done, setDone] = useState(true)
const [opacity, setOpacity] = useState(1)
let isTasks
const textCongratulations =
[
  "Congratulations, you have achieved 30 more points !",
  "Congratulations, keep it up !",
  "Today you are doing well !",
  "Well done !",
  "You are doing great !",
  "You're the best !",
  "Mom will be very fifty with you !",
]
const random = Math.floor(Math.random() * textCongratulations.length)
const handleTaskDone = async (objectTask)=>{ 
  setOpacity(0)
  Swal.fire({
    icon: 'success',
    title: textCongratulations[random],
    showConfirmButton: false,
    timer: 1000
  })
  try{  
      await axios.put(`${process.env.REACT_APP_API_URL}/child/addPoints/${id}/${objectTask._id}`)       
      setPoints(!points)        
  }catch(error){
    console.log(error)
  }    
  if(child.tasks.length === 0 ){
    setDone(false)
  }   
}   
useEffect(() => {
  const getData = async () => {
    try {      
      const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`);                     
       setChild(getChild.data.data)       
    } catch (error) { 
      console.error(error);  
    } 
  }  
  getData()  
},[points])

const playAnimation=(()=>{
  setOpacity(0) 
})  
{child && (
  child.tasks.length === 0 ?isTasks= false:isTasks=true
)}
console.log(isTasks)
return (
  <motion.div 
  animate={{
    y:[100,0],
    opacity:[0,1] 
  }}  
  >      
    
    <motion.h4
          animate={{
            x:[-200,50,0],          
          }}
          transition={{
            duration:1
          }}
          >Children's tasks</motion.h4> 
          <motion.hr 
            animate={{
              scaleX:[0,1],
              x:[-150,1]
            }}
            transition={{
              delay:0.2
            }}/>
      {child && (
        <div>       
          <motion.div className='cardPageChild'>         
            <motion.img onClick={()=>playAnimation()} src={child.imageUrl}/>            
            <h1 >{child.name}</h1>                      
              <pre>Points    {child.points}</pre>
              <pre>Cups        {child.cups}</pre>
              <h4  onClick={()=>navigate(`/PageRewards/${child._id}`)}>Rewards</h4>                    
          </motion.div> 
          {!isTasks && (       
              <h4>No tasks !</h4>         
          )}  
            {isTasks && (
            <h4>List tasks for today</h4>
          )}    
          <div className='containerListTasks'>
            {child.tasks.map(e=>{
              return(            
                <motion.div  className='cardTasks' key={e._id} onClick={()=>handleTaskDone(e)}
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
                  delay:0.3
                }}          >
                  <h2 >{e.name}</h2>
                    <motion.img width={100} src={e.imageUrl} alt="img task"
                      animate={{
                      opacity:[0,1],                            
                    }}
                  ></motion.img>              
                    <h3> Points  {e.points}</h3>                                                   
                  </motion.div>                           
                )  
            })}         
          </div>    
          <NavLink to='/Sectionchilds'><button>Done</button></NavLink>
        </div>
      )}      
      {!child && 
      <div className='noItems'>
            <p>child not found</p>
      </div>      
      }
  </motion.div>   
)}
 