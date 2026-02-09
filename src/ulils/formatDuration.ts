export function formatDuration(minutesTotal: number): string {
  if (!Number.isFinite(minutesTotal) || minutesTotal <= 0) return '';

  const hours = Math.floor(minutesTotal / 60);
  const minutes = minutesTotal % 60;

  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');

  return `${hh}:${mm} hours`;
}
