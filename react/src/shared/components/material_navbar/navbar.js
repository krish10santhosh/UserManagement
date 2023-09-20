import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import './index.css';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `100%`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const NavBarComponent = () => {
    const logo = require('../../../assets/images/user.png');

    return (
        <>
            <Grid container xs={12} sm={12} md={12} xl={12} lg={12} xxl={12} direction="column"
                sx={{ height: "64px" }}>
                <AppBar position="fixed" open={true}>
                    <Toolbar className='mainToolbar'>
                        <Grid item xs={10} sm={10} md={5} xl={3} lg={3} xxl={3} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                            <img src={logo} alt={logo} style={{ width: "50px", height: '50px', margin: "0 5px 0 0" }} />
                            <Typography variant="h5" component="div"
                                style={{
                                    fontWeight: 'bold',
                                }}>
                                User Management
                            </Typography>
                        </Grid>
                    </Toolbar>
                </AppBar >
            </Grid>
        </>
    );
}

export default NavBarComponent;
