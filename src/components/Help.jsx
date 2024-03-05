import React from 'react';
import {motion} from 'framer-motion'

const Help = () => {
    return (
      <motion.div className='containerHelp'
        animate={{
            opacity:[0,1]
        }}
        transition={{
            duration:1.5
        }}
      >
            <h1> This application has two sections, one that belongs to the parents and the other that belongs to the children.</h1>             
            <hr />  
            <h1>Parent's section</h1>       
            <h2>               
                In the parents section we can add a child, once we have the children that we have decided, we can access their information and edit this child.    
                <br />
                Within the child's information we can add tasks, tasks will be added for one day.
                <br />
                Once the day is over we must restart the points, the tasks will also be restarted, in order to add new tasks for the next day.         
            </h2>
            <hr />
            <h1>Child's section</h1>
            <h2>
                This section is where the children will work, here they will see the tasks they must do and once a task is completed they must click on it to finish this task.
                <br />
                They will also have the rewards tab to be able to see the rewards, the points and cups.          
            </h2>                     
            <hr />   
            <h1>Points and rewards</h1>
            <h2>   
                In the rewards tab we can see the points, rewards and cups won so far.
                <br />
                The points will be equivalent to minutes of leisure
                <br />
                Each time the child completes a task, the points for that task will be added.
                <br />
                The points will be added throughout the month to get cups
                <br />
                for every 500 points you will win a cup.
                <br />
                At the end of the month they will obtain the rewards based on the total number of cups obtained.
            </h2>
        </motion.div>
    );
}
export default Help;
