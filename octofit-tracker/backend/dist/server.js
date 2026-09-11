import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Activity } from './models/Activity.js';
import { Leaderboard } from './models/Leaderboard.js';
import { Team } from './models/Team.js';
import { User } from './models/User.js';
import { Workout } from './models/Workout.js';
const app = express();
const port = 8000;
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express.json());
app.use(cors());
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
});
app.get('/api/users', (_request, response) => {
    User.find().populate('team').sort({ username: 1 })
        .then((users) => response.json(users))
        .catch(() => response.status(500).json({ error: 'Unable to load users' }));
});
app.get('/api/activities', (_request, response) => {
    Activity.find().populate('user', 'username email').sort({ completedAt: -1 })
        .then((activities) => response.json(activities))
        .catch(() => response.status(500).json({ error: 'Unable to load activities' }));
});
app.get('/api/teams', (_request, response) => {
    Team.find().sort({ name: 1 })
        .then((teams) => response.json(teams))
        .catch(() => response.status(500).json({ error: 'Unable to load teams' }));
});
app.get('/api/leaderboard', (_request, response) => {
    Leaderboard.find()
        .populate('user', 'username')
        .populate('team', 'name')
        .sort({ rank: 1 })
        .then((leaders) => response.json(leaders))
        .catch(() => response.status(500).json({ error: 'Unable to load leaderboard' }));
});
app.get('/api/workouts', (_request, response) => {
    Workout.find().sort({ title: 1 })
        .then((workouts) => response.json(workouts))
        .catch(() => response.status(500).json({ error: 'Unable to load workouts' }));
});
mongoose.connect(connectionString)
    .then(() => {
    console.log('Connected to octofit_db');
    app.listen(port, () => {
        console.log(`OctoFit Tracker backend listening at ${apiBaseUrl}`);
    });
})
    .catch((error) => {
    console.error('Unable to connect to MongoDB:', error);
    process.exit(1);
});
