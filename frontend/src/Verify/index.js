import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import api from 'api';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 64,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { match: { params = {} }} = props;

  useEffect(() => {
    if (params.token) {
      try {
        (async function anyNameFunction() {
          await api.verifyUser({
            uid: params.id,
            token: params.token,
          });

          setTimeout(function(){ dispatch(push('/signin')); }, 1000);
        })();
      } catch (error) {
        dispatch(push('/signup'));
      }
    }
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Thank you for verifying your account!
        </Typography>
      </div>
    </Container>
  );
}
