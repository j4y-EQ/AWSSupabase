import './index.css'
import { useState, useEffect, createContext } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from './utils/supabaseClient'
import { authContext } from './utils/authContext'
import AppRoutes from './pages/AppRoutes'
import { Route, Routes, Navigate } from 'react-router-dom'

export default function App() {
  const [session, setSession] = useState(null)


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <Routes>
        <Route path='/auth' element={
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} />
        } />
      </Routes>
    )
  }
  else {
    return (
      <authContext.Provider value={{session, supabase}}>
        <AppRoutes/>
      </authContext.Provider>
    )
  }
}