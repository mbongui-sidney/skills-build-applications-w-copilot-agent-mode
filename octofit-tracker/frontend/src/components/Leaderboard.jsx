import { useEffect, useState } from 'react'
import { codespaceName, fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'
import { getLabel } from './utils.js'

function Leaderboard() {
  const leaderboardEndpoint = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard` : 'http://localhost:8000/api/leaderboard/'
  const [leaders, setLeaders] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('leaderboard', leaderboardEndpoint).then(setLeaders).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })))
  }, [leaderboardEndpoint])

  return <section className="view-section"><div className="section-heading"><div><span className="eyebrow">Team pulse</span><h2>Leaderboard</h2></div><span className="count-badge">Top performers</span></div><CollectionState loading={state.loading} error={state.error} empty={!leaders.length}><div className="leader-list">{leaders.map((leader, index) => <div className="leader-row" key={leader._id ?? leader.id ?? index}><span className="rank">{String(index + 1).padStart(2, '0')}</span><strong>{getLabel(leader.user ?? leader)}</strong><span className="score">{leader.points ?? leader.score ?? 0} pts</span></div>)}</div></CollectionState></section>
}

export default Leaderboard