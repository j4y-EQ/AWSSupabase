import { Box } from '@mui/material'
import React, {useState} from 'react'
import HeaderBar from '../components/Header'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { authContext } from '../utils/authContext';
import TextField from '@mui/material/TextField';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export default function CreateFlashcard() {
    const {session, supabase} = useContext(authContext);
    const [file, setFile] = useState(null);
    const [flashcardName, setFlashCardName] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            console.log(e.target.files[0])
            setFile(e.target.files[0]);
        }
    };

    async function submitFile() {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('user_id', session.user.id)
        formData.append('flashcard_name', flashcardName)
        
        fetch('http://localhost:5000/extract-text', {
            method: 'POST',
            mode: 'cors',
            headers: {
			    'Access-Control-Allow-Origin':'*'
		    },
            body: formData
        }).then(response => {
            console.log(response)

        })
    }

    return (
        <Box>
            <HeaderBar/>
            <Stack minHeight={400} spacing={4} justifyContent="center" alignContent="center" flexDirection="column" sx={{margin: 10}}>
                <Typography variant="h6" component="div" fontWeight={"fontWeightBold"} sx={{ flexGrow: 0.2 }}>
                    Upload your file here!
                </Typography>
                <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />} sx={{flexGrow: 1, fontWeight:'fontWeightBold'}}>
                    Upload file
                <VisuallyHiddenInput type="file" accept="application/pdf" onChange={handleFileChange} />
                </Button>
                {file 
                    ? <TextField id="outlined-basic" label="Name of Flashcard Set" variant="outlined" onChange={(e) => {setFlashCardName(e.target.value)}}/>
                    : <></>
                }
                {flashcardName 
                    ? <Button variant="contained" onClick={submitFile}>Go!</Button>
                    : <></>
                }
            </Stack>
        </Box>
    )
}
