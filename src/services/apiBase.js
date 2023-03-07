import axios from 'axios';

export default (url = 'https://moviesdatabase.p.rapidapi.com') => {
  const axiosObject = axios.create({
    baseURL: url,
    headers: {
      'X-RapidAPI-Key': '84b11b91efmsh5a8e6183ba97dd0p102a8cjsnd04d9b925fba',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
    },
  });

  return axiosObject;
};
