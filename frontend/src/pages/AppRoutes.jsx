import React, { useContext } from 'react'
import { Routes, Navigate, Route } from 'react-router-dom';
import Home from './Home';

const AppRoutes = () => {
    return (    
        <Routes>
            <Route path='/' element={<Navigate to={'/home'}/>} />
            <Route path='*' element={<Navigate to={'/home'}/>} />
            <Route path='/home' element={<Home/>} />
        </Routes>
    )
}
export default AppRoutes;