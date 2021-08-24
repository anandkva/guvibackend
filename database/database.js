const mongoose = require('mongoose');
const query = 'mongodb+srv://Anand:12345@cluster0.7lpqy.mongodb.net/guviProjectDatabase'
const db = (query);
const dbConnection = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (error) => {
        if (!error) {
            console.log("Database connect Successfully");
        } else {
            console.log("Error!" + error);
        }
    });
}
module.exports = {
    dbConnection
}