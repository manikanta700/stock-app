import React, { useState } from 'react';
import { AppBar, Toolbar, styled, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Header = styled(AppBar)`
    background: #111111;
`;

const Tabs = styled(NavLink)`
    color: #FFFFFF;
    margin-right: 20px;
    text-decoration: none;
    font-size: 20px;
`;

const LogoutButtonContainer = styled('div')`
    margin-left: auto;
`;

const LogoutButton = styled(Button)`
    color: #FFFFFF;
`;

const NavBar = () => {

    const getUserDetailsFromLocalStorage = () => {
        const userDetailsJSON = localStorage.getItem('userDetails');
        return userDetailsJSON ? JSON.parse(userDetailsJSON) : null;
    };
    const [userData, setUserData] = useState(getUserDetailsFromLocalStorage());

    const handleLogout = () => {
        // Remove user details from localStorage
        localStorage.removeItem('userDetails');
        // Clear user data in state
        setUserData(null);
        // Reload the page to refresh
        window.location.reload();
    };

    return (
        <Header position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    marketIO
                </Typography>
                {/* <Tabs to="/" exact>Code for Interview</Tabs>
                <Tabs to="/all" exact>All Users</Tabs>
                <Tabs to="/add" exact>Add User</Tabs> */}
                <LogoutButtonContainer>
                    {userData && ( // Render logout button if user data is present
                        <LogoutButton color="inherit" onClick={handleLogout}>Logout</LogoutButton>
                    )}
                </LogoutButtonContainer>
            </Toolbar>
        </Header>
    );
};

export default NavBar;
