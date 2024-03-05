import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {motion} from 'framer-motion'
import axios from 'axios';

export default function AddChild() {
  const storedToken = localStorage.getItem('authToken');
  const date = new Date();  
  const actualYear = date.getFullYear();
  
  const navigate = useNavigate();
  const [child, setChild] = useState({
    name: '',  
    yearOfBirth:'',
    imageUrl:'',
    tasks:[],
    points:0,
    pointsCup:0,
    cups:0,
    goalTasks:0,
    taskDone:0,
  }) 
  const handleChange = (e) => { 
    setChild(prev => {
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
      console.log(response.data.fileUrl);
      setChild(prev => {
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
        await axios.post(`${process.env.REACT_APP_API_URL}/child`, { name: child.name, yearOfBirth: child.yearOfBirth ,  tasks:child.tasks, imageUrl:child.imageUrl, points: child.points, cups: child.cups, pointsCup: child.pointsCup, goalTasks: child.goalTasks, taskDone: child.taskDone}, { headers: { Authorization: `Bearer ${storedToken}` } });           
        toast.success('Project created successfully')
        navigate("/ListChilds")
    } catch (error) {
      console.log(error);
    }
  }  
  return ( 
      <motion.form  className='formSignUp'onSubmit={handleSubmit}
        animate={{
          y:[400,-200,0],
          opacity:[0.3,1],
        }}    
        transition={{
          duration:1.5
        }}      
      >      
        <label>Name</label>
        <input type="text" name="name" placeholder="Name" value={child.name} onChange={handleChange} />
        <label>Year of Birth</label>
        <input type="number" min="1980"  max={actualYear} name="yearOfBirth" placeholder="YearOfBirth" value={child.yearOfBirth} onChange={handleChange} />      
        <label>Picture</label>
        <input type="file" onChange={(e)=>{handleUploadImg(e)}} />
        <label>Points</label>
        <input type="number" min="0"  name="points" placeholder="Points" value={child.points} onChange={handleChange} />      
        <label>Cups</label>
        <input type="number" min="0"  name="cups" placeholder="Cups" value={child.cups} onChange={handleChange} />       
        <button type="submit">Save</button>   
      </motion.form>
  ) 
}
