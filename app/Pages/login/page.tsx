"use client"
import React from 'react'
import SignIn from '@/app/components/auth/Login/Page'
// import SpotifyAuth from '@/app/components/auth/SpotifyAuth/page'
import WebApp from '@/app/webapp/page'
function page() {
  return (
    <div>
         <SignIn/>
         <WebApp/>
    </div>
  )
}

export default page