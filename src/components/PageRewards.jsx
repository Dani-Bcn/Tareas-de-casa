import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Cup from '../img/cup.png';
import Cup2 from '../img/cup2.png';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';

export default function PageRewards() {
const navigate = useNavigate() 
const [child, setChild] = useState(null);
const [timeLeisure, setTimeLeisure] = useState(0)
const {id} = useParams() 
const cupPaint =[]
const cup = [Cup2,Cup2,Cup2,Cup2,Cup2]

useEffect(() => {  
    const getData = async () => {
      try {      
        const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`);                             
            setChild(getChild.data.data)         
            setTimeLeisure( child.taskDone / child.goalTasks * 100  )                  
        } catch (error) {    
          console.error(error);     
        }     
    }         
  getData();
}, [timeLeisure]);

let numCups
{child && (  
  numCups = child.cups  
)}
{ for (let i = 0; i < numCups; i++) {     
  cupPaint.push(1)
} 
cupPaint.map((e,i)=>{
  return cup.splice(i,1,Cup) 
})   
}
return (  
    <motion.div className='backPageRewards'
    animate={{
      opacity:[0,1]
    }}
    transition={{
      duration:1
    }}>
        {child && (                
            <div>     
        <h4>Rewards for today</h4>             
                <h4>
                    Tasks done {child.taskDone} / {child.goalTasks}
                </h4>               
          <h4>  Points  :  {child.points} </h4>         
          <h4>You have minutes {child.points} of leisure time</h4>
          <hr />
          <h4>Rewards accumulated in this month</h4>
          <h4>Points accumulated this month : {child.pointsCup}</h4>

          <h4>  Cups : {child.cups}  </h4>
          <div>
                {cup.map((e, i)=>{
                return <img  className='imgCups' key={i} src={cup[i]} alt="" />
                })}
                  </div> 
          </div>      
        )}          
    </motion.div>
  )
}