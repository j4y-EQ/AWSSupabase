import './Flashcards.css'
import React, { Component, useContext, useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";

import { authContext } from '../utils/authContext'
import Card from '@mui/material/Card';
import HeaderBar from '../components/Header';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton';

export default function Flashcards() {
	const { session, supabase } = useContext(authContext);
	const [flashcards, setflashcards] = useState([{ 'question': "getting flashcards...", 'answer': 'getting flashcards...' }]);
	const [current, setcurrent] = useState(0);
	const [name, setname] = useState('Flashcards');
	const [show, setshow] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	useEffect(() => {
		fetch("http://localhost:5000/flashcards/" + searchParams.get("id"), {
			mode: 'cors',
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		}).then(response => {
			if (!response.ok) {
				throw new Error('Erm WHAT THE SIGMA')
			}
			return response.json()
		}).then(data => {
			console.log(data)
			setflashcards(data[0]["flashcards_json"])
			setname(data[0]["flashcard_name"])
			console.log(data[0]["flashcards_json"])
		})
	}, [])

	return (
		<div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>

			<HeaderBar />
			<Typography variant="h2" sx={{ fontWeight: "bold", alignSelf: "center", marginTop: 2}}>{name} </Typography>

			<Card className={`flip-container ${show ? "flipped" : ""}`} sx={{ height: "75%", mx: 12, marginBottom: 5 }}>
				<CardActionArea className={`flipper`} sx={{ height: "100%" }} onClick={() => { setshow(!show) }}>
					<CardContent className={`front`} sx={{ padding:"0", height: "100%", width: "100%", justifyContent: 'center', bgcolor: 'primary.main', color: 'primary.contrastText' }}>
						<Box sx={{ display: "flex", height: "100%", justifyContent: 'center' }}>
							<Typography variant="h3" sx={{ my: "auto" }} component="div" align="center"  >
								{flashcards[current]["question"]}

							</Typography>
						</Box>
					</CardContent>
					<CardContent className={`back`} sx={{ padding:"0", height: "100%", width: "100%", justifyContent: 'center', bgcolor: 'secondary.main', color: 'primary.contrastText' }}>
						<Box sx={{ display: "flex", height: "100%", justifyContent: 'center' }}>
							<Typography variant="h3" sx={{ my: "auto" }} component="div" align="center"  >
								{flashcards[current]["answer"]}
							</Typography>
						</Box>
					</CardContent>
				</CardActionArea>
			</Card>
			<Box sx={{ display: "flex", flexGrow: "1", alignItems: "center", justifyContent: 'center' }}>
				<IconButton tooltip="Previous Flashcard" onClick={() => {
					if (current > 0) {
						setcurrent(current - 1)
						setshow(false)
					}
				}
				}>
					<NavigateBeforeIcon fontSize="large" />
				</IconButton>
				<Typography variant="h5" sx={{ mx: "1rem" }}>{`${current + 1}/${flashcards.length}`}
				</Typography>
				<IconButton tooltip="Next Flashcard" onClick={() => {
					if (current < flashcards.length - 1) {
						setcurrent(current + 1)
						setshow(false)
					}
				}
				}>
					<NavigateNextIcon fontSize="large" />
				</IconButton>
			</Box>
		</div>
	)
}
