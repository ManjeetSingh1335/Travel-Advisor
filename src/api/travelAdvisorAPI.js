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
    console.error("API Error or rate limit, generating mock data for type:", type, error);
    return generateMockPlaces(type, sw, ne);
  }
};

const generateMockPlaces = (type, sw, ne) => {
  if (!sw || !ne) return [];
  
  const count = 6;
  const places = [];
  
  const restaurantNames = [
    "The Golden Fork Bistro", "Ocean Breeze Seafood", "Bella Italia Trattoria", "Sakura Sushi Palace", 
    "The Urban Grill House", "Le Parisien Café", "Summit Steakhouse", "Green Garden Vegan"
  ];
  const hotelNames = [
    "Grand Plaza Hotel", "Ocean View Luxury Resort", "The Cozy Inn Suites", "Skyline Luxury Suites", 
    "Forest Edge Resort", "Boutique Garden Hotel", "Starlight Manor & Spa", "Summit Mountain Lodge"
  ];
  const attractionNames = [
    "Central Park Walkway", "Historical Museum of Art", "Scenic Valley Lookout", 
    "Old Town Square Historic Walk", "Adventure Theme Park", "Botanical conservatory & Gardens", "Golden Gate Viewpoint", "City Science Discovery Center"
  ];
  
  const cuisines = [
    [{ name: "Italian" }, { name: "Pizza" }],
    [{ name: "Japanese" }, { name: "Sushi" }],
    [{ name: "French" }, { name: "Fine Dining" }],
    [{ name: "American" }, { name: "Burgers" }],
    [{ name: "Vegetarian" }, { name: "Healthy" }],
    [{ name: "Seafood" }, { name: "Fresh" }]
  ];

  const restaurantImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&auto=format&fit=crop"
  ];
  
  const hotelImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=500&auto=format&fit=crop"
  ];
  
  const attractionImages = [
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1472214222541-d510753a4907?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=500&auto=format&fit=crop"
  ];

  for (let i = 0; i < count; i++) {
    const lat = sw.lat + Math.random() * (ne.lat - sw.lat);
    const lng = sw.lng + Math.random() * (ne.lng - sw.lng);
    
    let name = "";
    let imageUrl = "";
    let cuisineObj = [];
    
    if (type === 'restaurants') {
      name = restaurantNames[i % restaurantNames.length];
      imageUrl = restaurantImages[i % restaurantImages.length];
      cuisineObj = cuisines[i % cuisines.length];
    } else if (type === 'hotels') {
      name = hotelNames[i % hotelNames.length];
      imageUrl = hotelImages[i % hotelImages.length];
    } else {
      name = attractionNames[i % attractionNames.length];
      imageUrl = attractionImages[i % attractionImages.length];
    }

    places.push({
      name: name,
      latitude: lat.toString(),
      longitude: lng.toString(),
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
      num_reviews: Math.floor(Math.random() * 200) + 10,
      price: type === 'restaurants' ? "$$ - $$$" : type === 'hotels' ? "$120 - $250" : "Free - $$",
      price_level: "$$",
      ranking: `#${i + 1} best in this area`,
      address: `${Math.floor(Math.random() * 999) + 1} Main St, Travel City`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      web_url: "https://www.tripadvisor.com",
      website: "https://www.google.com",
      photo: {
        images: {
          large: {
            url: imageUrl
          },
          medium: {
            url: imageUrl
          }
        }
      },
      cuisine: cuisineObj,
      awards: [
        {
          images: {
            small: "https://www.tripadvisor.com/img/cdsi/img2/awards/v2/tch19_2x-38092-2.png"
          },
          display_name: "Travelers Choice 2026"
        }
      ]
    });
  }
  
  return places;
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