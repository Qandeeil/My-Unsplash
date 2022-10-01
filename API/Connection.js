const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Qandeeil:sIczRz1AWkKHX45B@cluster0.wqfwxbi.mongodb.net/myUnsplash', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
    console.log("we're connected!")
});