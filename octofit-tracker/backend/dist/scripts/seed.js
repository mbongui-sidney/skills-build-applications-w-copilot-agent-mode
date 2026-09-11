import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Team.deleteMany({}),
            User.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const teams = await Team.create([
            { name: 'Summit Crew', motto: 'Climb higher together' },
            { name: 'Dawn Patrol', motto: 'Start strong, stay steady' },
        ]);
        const users = await User.create([
            { username: 'maya.chen', email: 'maya.chen@example.com', role: 'captain', team: teams[0]._id },
            { username: 'jon.bell', email: 'jon.bell@example.com', role: 'member', team: teams[0]._id },
            { username: 'sara.ortiz', email: 'sara.ortiz@example.com', role: 'captain', team: teams[1]._id },
            { username: 'noah.wright', email: 'noah.wright@example.com', role: 'member', team: teams[1]._id },
        ]);
        await Team.findByIdAndUpdate(teams[0]._id, { members: [users[0]._id, users[1]._id] });
        await Team.findByIdAndUpdate(teams[1]._id, { members: [users[2]._id, users[3]._id] });
        await Activity.create([
            { user: users[0]._id, type: 'Run', name: 'River loop', duration: 42, calories: 410, completedAt: new Date('2026-09-10') },
            { user: users[1]._id, type: 'Ride', name: 'Park circuit', duration: 55, calories: 520, completedAt: new Date('2026-09-09') },
            { user: users[2]._id, type: 'Strength', name: 'Full body reset', duration: 35, calories: 280, completedAt: new Date('2026-09-10') },
            { user: users[3]._id, type: 'Yoga', name: 'Mobility flow', duration: 30, calories: 160, completedAt: new Date('2026-09-08') },
        ]);
        await Leaderboard.create([
            { user: users[0]._id, team: teams[0]._id, points: 1240, rank: 1, week: '2026-W37' },
            { user: users[2]._id, team: teams[1]._id, points: 1110, rank: 2, week: '2026-W37' },
            { user: users[1]._id, team: teams[0]._id, points: 980, rank: 3, week: '2026-W37' },
            { user: users[3]._id, team: teams[1]._id, points: 870, rank: 4, week: '2026-W37' },
        ]);
        await Workout.create([
            { title: 'Baseline Builder', description: 'A balanced session for consistent progress.', level: 'Beginner', duration: 25, focus: 'Full body' },
            { title: 'Tempo Ladder', description: 'Intervals to build speed and aerobic control.', level: 'Intermediate', duration: 35, focus: 'Cardio' },
            { title: 'Power Circuit', description: 'A demanding strength circuit for experienced athletes.', level: 'Advanced', duration: 45, focus: 'Strength' },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
