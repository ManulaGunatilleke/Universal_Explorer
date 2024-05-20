import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Common/user/Navbar/Navbar';
import { Outlet } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Header from '../../../components/Common/user/Header/Header';

import { useLocation } from 'react-router-dom'; 

function UserHome() {
    const [title, setTitle] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname;
        const lastSlashIndex = pathname.lastIndexOf('/');
        const parsedTitle = lastSlashIndex !== -1 ? pathname.substring(lastSlashIndex + 1).replace(/\W/g, ' ') : '';
        setTitle(parsedTitle);
    }, [location]);
  
    return (
        <Grid container>
            <Navbar />
            <Header title={title} />
            <Outlet />
        </Grid>
    );
}

export default UserHome;
