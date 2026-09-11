import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'
import { getLabel } from './utils.js'

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('users').then(setUsers).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return <section className="view-section"><div className="section-heading"><div><span className="eyebrow">Member directory</span><h2>Users</h2></div><span className="count-badge">{users.length} members</span></div><CollectionState loading={state.loading} error={state.error} empty={!users.length}><div className="data-grid">{users.map((user, index) => <article className="data-card" key={user._id ?? user.id ?? index}><span className="card-kicker">Profile {String(index + 1).padStart(2, '0')}</span><h3>{getLabel(user)}</h3><p>{user.email ?? user.role ?? 'OctoFit member'}</p></article>)}</div></CollectionState></section>
}

export default Users