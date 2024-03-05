import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Count() {
const { user } = useContext(AuthContext)  
const [count, setCount] = useState([]);
  useEffect(() => {   
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/`); 
        console.log(response)
        setCount(response.data.data[0])
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);
  return (
    <div >     
      <h2>Count</h2> 
      {count && (
        <div   className="cardChildInfo">    
            <h5> Name</h5><h2>{user.username}</h2>
            <h5> Email</h5><h2>{user.email}</h2>      
        </div>
        )}
      {!count && <p>count not found</p>} 
     </div>
  )
}