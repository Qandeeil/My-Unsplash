const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: {type: String},
    email: {type: String},
    password: {type: String},
    fullName: {type: String},
    createAt: {type: Date},
    profilePicture: {type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF6qvIc5hSbQeY7yzwKN-odLoLO_8fVmJTFoHmbwuM4pKyPuHIaGQPM_l1zH-ow1nppok&usqp=CAU'},
    country: {type: String},
    phoneNumber: {type: String},
    birthday: {type: String},
    gender: {type: String},
    post: [String]
});

const user = mongoose.model('user',UserSchema,'user');
module.exports = user