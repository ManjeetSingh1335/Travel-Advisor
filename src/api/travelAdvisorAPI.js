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
      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: lat,
          longitude: lng,
          current: 'weather_code',
        }
      });
      
      const { latitude, longitude, current } = response.data;
      const wmoCode = current?.weather_code || 0;
      
      let icon = '01d'; 
      if (wmoCode === 0) icon = '01d';
      //partly cloudy
      else if (wmoCode === 1 || wmoCode === 2) icon = '02d';
      //cloudy
      else if (wmoCode === 3) icon = '03d'; 
      //foggy
      else if (wmoCode === 45 || wmoCode === 48) icon = '50d'; 
      //rain
      else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(wmoCode)) icon = '10d'; 
      //snow
      else if ([71, 73, 75, 77, 85, 86].includes(wmoCode)) icon = '13d'; 
      //thunderstorm
      else if ([95, 96, 99].includes(wmoCode)) icon = '11d'; 

      const formattedData = {
        coord: {
          lat: latitude,
          lon: longitude,
        },
        weather: [
          {
            icon: icon,
          }
        ]
      };

      console.log("WEATHER RESPONSE:", formattedData);
      return formattedData;
    }
  } catch (error) {
    console.log(error);
  }
};