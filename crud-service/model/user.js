import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

// how our document look like
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensure usernames are unique
      },
      password: {
        type: String,
        required: true
      },
    wishlist:Array
});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'user');
// we need to turn it into a model
const postUser = mongoose.model('user', userSchema);

export default postUser;