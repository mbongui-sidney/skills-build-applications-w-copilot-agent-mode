import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-lockup">
          <span className="brand-mark">O</span>
          <div>
            <span className="eyebrow">Performance desk</span>
            <h1>OctoFit Tracker</h1>
          </div>
        </div>
        <span className="status-pill"><span className="status-dot" /> API ready</span>
      </header>

      <nav className="app-nav" aria-label="Main navigation">
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>

      <main className="app-content">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
