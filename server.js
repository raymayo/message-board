/* eslint-disable no-undef */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import Message from './src/models/Message.js';



const app = express();
const PORT =  process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
  origin: 'https://kns-confession.vercel.app', // Allow requests from your frontend
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

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
      const query = {};
  
      if (recipient) query.recipient = new RegExp(recipient, "i");
      if (department) query.department = new RegExp(department, "i");
      if (yearLevel) query.yearLevel = new RegExp(yearLevel, "i");
      if (lastId) query._id = { $lt: lastId };
  
      const notes = await Message.find(query)
        .sort({ createdAt: -1 })
        .limit(Number(limit));
  
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  



app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));