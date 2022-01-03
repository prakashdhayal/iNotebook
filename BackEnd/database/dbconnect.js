const mongoose = require('mongoose');

const connectToMongo = (mongoURI) => {
    try {
        mongoose.connect(mongoURI, () => {
            console.log("Database connection successsfully !");
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToMongo;
