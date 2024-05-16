import axios from 'axios';

// const usersUrl = 'http://localhost:3003/users';
const usersUrl = 'http://localhost:8080';

export const getUsers = async (id) => {
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);
}

export const addUser = async (user) => {
    return await axios.post(`${usersUrl}/add`, user);
}

export const deleteUser = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`);
}

export const editUser = async (user) => {
    return await axios.put(`${usersUrl}/updatef`, user)
}
// export const updateUser = async (user) => {
//     return await axios.put(`${usersUrl}/update`, user)
// }

export const authenticateUser = async (user) => {
    try {
        const response = await axios.post(`${usersUrl}/login`, user);
        return response.data; // Assuming the server returns some data upon successful authentication
    } catch (error) {
        throw new Error('Authentication failed'); // Handle authentication failure
    }
}
export const updateUser = async (user) => {
    try {
        const response = await axios.post(`${usersUrl}/update`, user);
        return response.data; // Assuming the server returns some data upon successful authentication
    } catch (error) {
        throw new Error('Authentication failed'); // Handle authentication failure
    }
}

export const searchStock = async(searchterm)=>{
    const res = await axios.post(`${usersUrl}/stocksearch`,{searchterm:searchterm})
    return res.data.searchRes
}


