import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {motion} from 'framer-motion'

export default function EditChild() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState(null);

    useEffect(() => {
      const getData = async () => {
        try {
          const getTask = await axios.get(`${process.env.REACT_APP_API_URL}/task/${id}`,);
          setTask(getTask.data.data);
        } catch (error) {
          console.error(error);
        }
      }
      getData();
    }, [id])
  //Vamos guardando los valoes conforme escribimos
    const handleChange = (e) => {
      setTask(prev => { 
        return {
          ...prev,        
          [e.target.name]: e.target.value       
        }
      })  
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/task/${id}`, {name: task.name,  points:task.points} );
        navigate(`/Tasks`)
      } catch (error) {
        console.error(error);
      }
    }
    return (
      <div >
        {!task && <p>Loading</p>}
        {task && (
          <motion.form className='form' onSubmit={handleSubmit}
            animate={{
              y:[200,-100,0],
              opacity:[0,1]
            }}
            transition={{
              duration:1
            }}            
          >
            <label>Name</label>
            <input type="text" name="name" placeholder="Name" value={task.name} onChange={handleChange} />
            <label>Points</label>
            <input type="number"  placeholder="Points" min={0}  name="points" value={task.points} onChange={handleChange} />
            <button type="submit">Save changes</button>
          </motion.form>
        )}
      </div>
    )
   } 