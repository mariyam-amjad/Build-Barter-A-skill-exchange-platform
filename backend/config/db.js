const mongoose = require("mongoose");

const connectDB = async() =>{
    const DB_NAME = 'SkillSwapDB'
    const DB_URI = "mongodb://localhost:27017/skillswap"
    
    try{
        const connectionInstance = await mongoose.connect(DB_URI)
        console.log(`\nMONGO DB CONNECTED !!`);

    }catch(err){
        console.log(`MONGODB CONNECTION ERROR: ${err}`);
        process.exit(1);
    }
}

module.exports = connectDB;