import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { createMuiTheme as createTheme, ThemeProvider } from '@material-ui/core/styles';
import { getPlacesData, getWeatherData } from './api/travelAdvisorAPI';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';
import { LoadScript } from '@react-google-maps/api';

const LIBRARIES = ['places']; 

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#6366f1', 
    },
    secondary: {
      main: '#f43f5e', 
    },
    background: {
      default: '#0b0f19', 
      paper: '#111827',   
    },
  },
  typography: {
    fontFamily: "'Outfit', sans-serif",
  },
  overrides: {
    MuiCard: {
      root: {
        background: 'rgba(17, 24, 39, 0.6) !important',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.35), 0 0 15px rgba(99, 102, 241, 0.15)',
          borderColor: 'rgba(99, 102, 241, 0.3)',
        },
      },
    },
  
    MuiAppBar: {
      root: {
        background: 'rgba(11, 15, 25, 0.8) !important',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: 'none',
      },
    },
  },
});

const App=()=>{
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      getWeatherData(coords.lat, coords.lng)
        .then((data) => setWeatherData(data));

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(
            data.filter(
              (place) =>
                place.name &&
                place.latitude &&
                place.longitude
            )
        );
          setFilteredPlaces([]);
          setRating('');
          setIsLoading(false);
        });
    }
  }, [bounds, type]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={LIBRARIES} 
      >
        <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
        <Grid container spacing={3} style={{ width: '100%', padding: '0 16px', marginTop: '16px' }}>
          <Grid item xs={12} md={4}>
            <List
              isLoading={isLoading}
              childClicked={childClicked}
              places={filteredPlaces.length ? filteredPlaces : places}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </Grid>
          <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Map
              setChildClicked={setChildClicked}
              setBounds={setBounds}
              setCoords={setCoords}
              coords={coords}
              places={filteredPlaces.length ? filteredPlaces : places}
              weatherData={weatherData}
            />
          </Grid>
        </Grid>
      </LoadScript>
    </ThemeProvider>
  );
};

export default App;