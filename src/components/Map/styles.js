import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(() => ({

  paper: {
    padding: '8px', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    width: '100px',
    backgroundColor: 'rgba(17, 24, 39, 0.85) !important',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    '& img': {
      borderRadius: '6px',
      margin: '4px 0',
    }
  },

  mapContainer: {
  
    height: '85vh', 
    width: '100%',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },

  markerContainer: {
    position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
  },

  pointer: {
    cursor: 'pointer',
  },

  weatherContainer: {
    background: 'rgba(15, 23, 42, 0.85)',
    backdropFilter: 'blur(8px)',
    borderRadius: '50%',
    padding: '2px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '48px',
    height: '48px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.15)',
      borderColor: 'rgba(99, 102, 241, 0.6)',
      boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
    }
  },
  
}));