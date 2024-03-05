import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {motion} from 'framer-motion'

export default function EditChild() {
  const date = new Date();
  const actualYear = date.getFullYear();
  console.log(actualYear)
  const navigate = useNavigate();
  const { id } = useParams();
  const [child, setChild] = useState(null);
    useEffect(() => {
      const getData = async () => {
        try {
          const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`,);
          setChild(getChild.data.data);
        } catch (error) {
          console.error(error);
        }
      }
      getData();
    }, [id])
  //Vamos guardando los valoes conforme escribimos
    const handleChange = (e) => {
      setChild(prev => { 
        return {
          ...prev,        
          [e.target.name]: e.target.value       
        }
      })       
    }
    const handleSubmit = async (e) => {
        //console.log(child)
      e.preventDefault();
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/child/${id}`, {name: child.name, yearOfBirth: child.yearOfBirth, imageUrl: child.imageUrl,points: child.points, cups: child.cups, pointsCup: child.pointsCup, golaTasks: child.goalTasks, taskDone: child.taskDone} );
        navigate(`/ListChilds`)
      } catch (error) {
        console.error(error);
      }
    }
    const handleUploadImg  = async (e) => {
      const uploadData = new FormData();
      uploadData.append("imageUrl", e.target.files[0]);
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/child/upload`, uploadData, );
        // console.log(response.data.fileUrl);
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
    return (
      <div >
        {!child && <p>Loading</p>}
        {child && (
          <motion.form  className='formSignUp' onSubmit={handleSubmit}
          animate={{
            y:[200,-100,0],
            opacity:[0,1]
          }}
          transition={{
            duration:1
          }}>
            <label>Name</label>
            <input type="text" name="name" placeholder="Name" value={child.name} onChange={handleChange} />          
            <label>Year of date</label>
            <input type="number"  min={1980} max={actualYear} name="yearOfBirth" placeholder="2015" value={child.yearOfBirth} onChange={handleChange} />
            <label>Select picture</label>
            <input type="file" onChange={(e)=>{handleUploadImg(e)}} />       
            <button className='butt' type="submit">Save changes</button>
          </motion.form>
        )}
      </div>
  )
} 