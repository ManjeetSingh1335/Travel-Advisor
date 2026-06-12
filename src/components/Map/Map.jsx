import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import restImage from '../../images/rest.png';
import mapStyles from '../../mapStyles';
import useStyles from './styles.js';

const Map=({coords,places,setCoords,setBounds,setChildClicked,weatherData})=>{
  const is_Desktop=useMediaQuery('(min-width:600px)');
  const classes=useStyles();

  return (
    <div className={classes.mapContainer}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyBW48CrSPmiftcMpF2iWTSYXNuMZbWVlQI' }}

            defaultCenter={coords}
            center={coords}
            defaultZoom={14}
            margin={[50, 50, 50, 50]}
            options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}

            onChange={(e)=>{
                setCoords({ lat: e.center.lat, lng: e.center.lng });
                setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
            }}
            onChildClick={(child) => 
                setChildClicked(child)
            }
        >

       {places.length && places.map((place,i)=>(
        <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
        >

            {!is_Desktop ? 
              <LocationOnOutlinedIcon color="primary" fontSize="large" /> : 
              (
                <Paper elevation={3} className={classes.paper}>
                    <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                        <img
                          className={classes.pointer}
                          src={
                          place?.photo?.images?.large?.url ||
                          place?.photo?.images?.medium?.url ||
                          restImage
                      }
                      />
                    <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )
              }
          </div>
        ))}

        {weatherData?.list?.length ? (
          weatherData.list.map((data, i) => (
            <div key={i} lat={data.coord.lat} lng={data.coord.lon} className={classes.weatherContainer}>
              <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="35px" alt="weather" />
            </div>
          ))
        ) : weatherData?.weather?.length ? (
          <div lat={weatherData.coord?.lat || coords.lat} lng={weatherData.coord?.lon || coords.lng} className={classes.weatherContainer}>
            <img src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} height="35px" alt="weather" />
          </div>
        ) : weatherData?.current?.condition?.icon ? (
          <div lat={weatherData.location?.lat || coords.lat} lng={weatherData.location?.lon || coords.lng} className={classes.weatherContainer}>
            <img src={weatherData.current.condition.icon.startsWith('http') ? weatherData.current.condition.icon : `https:${weatherData.current.condition.icon}`} height="35px" alt="weather" />
          </div>
        ) : null}

      </GoogleMapReact>
    </div>
  );
};

export default Map;