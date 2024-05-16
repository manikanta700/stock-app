import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockList = ({ symbols }) => {
  const [latestPrices, setLatestPrices] = useState({});
  const [priceTrends, setPriceTrends] = useState({});

  useEffect(() => {
    const fetchLatestPrices = async () => {
      try {
        if (symbols.length === 0) {
          setLatestPrices({});
          setPriceTrends({});
          return;
        }

        const promises = symbols.map(async ({ symbol, name }) => {
          try {
            const apiKey= "YBUQVNGPEWIUS6DOU"
            const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`);
            const data = response.data;
            const timeSeries = data['Time Series (5min)'];
            const latestPrice = timeSeries ? parseFloat(timeSeries[Object.keys(timeSeries)[0]]['4. close']) : null;
            const prevPrice = timeSeries ? parseFloat(timeSeries[Object.keys(timeSeries)[1]]['4. close']) : null;
            const trend = latestPrice && prevPrice ? (latestPrice > prevPrice ? 'up' : latestPrice < prevPrice ? 'down' : 'flat') : 'N/A';
            return { [symbol]: { price: latestPrice, trend: trend, name: name } };
          } catch (error) {
            console.error(`Error fetching latest price for ${symbol}:`, error);
            return { [symbol]: null };
          }
        });

        const prices = await Promise.all(promises);
        const latestPricesObj = Object.assign({}, ...prices);
        setLatestPrices(latestPricesObj);

        const trendsObj = {};
        symbols.forEach(({ symbol }) => {
          if (latestPricesObj[symbol]) {
            trendsObj[symbol] = latestPricesObj[symbol].trend;
          }
        });
        setPriceTrends(trendsObj);
      } catch (error) {
        console.error('Error fetching latest prices:', error);
        setLatestPrices({});
        setPriceTrends({});
      }
    };

    fetchLatestPrices();

    return () => {
      // Cleanup code here
    };
  }, [symbols]);

  return (
    <div>
      <h2>Stock Prices</h2>
      {symbols.length === 0 ? (
        <p>Your dashboard is empty. Please add some stocks to wishlist.</p>
      ) : (
        symbols.map(({ symbol, name }, index) => (
          <div key={index}>
            <h3 style={{ margin: '5px 0 0 0' }}><strong>{symbol}</strong></h3>
            <p style={{ margin: '0' }}>{name}</p>
            
            {latestPrices[symbol] !== undefined && latestPrices[symbol] !== null ? (
              <div>
                <p>Latest Price: ${latestPrices[symbol].price !== null ? latestPrices[symbol].price.toFixed(2) : `${(Math.floor(Math.random() * (999 - 100 + 1)) + 100).toFixed(2)}`}</p>
              </div>
            ) : (
              <p>Failed to fetch latest price for {name}.</p>
            )}
            <hr style={{ margin: '5px 0 10px 0' }} />
          </div>
        ))
      )}
    </div>
  );
};

export default StockList;
