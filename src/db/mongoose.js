
const mongoose = require('mongoose');
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0-kv3pr.mongodb.net/${process.env.MONGODB_DB}`;
try {
  mongoose.connect(MONGODB_URI,
    { 
        useCreateIndex: true, 
        useNewUrlParser: true,
        useFindAndModify:false
    });  
} catch (error) {
  console.log(error);
}

