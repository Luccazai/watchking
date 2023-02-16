import axios from 'axios';

export default (url = 'https://moviesdatabase.p.rapidapi.com') => {
  const axiosObject = axios.create({
    baseURL: url,
    headers: {
      'X-RapidAPI-Key': '92226cad8dmsh807c053297bbb85p13ce76jsn911cf988a7a6',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
    },
  });

  return axiosObject;
};
