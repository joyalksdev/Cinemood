export const getPosterUrl = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};

export const shortenText = (text, length = 100) => {
  return text.length > length ? text.slice(0, length) + "..." : text;
};

export const ratingToStars = (rating) => {
  return Math.round(rating / 2);
};
