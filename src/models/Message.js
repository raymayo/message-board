import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    recipient: { type: String, required: true },
    department: { type: String, required: true },
    yearLevel: { type: String, required: true },
    message: { type: String, required: true },
    track: { type: Object, default: {} },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

export default mongoose.model('Message', MessageSchema);
