import React, { Component, useContext, useEffect, useState } from 'react'
import { authContext } from '../utils/authContext'
import '../styles/Header.css';
import HeaderBar from '../components/Header';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { ButtonBase, CardContent, Stack, Grid } from '@mui/material';

export default function Home() {
  const {session, supabase} = useContext(authContext);
  const [flashcards, setFlashcards] = useState(null)

  useEffect(()=>{
		fetch("http://localhost:5000/flashcards/user/" + session.user.id,{
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
		}).then(response=>{
			if (!response.ok){
				throw new Error('Response error')
			}
			return response.json()
		}).then(data=>{
			console.log(data)
      setFlashcards(data)
		})
	},[])
  

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
            <Grid container spacing={2} justifyContent={'flex-start'} padding={5}>
              {flashcards ? Array.from(flashcards).map((card, index) => (
                <Grid item xs={false} sm={false} md={false} key={index}>
                  <Card sx={{height: 200, width: 200}}>
                    <ButtonBase sx={{height: '100%', width: '100%'}} href={'/flashcards?id='+ card.id}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          {card.flashcard_name}
                        </Typography>
                      </CardContent>
                    </ButtonBase>
                  </Card>
                </Grid>
              )): <></>}
              
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Box my={4} display="flex" justifyContent="center" alignItems="center" sx={{border: '2px dashed grey', borderRadius:1}}>
          <Button href="/createflashcard" sx={{width: '100% !important'}}>Create flashcards</Button>
        </Box>


      </Box>

      

    </Box>
    
  )

}
