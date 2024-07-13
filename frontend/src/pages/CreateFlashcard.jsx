import { Box } from '@mui/material'
import React, {useState} from 'react'
import HeaderBar from '../components/Header'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            console.log("FILE CHANGED")
            setFile(e.target.files[0]);
        }
    };

  return (
    <Box>
        <HeaderBar/>
        <Box justifyContent="center" alignContent="center" flexDirection="column" sx={{margin: 10}}>
            <Typography variant="h6" component="div" fontWeight={"fontWeightBold"} sx={{ flexGrow: 0.2 }}>
                Upload your file here!
            </Typography>
            <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                Upload file
            <VisuallyHiddenInput type="file" accept="application/pdf" onChange={handleFileChange} />
            </Button>
            {file 
                ? <Button>Go!</Button>
                : <></>
            }
        </Box>
    </Box>
  )
}
