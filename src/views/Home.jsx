import React ,{useEffect,useState ,useContext}from 'react'
import axios from 'axios';
import { motion } from "framer-motion"

export default function Home() {
  const storedToken = localStorage.getItem('authToken');
  console.log()
  const [childs, setChilds] = useState("");
  let isChilds =false
  let text =""
  if(childs.length !== 0){
    isChilds=true
    text =""
  }else{
     isChilds=false
     text ="No child found"  }
  useEffect(() => {    
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/child/mine`,{ headers: { Authorization: `Bearer ${storedToken}` }});
        setChilds(response.data.data)        
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);
  return (   
    <motion.div className='logo'
      star 
      animate={{
      scale:[0,5,1],
      y:[-100,300,0],
      opacity:[0,1]
      }}   
      transition={{duration:1}}  
    >    
    <div>    
     <h1 className=''>HomeWork<br/>for<br/>kids</h1>
    </div>    
    </motion.div>   
  )
}     
       