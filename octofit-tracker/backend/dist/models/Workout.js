import { model, Schema } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    duration: { type: Number, required: true, min: 1 },
    focus: { type: String, required: true },
}, { timestamps: true });
export const Workout = model('Workout', workoutSchema);
