import React, { useState, useEffect } from 'react';
import Login from './login';
import StockSearch from './stocksearch';
import { styled } from '@mui/material';
import { authenticateUser } from '../Service/api';
import StockList from './stocklist';

const CenteredDiv = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
});

const ContentContainer = styled('div')({
    width: '80%',
    maxWidth: '1000px',
});

const UserProfile = () => {
    const [userData, setUserData] = useState(null);

    const getUserDetailsFromLocalStorage = () => {
        const userDetailsJSON = localStorage.getItem('userDetails');
        return userDetailsJSON ? JSON.parse(userDetailsJSON) : null;
    };

    useEffect(async () => {
        const userDetails = getUserDetailsFromLocalStorage();
        setUserData(userDetails);
        if (userDetails) {
            try {
                setUserData(await authenticateUser(userDetails));
            } catch (error) {
                alert('Server is down please try later');
            }
        }
    }, []);

    return (
        <CenteredDiv>
            {userData ? (
                <div>
                    <h2>Hello {userData.username}, here is your Market Dashboard</h2>
                    <StockList symbols={userData.wishlist}></StockList>
                    <StockSearch apiKey={"YMPP2FD78DEDIGVJ"} userData={userData} setUserData={setUserData}></StockSearch>
                </div>
            ) : (
                <ContentContainer>
                    <Login setUserData={setUserData} />
                </ContentContainer>
            )}
        </CenteredDiv>
    );
};

export default UserProfile;
