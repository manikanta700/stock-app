import React, { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { addUser, getUsers, authenticateUser } from '../Service/api';
import { useNavigate } from 'react-router-dom';

const initialValue = {
    username: '',
    password: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
    }
`;

const Login = () => {
    const [user, setUser] = useState(initialValue);
    const { username, password } = user;
    
    let navigate = useNavigate();

    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    
    const storeUserDetailsInLocalStorage = (userDetails) => {
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
    };

    const userLogin = async () => {
        try {
            const userdata = await authenticateUser(user)
            storeUserDetailsInLocalStorage(userdata)
            window.location.reload();
        } catch (error) {
            alert('Please enter valid username and password');
        }
    }

    const handleRegisterClick = () => {
        navigate('/add');
    }

    const [userData, setUserData] = useState(null);

    const getUserDetailsFromLocalStorage = () => {
        const userDetailsJSON = localStorage.getItem('userDetails');
        return userDetailsJSON ? JSON.parse(userDetailsJSON) : null;
    };

    useEffect(() => {
        const userDetails = getUserDetailsFromLocalStorage();
        setUserData(userDetails);
    }, []);

    return (
        <div>
            {userData ? (
                <div>
                    <h1>User Profile</h1>
                    <p>Username: {userData.username}</p>
                    {/* Render other user details here */}
                </div>
            ) : (
                <Container>
                    <Typography variant="h4">Please enter your details</Typography>
                    <FormControl>
                        <InputLabel htmlFor="username-input">Username</InputLabel>
                        <Input onChange={(e) => onValueChange(e)} name='username' value={username} id="username-input" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="password-input">Password</InputLabel>
                        <Input onChange={(e) => onValueChange(e)} type="password" name='password' value={password} id="password-input" />
                    </FormControl>
                    <FormControl>
                        <Button variant="contained" color="primary" onClick={() => userLogin()}>Login</Button>
                    </FormControl>
                    <FormControl>
                        <Button variant="outlined" onClick={handleRegisterClick}>Not registered? Register here</Button>
                    </FormControl>
                </Container>
            )}
        </div>
    )
}

export default Login;
