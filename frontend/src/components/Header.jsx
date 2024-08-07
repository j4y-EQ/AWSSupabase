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
        <Box sx={{ flexGrow: 0.3 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link href="home" variant="h5" underline="none" fontWeight={"fontWeightBold"} sx={{ flexGrow: 0.2,width: "min-content" }}>
                        TootToot
                    </Link>
                    <Stack direction="row" spacing={2} sx={{flexGrow: 1}}>
                        {/* <Link href="flashcards" color="inherit" >Flashcards</Link> */}
                    </Stack>
                    
                    <Button color="inherit" sx={{flexGrow: 0}} onClick={signOut}>Log out</Button>
                {/* <Button color="inherit">Flashcards</Button> */}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
