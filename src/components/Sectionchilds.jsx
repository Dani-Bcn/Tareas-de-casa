import React ,{useEffect,useState ,useContext}from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function SectionChilds() {
const storedToken = localStorage.getItem('authToken');
const { isLoggedIn } = useContext(AuthContext);
const navigate = useNavigate()
const [child, setChild] = useState([]);
let isChilds =false
if(child.length !== 0){
  isChilds=true
}else{
  isChilds=false
}
useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/child/mine`,{ headers: { Authorization: `Bearer ${storedToken}` }});
        setChild(response.data.data)
      } catch (error) {
        console.error(error);
      }
    } 
    getData(); 
  }, []);
  return (
    <motion.div
    animate={{
      opacity:[0,1]   
    }}
    transition={{
      duration:1.5
    }}
    >    
    <motion.h4
      animate={{
        x:[-200,50,0],          
      }}
      transition={{
        duration:1
      }}
    >Children's section</motion.h4> 
    <motion.hr 
      animate={{
        scaleX:[0,1],
          x:[-150,1]
        }}
        transition={{
          delay:0.2
      }}/>
      {isLoggedIn && (
      <div > 
      {isChilds && (
        <div>     
           <div className='containerListTasks'>
          {child.map((ele)=>(
            <motion.div key={ele._id}
             animate={{
                x:[200,-50,0]
              }}
              transition={{
                duration:1
              }}
              >         
              <NavLink  key={ele._id} className='cardPageChild' to={`/PageChild/${ele._id}`}>                
                <h3>What tasks do I have for today? </h3>
                <img src={ele.imageUrl}  alt="img_Child" />                      
                <h3>{ele.name}</h3>               
              </NavLink>      
            </motion.div>                                                
            ))} 
            </div>
          </div> 
        )}      
          {!isChilds &&(    
              <motion.div className='marginPage'
              animate={{
                x:[200,-50,0],
                opacity:[0,1]
              }}
              transition={{
                duration:1
              }}
              >
            <h2>We don't have children yet, let's add them</h2>       
            <button className='butt' onClick={()=>navigate("/AddChild")}>Add child</button>         
          </motion.div>  
        ) }
      </div>
    )}
  </motion.div>
  )
}