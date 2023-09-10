export const generateFullAddress = (location) => {
  if (!location) return '';
  return (
    (location.region ? `${location.region}` : '') +
    (location.municipality ? `, ${location.municipality}` : '') +
    (location.village ? `, ${location.village}` : '')
  );
};
