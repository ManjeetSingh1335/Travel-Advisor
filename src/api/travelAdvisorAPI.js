import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const options = {
        method: 'GET',
        url: 'https://open-weather-map-api5.p.rapidapi.com/weather.php',
        params: {
          lat,
          lon: lng,
        },
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
          'x-rapidapi-host': 'open-weather-map-api5.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.request(options);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};