export const getInitials = (string) =>
  string
    .split(' ')
    .map(([x]) => x)
    .slice(0, 2)
    .join('')
    .toUpperCase();
