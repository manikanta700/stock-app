import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, List, ListItem, ListItemText } from '@material-ui/core';
import { updateUser, searchStock } from '../Service/api';
import axios from 'axios'; 


const StockSearch = ({ apiKey, userData, setUserData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${apiKey}`);
      // console.log(response.bestMatches)
      setSearchResults(response.data.bestMatches || temp_symbols );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addToWishlist = async(symbol, name) => {
    if (!userData.wishlist.some(item => item.symbol === symbol)) {
      await setUserData(prevUserData => ({
        ...prevUserData,
        wishlist: [...prevUserData.wishlist, { symbol, name }]
      }));
    }

    
  };

 

  useEffect(() => {
    const updateUserOnServer = async () => {
      try {
        if (userData) {
          console.log(userData)
          await updateUser(userData);
        }
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    };

    updateUserOnServer();
  }, [userData]);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Search here to add new stocks to your wishlist..!
      </Typography>
      <Box display="flex" alignItems="center" marginBottom="20px">
        <TextField
          variant="outlined"
          label="Enter stock name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: '10px' }}>
          Search
        </Button>
      </Box>
      <List>
        {searchResults.map((result, index) => (
          <ListItem key={index} style={{ marginBottom: '10px' }}>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Box>
                <Typography variant="body1">{result['1. symbol']}</Typography>
                <Typography variant="body2">{result['2. name']}</Typography>
              </Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => addToWishlist(result['1. symbol'], result['2. name'])}
                disabled={userData.wishlist.some(item => item.symbol === result['1. symbol'])}
              >
                Add to Wishlist
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default StockSearch;



//tep data if incase alpha server credits over
const temp_symbols = [
  {
    '1. symbol': 'APLE',
    '2. name': 'Apple Hospitality REIT Inc'
  },
  {
    '1. symbol': 'AAPL',
    '2. name': 'Apple Inc'
  },
  {
    '1. symbol': 'AAPL34.SAO',
    '2. name': 'Apple Inc'
  },
  {
    '1. symbol': 'APC.DEX',
    '2. name': 'Apple Inc'
  },
  {
    '1. symbol': 'APC.FRK',
    '2. name': 'Apple Inc'
  },
  {
    '1. symbol': 'AGPL',
    '2. name': 'Apple Green Holding Inc'
  },
  {
    '1. symbol': '0R2V.LON',
    '2. name': 'Apple Inc.'
  },
  {
    '1. symbol': '500014.BSE',
    '2. name': 'Apple Finance Limited'
  },
  {
    '1. symbol': '48T.FRK',
    '2. name': 'APPLE HOSPITALITY REIT'
  },
  {
    '1. symbol': '603020.SHH',
    '2. name': 'Apple Flavor Fragrance Group Company Ltd'
  },
  {
    '1. symbol': 'MA',
    '2. name': 'Mastercard Incorporated - Class A'
  },
  {
    '1. symbol': 'MAA',
    '2. name': 'Mid-America Apartment Communities Inc'
  },
  {
    '1. symbol': 'MA3.FRK',
    '2. name': 'MED ACTION IND INC'
  },
  {
    '1. symbol': 'MA5.FRK',
    '2. name': 'MACROMILL INC. O.N.'
  },
  {
    '1. symbol': 'MA6.FRK',
    '2. name': 'Marks and Spencer Group plc'
  },
  {
    '1. symbol': 'MAAAX',
    '2. name': 'MAINSTAY EPOCH U.S. ALL CAP FUND CLASS A'
  },
  {
    '1. symbol': 'MA10.FRK',
    '2. name': 'BINECT AG INH O.N.'
  },
  {
    '1. symbol': 'MA10.DEX',
    '2. name': 'Binect AG'
  },
  {
    '1. symbol': 'MA13.PAR',
    '2. name': 'Lyxor UCITS EuroMTS Highest Rated Macro-Weighted Govt Bond 1-3Y DR'
  },
  {
    '1. symbol': 'MA35.PAR',
    '2. name': 'Lyxor UCITS EuroMTS Highest Rated Macro-Weighted Govt Bond 3-5Y DR'
  }
];
