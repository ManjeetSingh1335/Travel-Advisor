import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import restImage from '../../images/rest.png';
import useStyles from './styles.js';

const PlaceDetails=({place,selected,refProp})=>{
    if(selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const classes=useStyles();

  return (
    <Card elevation={6}>

      <CardMedia
        style={{ height: 350 }}
        image={
          place?.photo?.images?.large?.url ||
          place?.photo?.images?.medium?.url ||
          restImage
        }
        title={place.name}
      />

      <CardContent>

        <Typography gutterBottom variant="h5">{place.name}</Typography>

        <Box display="flex" justifyContent="space-between" my={2}>
            <Rating name="read-only" value={Number(place.rating)} readOnly />
            <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
            <Typography component="legend">Price</Typography>
            <Typography gutterBottom variant="subtitle1">
                {place.price_level}
            </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
            <Typography component="legend">Ranking</Typography>
            <Typography gutterBottom variant="subtitle1">
                {place.ranking}
            </Typography>
        </Box>

        {place?.awards?.map((award)=>(
          <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
            <img src={award.images.small} />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}

        {place?.cuisine?.map(({name})=>(
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}

        {place.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon />{place.address}
          </Typography>
        )}

        {place.phone && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            <PhoneIcon /> {place.phone}
          </Typography>
        )}

      </CardContent>

      <CardActions style={{ padding: '8px 16px 16px 16px', display: 'flex', gap: '8px' }}>
        <Button 
          size="small" 
          color="primary" 
          variant="outlined" 
          style={{ borderRadius: '20px', textTransform: 'none', fontWeight: 500, padding: '5px 15px' }}
          onClick={()=>window.open(place.web_url, '_blank')}
        >
          Trip Advisor
        </Button>
        <Button 
          size="small" 
          color="secondary" 
          variant="contained" 
          style={{ borderRadius: '20px', textTransform: 'none', fontWeight: 500, padding: '5px 15px', color: '#fff' }}
          onClick={()=>window.open(place.website, '_blank')}
        >
          Website
        </Button>
      </CardActions>

    </Card>
  );
};

export default PlaceDetails;