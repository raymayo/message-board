import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  recipient: { type: String, required: true },
  department: { type: String, required: true },
  yearLevel: { type: String, required: true },
  message: { type: String, required: true },
  track: { type: Object, default: {} }
});

export default mongoose.model('Message', MessageSchema);
