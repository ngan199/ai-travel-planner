import axios from 'axios';

const accessToken = import.meta.env.VITE_UNSPLASH_API_KEY

export const fetchImages = async (names, isSingle) => {
  const requests = names.map(name =>
    axios.get(`https://api.unsplash.com/search/photos?query=${name}&client_id=${accessToken}`)
      .then(res => ({ [name]: res.data.results?.[0]?.urls?.full }))
      .catch(() => ({ [name]: '' }))
  );

  const results = await Promise.all(requests);
  return Object.assign({}, ...results);
};
