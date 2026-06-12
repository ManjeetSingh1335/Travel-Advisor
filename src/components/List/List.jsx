import React,{useState,useEffect,createRef} from 'react';
import {CircularProgress,Grid,Typography,InputLabel,MenuItem,FormControl,Select} from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles.js';

const List=({places,type,setType,rating,setRating,childClicked,isLoading})=>{
  const [elRefs,setElRefs]=useState([]);
  const classes=useStyles();

  useEffect(() => {
    setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  const getTagline = () => {
    switch(type) {
      case 'restaurants':
        return 'Top Dining & Restaurants';
      case 'hotels':
        return 'Premium Stays & Hotels';
      case 'attractions':
        return 'Must-Visit Attractions';
      default:
        return 'Explore Places Around You';
    }
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" style={{ fontWeight: 600, letterSpacing: '0.5px' }}>
        {getTagline()}
      </Typography>
      
      {isLoading ? 
      (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : 
      (
        <>
          <FormControl className={classes.formControl}>
              <InputLabel id="type">Type</InputLabel>
                  <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                      <MenuItem value="restaurants">Restaurants</MenuItem>
                      <MenuItem value="hotels">Hotels</MenuItem>
                      <MenuItem value="attractions">Attractions</MenuItem>
                  </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
              <InputLabel id="rating">Rating</InputLabel>
                  <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="3">Above 3.0</MenuItem>
                      <MenuItem value="4">Above 4.0</MenuItem>
                      <MenuItem value="4.5">Above 4.5</MenuItem>
                  </Select>
          </FormControl>

          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
               <Grid ref={elRefs[i]} key={i} item xs={12}>
                 <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
               </Grid>
            ))}
          </Grid>
        </>
      )
      }
    </div>
  );
};

export default List;