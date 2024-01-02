"use client"
import React from 'react'
import Card from '../common/Card/Card'
import { MdHomeFilled } from "react-icons/md";
import ProfileCard from '../Home/Profile/Profile';
import { IoIosSearch } from "react-icons/io";
import Button from '../common/Buttton/Button';


const cardStyle = { 
    backgroundColor: "#181818",
    width:"100%",
    height:"100%",
    display:"flex",
    alignItems:"center",
    flexDirection:"column",
  };

const card2 ={ 
    backgroundColor: "#181818",
    height:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
}

const card3 = {
    backgroundColor: "#181818",
    height:"100%",
}

const buttonStyle= {
  height:"10%",
}

const profiles = [
  {
    name: 'John Doe',
    age: 28,
    imageUrl: 'https://source.unsplash.com/random/1920x1080/?wallpaper,landscape', // Replace with actual image path
  },
  // Add more profiles as needed
];

const iconStyle = {
  fontSize: "1em",
  marginRight: "1em"
}


function Main() {
  return (
    <div className='flex'>
       <div className='w-1/4 h-screen '>
          <div className='h-1/4 p-3 '>
          <Card style={cardStyle}>
            <div className='flex text-white w-1/2 text-xl flex-end'>
            <MdHomeFilled style={iconStyle}/>
            Home
            </div>
            <div className='flex text-white w-1/2 text-xl '>
            <IoIosSearch style={iconStyle}/>
              Search
            </div>
          </Card>
          </div>
          <div className='h-3/4 px-3 pb-3'>
          
          <Card style={card2}>
<Button style={buttonStyle}>-</Button>
          <div className="space-x-4 h-full w-full flex items-center justify-center">
        {profiles.map((profile, index) => (
          <ProfileCard key={index} {...profile}/>
        ))}
      </div>
      <Button style={buttonStyle}>+</Button>
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