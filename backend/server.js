import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import colors from 'colors';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js'; 



//INITIALISING DOTENV AND EXPRESS
dotenv.config();
const app = express();
const {PORT, NODE_ENV} = process.env;

//connection to the database.
connectDB();

//CRUD
//Neutral expression.
app.get('/', (req, res)=>{
    res.send('Api is running');
});


app.use('/api/products', productRoutes);


/**MIDDLEWARE */
//When we send also a messed up request, we get an html response to avoid it like to get a json object we do:
app.use(notFound);

//Middle ware allows us to get a json error instead of a html file error test it later
app.use(errorHandler);


//SETTING THE PORT 
const PORTV = PORT || 5000;
app.listen(PORT, console.log(`Server is running in ${NODE_ENV} mode on port ${PORTV}`.bold.green));


/** Second part is by setting or env.
 * Third part is by setting or server.js:
 * insall our dotenv module and import it here,
 * download express and import it here,
 * to not forget to: set "type": "module" under name, version, type
 * 
 * AFTER THAT WE INITIALIZE OUR PORTS AND ESTABLISH THE CONNECTION WITH OUR DATABASE.
 * 
 * IN OUR SCRIPTS WE SET OUR SCRIPTS: AS FOLLOWED: 
 * "server": "nodemon backend/server"
 * 
 * Before running we could check if our page is receiving any data with the neutral expression of our crud
 */