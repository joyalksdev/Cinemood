const KEY = "cinemood-watchlist";

export const getWatchlist = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const addToWatchlist = (movie) => {
  const list = getWatchlist();
  localStorage.setItem(KEY, JSON.stringify([...list, movie]));
};

export const removeFromWatchlist = (id) => {
  const list = getWatchlist().filter(m => m.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
};

export const isInWatchlist = (id) => {
  return getWatchlist().some(m => m.id === id);
};
