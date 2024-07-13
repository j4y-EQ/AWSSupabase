import React, { Component, useContext, useEffect, useState } from 'react'
import { authContext } from '../utils/authContext'
import '../styles/Header.css';
import HeaderBar from '../components/Header';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

export default function Home() {
  const {session, supabase} = useContext(authContext);

  useEffect(() => {
    console.log(session)  
  })

  return (
    <Box>
      <HeaderBar></HeaderBar>

      <h1>{"Your unique ID is: " + session.user.id}</h1>


      <Box sx={{margin: 10}}>
        <Accordion >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{fontWeight:"fontWeightBold", fontSize:50}}
          >
            My Flashcards
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="column" spacing={2}>
              <Button variant='contained'>Set 1</Button>
              <Button variant='contained'>Set 2</Button>
              <Button variant='contained'>Set 3</Button>
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Box my={4} display="flex" justifyContent="center" alignItems="center" sx={{border: '2px dashed grey', borderRadius:1}}>
          <Button href="/createflashcard" sx={{width: '100% !important'}}>Create flashcards</Button>
        </Box>


      </Box>

      

    </Box>
    
  )

}
