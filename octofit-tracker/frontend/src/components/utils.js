export function getLabel(value, fallback = 'Unnamed') {
  if (typeof value === 'string' || typeof value === 'number') return value
  return value?.name ?? value?.username ?? value?.title ?? fallback
}