import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'
import { getLabel } from './utils.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('teams').then(setTeams).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return <section className="view-section"><div className="section-heading"><div><span className="eyebrow">Collective goals</span><h2>Teams</h2></div><span className="count-badge">{teams.length} teams</span></div><CollectionState loading={state.loading} error={state.error} empty={!teams.length}><div className="data-grid">{teams.map((team, index) => <article className="data-card" key={team._id ?? team.id ?? index}><span className="card-kicker">Team {String(index + 1).padStart(2, '0')}</span><h3>{getLabel(team)}</h3><p>{team.members?.length ?? team.memberCount ?? 0} members</p></article>)}</div></CollectionState></section>
}

export default Teams