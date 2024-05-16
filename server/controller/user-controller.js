import User from '../model/user.js';
import axios from 'axios'; 

export const getUsers = async (request, response) => {
    try{
        const users = await User.find();
        response.status(200).json(users);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

export const addUser = async (request, response) => {
    const user = request.body;
    
    const newUser = new User(user);
    try{
        await newUser.save();
        response.status(201).json(newUser);
    } catch (error){
        response.status(409).json({ message: error.message, data: user });     
    }
}

export const getUserById = async (request, response) => {
    try{
        const user = await User.findById(request.params.id);
        response.status(200).json(user);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

export const editUser = async (request, response) => {
    let user = request.body;

    const editUser = new User(user);
    try{
        await User.updateOne({_id: request.params.id}, editUser);
        response.status(201).json(editUser);
    } catch (error){
        response.status(409).json({ message: error.message });     
    }
}

export const deleteUser = async (request, response) => {
    try{
        await User.deleteOne({_id: request.params.id});
        response.status(201).json("User deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message });     
    }
}

export const loginUser = async (request, response) => {
    const { username, password } = request.body;
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return response.status(401).json({ message: 'Invalid password' });
        }

        response.status(200).json(user);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const updateWishlistByUsername = async (request, response) => {
    const  username  = request.body.username;
    const  wishlist  = request.body.wishlist;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return response.status(404).json({ message: 'User not found', name: username });
        }

        user.wishlist = removeDuplicates(user.wishlist.concat(wishlist), 'symbol');

        await user.save();

        response.status(200).json(user);
    } catch (error) {
        response.status(500).json({ message: error.message, name: username });
    }
};

export const stockSearch = async (request, response) => {
    try {
      const apiKey = "BUQVNOU";
      const data = await axios(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${request.body.searchterm}&apikey=${apiKey}`);
    //   const data = await res.json();
  
      if (data.bestMatches) {
        response.status(200).json({ searchRes: data.bestMatches });
      }
  
    } catch (error) {
      console.error('Error fetching data:', error);
      response.status(200).json({ searchRes: temp_symbols });
    }
};



function removeDuplicates(array, key) {
    return array.filter((obj, index, self) =>
        index === self.findIndex((o) => (
            o[key] === obj[key]
        ))
    );
}







const temp_symbols = [{
    '1. symbol': 'AAPL',
    '2. name': 'Apple Inc.'
  },
  {
    '1. symbol': 'AAPL1',
    '2. name': 'Apple Inc.'
  },
  {
    '1. symbol': 'AAPL2',
    '2. name': 'Apple Inc.'
  },
  {
    '1. symbol': 'IBM',
    '2. name': 'IBM Inc.'
  }];
