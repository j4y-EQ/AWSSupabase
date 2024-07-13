import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Stack } from '@mui/material';
import { useContext } from 'react';
import { authContext } from '../utils/authContext';

export default function HeaderBar() {
    const {session, supabase} = useContext(authContext);

    async function signOut() {
        supabase.auth.signOut()
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" fontWeight={"fontWeightBold"} sx={{ flexGrow: 0.2 }}>
                        Cool Math Games
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{flexGrow: 1}}>
                        <Link href="home" color="inherit" >Home</Link>
                        {/* <Link href="flashcards" color="inherit" >Flashcards</Link> */}
                    </Stack>
                    
                    <Button color="inherit" sx={{flexGrow: 0}} onClick={signOut}>Log out</Button>
                {/* <Button color="inherit">Flashcards</Button> */}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
