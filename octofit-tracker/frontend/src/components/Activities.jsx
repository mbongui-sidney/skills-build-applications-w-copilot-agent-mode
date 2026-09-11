import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'
import { getLabel } from './utils.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('activities')
      .then((items) => setActivities(items))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="view-section">
      <div className="section-heading"><div><span className="eyebrow">Daily movement</span><h2>Activities</h2></div><span className="count-badge">{activities.length} logged</span></div>
      <CollectionState loading={state.loading} error={state.error} empty={!activities.length}>
        <div className="data-grid">{activities.map((activity, index) => <article className="data-card" key={activity._id ?? activity.id ?? index}><span className="card-kicker">{activity.type ?? 'Activity'}</span><h3>{getLabel(activity.name ?? activity)}</h3><p>{activity.duration ? `${activity.duration} min` : activity.description ?? 'Tracked session'}</p></article>)}</div>
      </CollectionState>
    </section>
  )
}

export default Activities