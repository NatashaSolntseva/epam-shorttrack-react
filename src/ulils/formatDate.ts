export function formatDate(input: string): string {
  const [mm, dd, yyyy] = input.split('/');
  if (!mm || !dd || !yyyy) return input;
  return `${dd.padStart(2, '0')}.${mm.padStart(2, '0')}.${yyyy}`;
}
