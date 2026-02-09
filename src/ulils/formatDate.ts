export function formatDate(input: string): string {
  const [mm, dd, yyyy] = input.split('/');
  if (!mm || !dd || !yyyy) return input;
  return `${dd.padStart(2, '0')}.${mm.padStart(2, '0')}.${yyyy}`;
}

export function toMMDDYYYY(date: Date): string {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = String(date.getFullYear());
  return `${mm}/${dd}/${yyyy}`;
}
