/* eslint-disable no-undef */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import Message from './src/models/Message.js';



const app = express();
const PORT =  5000;

app.use(express.json());
app.use(cors());
// import.meta.env.VITE_PORT ||

mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('Connected to MongoDB')).catch((err) => console.log(err));


app.post('/notes', async (req,res) => {
    try{
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json(newMessage);
    }catch (error) {
        res.status(500).json({error: error.message});
    }
})


app.get('/notes', async (req,res) => {
    try{
        const message = await Message.find();
        res.status(200).json(message);
    }catch (error) {
        res.status(500).json({error: error.message});
    }
})

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));