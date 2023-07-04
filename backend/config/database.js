const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true, 
    //   useFindAndModify: false, 
    })
    .then(() => {
      console.log(`Connected to MongoDB database using Mongoose`);
    })
    .catch((err) => {
      console.log(`Error connecting to MongoDB: ${err}`);
    });
};

module.exports = connectDatabase;
