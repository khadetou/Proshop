import mongoose from 'mongoose';

const connectDB = async ()=>{
    
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`Connected to MongoDB ${conn.connection.host}`.bold.yellow);
    }catch(error){
        console.error(`Error: ${error.message}`.bold.red);
        process.exit(1);
    }
}

export default connectDB;


/**Dependencies to install:
 *  npm init, package.json
 * mongoose
 * express
 * colors
 * dotenv
 * 
 * */
//First part of our application setting up the connection to mongo db by using mongoose.