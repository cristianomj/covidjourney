import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { useAuthDataContext } from "components/AuthDataProvider";
import api from 'api';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    margin: '32px 0px',
    width: '100%',
  },
  userPanel: {
    backgroundColor: theme.palette.grey[800],
    padding: 15,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ProfileAdmin() {
  const classes = useStyles();
  const { user, token } = useAuthDataContext();
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleTitleChange = (event) => {
    if (title.length <= 100) {
      setTitle(event.target.value.slice(0, 100));
    }
  };

  const handleContentChange = (event) => {
    if (content.length <= 500) {
      setContent(event.target.value.slice(0, 500));
    }
  };

  const handleSuccess = () => {
    setOpen(true);
    setTitle('');
    setContent('');
  };

  const handlePublish = async () => {
    try {
      await api.createBlogPost({
        payload: {
          title,
          content,
          author: user.id,
        },
        token,
      });
      handleSuccess()
    } catch(e) {
      console.log(e)
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={5} className={classes.mainGrid}>
        <Grid item xs={12} md={4}>
          <Paper elevation={0} className={classes.userPanel}>
            <Typography variant="h6" gutterBottom>
              Profile home
            </Typography>
            <Typography>hi, {user.username}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Divider />
          <TextField
            id="filled-basic"
            label="Title"
            variant="filled"
            value={title}
            onChange={handleTitleChange}
            fullWidth
          />
          <TextField
            id="filled-textarea"
            label="Content"
            placeholder="Today in quarantine..."
            multiline
            rows={10}
            variant="filled"
            value={content}
            onChange={handleContentChange}
            fullWidth
          />
          <p>{500 - content.length} characters remaining.</p>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handlePublish}
            disabled={!title || !content}
          >
            Publish
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Your blog post was published successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
