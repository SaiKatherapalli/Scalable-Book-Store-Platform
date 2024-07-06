import express, { response } from "express";
import mongoose from "mongoose";
const app = express();
import { PORT, mongoDBURL } from "./config.js";
import bookRoute from "./routes/bookRoute.js"
import cors from 'cors';

//middleware
app.use(cors());
app.use(express.json());
app.use('/books', bookRoute);

app.get('/', (req, res) => {
    res.status(230).send("Welcome");
})

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log(`App connected to Database`);
        app.listen(PORT, () => {
            console.log(`Listening port....${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error);
    })