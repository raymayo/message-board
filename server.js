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


app.get('/notes', async (req, res) => {
    try {
        const { recipient, department, yearLevel, lastId, limit = 10 } = req.query;
        const searchConditions = [];

        // Apply search filters if provided
        if (recipient) searchConditions.push({ recipient: { $regex: recipient, $options: "i" } });
        if (department) searchConditions.push({ department: { $regex: department, $options: "i" } });
        if (yearLevel) searchConditions.push({ yearLevel: { $regex: yearLevel, $options: "i" } });

        // Construct search query
        const query = searchConditions.length > 0 ? { $and: searchConditions } : {};

        // Lazy Loading: If lastId is provided, fetch only newer results
        if (lastId) {
            query._id = { $lt: lastId }; // Load notes **older** than last loaded note
        }

        // Fetch notes (lazy load)
        const notes = await Message.find(query)
            .sort({ createdAt: -1 }) // Sort by newest first
            .limit(parseInt(limit, 10)); // Limit results per request

        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));