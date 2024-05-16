import React, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { addUser ,authenticateUserName} from '../Service/api';
import { useNavigate } from 'react-router-dom';

const initialValue = {
    username: '',
    password: '',
    confirmPassword: '',
    wishlist: []
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
    }
`;

const AddUser = () => {
    const [user, setUser] = useState(initialValue);
    const { username, password, confirmPassword } = user;
    let navigate = useNavigate();

    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const addUserDetails = async () => {
        const { confirmPassword, ...userData } = user;
        try {
            await addUser(userData);
            navigate('/');
        } catch (error) {
            alert('Username already exists');
        }
    }

    const handleLoginClick = () => {
        navigate('/');
    }

    const validatePassword = () => {
        return password === confirmPassword;
    }

    return (
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
                <InputLabel htmlFor="confirm-password-input">Confirm Password</InputLabel>
                <Input onChange={(e) => onValueChange(e)} type="password" name='confirmPassword' value={confirmPassword} id="confirm-password-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => {
                    if (validatePassword()) {
                        addUserDetails();
                    } else {
                        alert("Passwords do not match!");
                    }
                }}>Register</Button>
            </FormControl>
            <FormControl>
                <Button variant="outlined" onClick={handleLoginClick}>Already have an account? Login here</Button>
            </FormControl>
        </Container>
    )
}

export default AddUser;
