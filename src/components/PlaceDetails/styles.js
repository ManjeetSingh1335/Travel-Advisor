import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  chip: {
    margin: '5px 5px 5px 0',
    // CHANGED: Styled tags to have translucent slate borders and modern height
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    fontSize: '0.75rem',
    height: '24px',
    '&:hover': {
      backgroundColor: 'rgba(99, 102, 241, 0.15)',
      borderColor: 'rgba(99, 102, 241, 0.3)',
    }
  },
  subtitle: {
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px', 
    marginTop: '12px',
    fontSize: '0.85rem',
    color: '#94a3b8',
    '& svg': {
      color: '#6366f1',
      fontSize: '1.2rem',
    }
  },
  spacing: {
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px', 
    marginTop: '8px',
    fontSize: '0.85rem',
    color: '#94a3b8',
    '& svg': {
      color: '#6366f1',
      fontSize: '1.2rem',
    }
  },
}));