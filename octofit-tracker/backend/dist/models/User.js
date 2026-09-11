import { model, Schema } from 'mongoose';
const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: { type: String, default: 'member' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true });
export const User = model('User', userSchema);
