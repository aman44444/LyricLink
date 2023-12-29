"use client"
import React from 'react'
import Card from '../common/Card/Card'
import { MdHomeFilled } from "react-icons/md";

const cardStyle = { 
    backgroundColor: "#181818",
    height:"100%",
  };

const card2 ={ 
    backgroundColor: "#181818",
    height:"100%",
}

const card3 = {
    backgroundColor: "#181818",
    height:"100%",
}


function Main() {
  return (
    <div className='flex'>
       <div className='w-1/4 h-screen '>
          <div className='h-1/4 p-3'>
          <Card style={cardStyle}>
            <div className='flex text-white w-1/2 '>
            <MdHomeFilled />
            Home
            </div>
            
          </Card>
          </div>
          <div className='h-3/4 px-3 pb-3'>
          <Card style={card2}>
           
           </Card>
          </div>
       </div>
       <div className='w-3/4 h-screen py-3 pr-3'>
           <Card style={card3}>
            
           </Card>

       </div>
    </div>
  )
}

export default Main