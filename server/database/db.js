import mongoose from 'mongoose';

const Connection = async (username, password) => {
 const URL = `mongodb+srv://${username}:${password}@cluster0.1w2nxxf.mongodb.net/blendnet_database?retryWrites=true&w=majority`;
    try {
        
        mongoose.set('debug', true);

        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }
}

export default Connection;




