export const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export async function fetchCollection(resource, endpoint = `${apiBaseUrl}/${resource}/`) {
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`)
  }

  const payload = await response.json()
  const collection = payload?.results ?? payload?.data ?? payload?.items ?? payload

  if (Array.isArray(collection)) {
    return collection
  }

  return collection ? [collection] : []
}