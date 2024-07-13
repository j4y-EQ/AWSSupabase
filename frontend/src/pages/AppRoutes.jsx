import React, { useContext } from 'react'
import { Routes, Navigate, Route } from 'react-router-dom';
import Home from './Home';
import Flashcards from './Flashcards';
//import CreateFlashcard from './CreateFlashcard';

const AppRoutes = () => {
    return (    
        <Routes>
            <Route path='/' element={<Navigate to={'/home'}/>} />
            <Route path='*' element={<Navigate to={'/home'}/>} />

            <Route path='/flashcards' element={<Flashcards/>} />
            {/*<Route path='/createflashcard' element={<CreateFlashcard/>} />*/}
            <Route path='/home' element={<Home/>} />
        </Routes>
    )
}
export default AppRoutes;
