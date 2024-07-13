import React, { Component, useContext, useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";

import { authContext } from '../utils/authContext'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton';

export default function Flashcards() {
  const {session, supabase} = useContext(authContext);
	const [flashcards, setflashcards]=useState([{'question':"getting flashcards...",'answer':'getting flashcards...'}]);
	const [current, setcurrent]=useState(0);
	const [show, setshow]=useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	useEffect(()=>{
		fetch("http://localhost:5000/flashcards/"+searchParams.get("id"),{
			  mode: 'cors',
			  headers: {
			    'Access-Control-Allow-Origin':'*'
		  }
		}).then(response=>{
			if (!response.ok){
				throw new Error('Erm WHAT THE SIGMA')
			}
			return response.json()
		}).then(data=>{
			console.log(data)
			setflashcards(data[0]["flashcards_json"])
			console.log(data[0]["flashcards_json"])
		})
	},[])
  
  return (
	<div style={{height:"100vh", width:"100vw", display:"flex", flexDirection:"column"}}>

	  <Card variant="outlined" sx={{height:"75%", m:2}}>
		<CardContent sx={{height: "100%", justifyContent: 'center', bgcolor: 'primary.main', color: 'primary.contrastText'}}>
	  		<Box sx={{display:"flex", height: "100%", justifyContent: 'center'}}>
			  <Typography variant="h5" sx={{my:"auto"}}  component="div" align="center"  >

	  {show?(
		  flashcards[current]["answer"]
	  ):(
		  flashcards[current]["question"]
	  )}

		      </Typography> 
	  		</Box>
	  	</CardContent>
	  </Card>
	  <Box sx={{display:"flex", flexGrow:"1", alignItems:"center", justifyContent:'center'}}>
			<IconButton tooltip="Previous Flashcard"onClick={()=>{
				if (current>0){
				setcurrent(current-1)
				}}
			}>
	  		<NavigateBeforeIcon />
			</IconButton>
	  		<Typography sx={{mx: "1rem"}}> Select Flashcards
	  		</Typography>
	  		<NavigateNextIcon onClick={()=>{
				if (current<flashcards.length){
				setcurrent(current+1)
				}}
			}/>
	  </Box>
  </div>
  )
}
