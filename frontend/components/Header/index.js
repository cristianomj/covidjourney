import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Link from 'components/Link';
import { useAuthDataContext } from "components/AuthDataProvider";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    float: 'left',
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  profileButton: {
    marginRight: 10,
  },
}));

const title = 'Corona Journey';
const sections = [
  { title: 'Quarantine', url: '#' },
  { title: 'Supermarket', url: '#' },
  { title: 'Symptoms', url: '#' },
  { title: 'No Gym', url: '#' },
  { title: 'Tinder', url: '#' },
  { title: 'Divorce', url: '#' },
  { title: 'Unemployment', url: '#' },
  { title: 'RNs', url: '#' },
];

export default function Header() {
  const classes = useStyles();
  const { user, onSignOut } = useAuthDataContext();

  const handleClick = () => {
    if (user) {
      onSignOut();
    }
  };

  return (
    <Container maxWidth="lg">
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <div>
          <IconButton>
            <SearchIcon />
          </IconButton>
          {user &&
            <Link href='/profile' variant="body2" className={classes.profileButton}>
              <Button variant="outlined" size="small">
                Profile
              </Button>
            </Link>
          }
          <Link href={user ? '/' : '/signin'} variant="body2">
            <Button variant="outlined" size="small" onClick={handleClick}>
              {user ? 'Sign Out' : 'Sign In'}
            </Button>
          </Link>
        </div>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </Container>
  );
}
