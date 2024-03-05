import React from 'react'

export default function Date() {
    const date = new Date()
    const day = date.getDay()
    const hour= date.getHours()    
  return (
    <div>
        <h1>{day}</h1>
        <h1>{hour}</h1>
    </div>
  )
}
