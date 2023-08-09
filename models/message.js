import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    message: String,
    from: String
})

export default mongoose.model('Message', MessageSchema);

