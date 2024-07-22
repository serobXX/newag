export const getQueryParamByName = (name: string, url = window.location.href) => {
  const formattedName = name.replace(/[\\[\]]/g, '\\$&');
  const results = new RegExp('[?&]' + formattedName + '(=([^&#]*)|&|#|$)').exec(url);

  if (!results) return null;

  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
