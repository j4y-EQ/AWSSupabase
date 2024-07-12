import React, { Component, useContext, useEffect, useState } from 'react'
import { authContext } from '../utils/authContext'
export default function Home() {
  const {session, supabase} = useContext(authContext);

  useEffect(() => {
    console.log(session)
  })

  async function signOut() {
    return supabase.auth.signOut()
  }
  return (
    <div>
      <h1>{"Your unique ID is: " + session.user.id}</h1>
      <button onClick={signOut}>Log out</button>
    </div>
    
  )

}
