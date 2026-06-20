import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme)=>({

  title: {
    background:'linear-gradient(90deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
    boxShadow: 'none',
    display: 'none',
    fontWeight: 600,
    letterSpacing: '0.5px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  search: {
    position: 'relative',
    borderRadius: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': { 
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderColor: 'rgba(99, 102, 241, 0.5)',
      boxShadow: '0 0 12px rgba(99, 102, 241, 0.15)',
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(4), width: 'auto' },
  },

  searchIcon: {
    padding: theme.spacing(0, 2), height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#cbd5e1',
  },

  inputRoot: {
    color: 'inherit',
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0), paddingLeft: `calc(1em + ${theme.spacing(4)}px)`, transition: theme.transitions.create('width'), width: '100%', [theme.breakpoints.up('md')]: { width: '20ch' },
    fontFamily: "'Outfit', sans-serif",
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
  },
}));