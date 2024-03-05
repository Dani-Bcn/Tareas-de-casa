  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import {motion} from 'framer-motion'
  import Swal from 'sweetalert2';
  import { useParams, useNavigate, NavLink } from 'react-router-dom';

  export default function InfoChild() {
  const navigate = useNavigate() 
  const {id} = useParams() 
  const date = new Date();  
  const actualYear = date.getFullYear();
  const params = useParams(); //then use with params.id
  const [child, setChild] = useState(null);
  const [change, setChange] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {      
        const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`);                    
         setChild(getChild.data.data)              
      } catch (error) { 
        console.error(error); 
      } 
    } 
    getData();
  }, [change]);  

  const handleConfirm=()=>{
    Swal.fire({
      title: 'Are you sure to delete child?',
      showDenyButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
       handleDelete()
      } 
    })
  }  
  
  const handleDelete= async ()=>{   
      try {      
        await axios.delete(`${process.env.REACT_APP_API_URL}/child/${id}`);               
       navigate("/ListChilds")
      } catch (error) { 
        console.error(error); 
      } 
    }       

  const resetPoints = async()=>{ 
      try {      
        const getChild = await axios.put(`${process.env.REACT_APP_API_URL}/child/resetPoints/${id}`);                           
        setChild(getChild.data.data) 
        setChange(!change)     
      } catch (error) { 
          console.error(error); 
      } 
    } 

    const resetCups = async()=>{ 
      try {      
        const getChild = await axios.put(`${process.env.REACT_APP_API_URL}/child/resetCups/${id}`);                           
        setChild(getChild.data.data) 
        setChange(!change)
      } catch (error) { 
          console.error(error); 
      } 
    }  

  return (
    <motion.div className='containerCardInfo'
    animate={{
      opacity:[0,1]}}
    transition={{
      duration:1
    }}    
  >            
      {child && (
        <div  className='cardInfo'>           
          <motion.img width={100} src={child.imageUrl}
            animate={{
              opacity:[0,1],
              x:[-50,0]
            }}
            transition={{
              duration:1
            }}
           /> 
          <motion.h6
            animate={{
              opacity:[0,1],
              x:[-50,0]
            }}
            transition={{
              delay:0.3
            }}>{child.name}</motion.h6>
          <motion.h2
            animate={{
              opacity:[0,1],
              x:[-50,0]
            }}
            transition={{
              delay:0.5
            }}> Age {actualYear - child.yearOfBirth}</motion.h2>             
          <hr />
          <motion.h2
            animate={{
              opacity:[0,1],
              x:[-50,0]
            }}
            transition={{
              delay:0.6
            }}> Points : {child.points}</motion.h2>    
          <hr />
          <motion.h2
            animate={{
              opacity:[0,1],
              x:[-50,0]
            }}
            transition={{
              delay:0.8
            }}> Cups : {child.cups}</motion.h2>      
        </div>
      )}   
      <motion.div className='cardInfo'>
  
      <NavLink to={`/EditChild/${id}`}>
        <motion.button
          animate={{
            opacity:[0,1],
            x:[50,0]
          }}
          transition={{
            delay:0.2,
          }}
          >Edit child</motion.button>
        </NavLink>         
        <NavLink to={`/ListTasks/${id}`}>
          <motion.button
          animate={{
            opacity:[0,1],
            x:[50,0]
          }}
          transition={{
            delay:0.3
          }}
         >Add tasks</motion.button>
        </NavLink>
        <NavLink to={`/DeleteTasksChild/${id}`}>
          <motion.button
          animate={{
            opacity:[0,1],
            x:[50,0]
          }}
          transition={{
            delay:0.4
          }}
         >Delete tasks</motion.button>
        </NavLink>
        <motion.button onClick={()=>resetPoints()}
          animate={{
            opacity:[0,1],
            x:[50,0]
          }}
          transition={{
            delay:0.5
          }}
         >Reset Points</motion.button>
        <motion.button onClick={()=>resetCups()}
          animate={{
            opacity:[0,1],
            x:[50,0]
          }}
          transition={{
           delay:0.6
          }}
         >Reset Cups</motion.button>
        <motion.button onClick={()=>handleConfirm()}
          animate={{
            opacity:[0,1],
            x:[50,0]
          }}
          transition={{
            delay:0.7
          }}
         >Delete child</motion.button>
        <NavLink to={`/PageRewards/${id}`}>
          <motion.button
          animate={{
            opacity:[0,1],
            x:[50,0]
          }}
          transition={{
            delay:0.8
          }}
         >Rewards</motion.button>
        </NavLink>
      </motion.div>     
    </motion.div>   
  )
} 