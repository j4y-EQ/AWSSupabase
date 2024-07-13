import './index.css'
import { useState, useEffect, createContext } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from './utils/supabaseClient'
import { authContext } from './utils/authContext'
import AppRoutes from './pages/AppRoutes'
import { Route, Routes, Navigate } from 'react-router-dom'
import {CssBaseline, ThemeProvider } from "@mui/material";
 
import { appTheme } from "./themes/theme";
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
	 <ThemeProvider theme={appTheme}>
<CssBaseline enableColorScheme />
      <Routes>
        <Route path='/' element={
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} />
        } />
        <Route path='/auth' element={
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} />
        } />
      </Routes>
	</ThemeProvider>
    )
  }
  else {
    return (
	 <ThemeProvider theme={appTheme}>
<CssBaseline enableColorScheme />
      <authContext.Provider value={{session, supabase}}>
        <AppRoutes/>
      </authContext.Provider>
	</ThemeProvider>
    )
  }
}
