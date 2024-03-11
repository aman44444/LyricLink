"use client"
import React from 'react'
import SignIn from '@/app/components/auth/Login/Page'
import SpotifyAuth from '@/app/components/auth/SpotifyAuth/page'

function page() {
  return (
    <div>
         <SignIn/>
         <SpotifyAuth/>
    </div>
  )
}

export default page