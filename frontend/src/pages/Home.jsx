import React, { Component, useContext, useEffect, useState } from 'react'
import { authContext } from '../utils/authContext'
import '../styles/Header.css';
import HeaderBar from '../components/Header';

export default function Home() {
  const {session, supabase} = useContext(authContext);

  useEffect(() => {
    console.log(session)
  })

  return (
    <div>
      <HeaderBar></HeaderBar>
      <h1>{"Your unique ID is: " + session.user.id}</h1>
    </div>
    
  )

}
