import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'
import { getLabel } from './utils.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('workouts').then(setWorkouts).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return <section className="view-section"><div className="section-heading"><div><span className="eyebrow">Suggested training</span><h2>Workouts</h2></div><span className="count-badge">{workouts.length} plans</span></div><CollectionState loading={state.loading} error={state.error} empty={!workouts.length}><div className="data-grid">{workouts.map((workout, index) => <article className="data-card" key={workout._id ?? workout.id ?? index}><span className="card-kicker">Plan {String(index + 1).padStart(2, '0')}</span><h3>{getLabel(workout)}</h3><p>{workout.duration ? `${workout.duration} min` : workout.level ?? 'Ready when you are'}</p></article>)}</div></CollectionState></section>
}

export default Workouts