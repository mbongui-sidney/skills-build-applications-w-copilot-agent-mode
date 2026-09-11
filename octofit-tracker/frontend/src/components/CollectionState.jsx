export function CollectionState({ loading, error, empty, children }) {
  if (loading) {
    return <div className="state-panel" role="status">Loading data...</div>
  }

  if (error) {
    return <div className="state-panel state-error" role="alert">{error}</div>
  }

  if (empty) {
    return <div className="state-panel">No data available yet.</div>
  }

  return children
}