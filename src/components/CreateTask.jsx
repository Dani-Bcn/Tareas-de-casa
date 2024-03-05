import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import {motion} from 'framer-motion'

export default function CreateTasks() {
  const storedToken = localStorage.getItem('authToken');
  const date = new Date();  
  const actualYear = date.getFullYear();  
  const navigate = useNavigate();
  const [task, setTask] = useState({
    name: '',  
    imageUrl:'',
    points:'',
  })
  // In case of multiple file upload:
  // const [imageUrls, setImageUrls] = useState([]);
  // const [imgForUser, setImgForUser] = useState([]);  
  const handleChange = (e) => { 
    setTask(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const handleUploadImg  = async (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/child/upload`, uploadData, { headers: { Authorization: `Bearer ${storedToken}` }});
      setTask(prev => {
        return {
          ...prev,
          imageUrl: response.data.fileUrl
        }
      })
    } catch (error) {
      console.error(error);
    }
  }; 
  const handleSubmit = async (e) => {  
    e.preventDefault();
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/task`, { name: task.name, imageUrl: task.imageUrl, points: task.points, }, { headers: { Authorization: `Bearer ${storedToken}` } });           
        toast.success('Project created successfully')
        navigate("/Tasks")
    } catch (error) {
      console.log(error);
    }
  }  
  return (   
    <motion.form  className='form' onSubmit={handleSubmit}
    animate={{
      y:[400,-200,0],
      opacity:[0.3,1],
    }}    
    transition={{
      duration:1.5
    }}    
    > 
      <label>Name</label>     
      <input type="text" name="name" placeholder="Name" value={task.name} onChange={handleChange} />
      <label>Points</label>
      <input type="number" min="0"   name="points" placeholder="Points" value={task.points} onChange={handleChange} />      
      <label>Pîcture</label>
      <input type="file" onChange={(e)=>{handleUploadImg(e)}} />        
      <button type="submit">Save</button>   
    </motion.form>    
  ) 
}
