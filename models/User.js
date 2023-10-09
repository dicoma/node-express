// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    email: String,
    profilePic: String,
    themeSetting: Object,
    notificationSetting: Object,
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);
