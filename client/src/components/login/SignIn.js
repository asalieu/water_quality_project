import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Main from '../userContext/Main';
import Routes from '../routes/Routes';
import Navbar from '../navbar/Navbar';
import { urlencoded, json } from 'body-parser';
import {InputLabel} from '@material-ui/core/' 
import ocean from '../login/ocean.png'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      //backgroundColor: theme.palette.common.white,
      backgroundColor: ''
    },

    html: {
      backgroundImage: `url(${ocean})`,
      backgroundSize: 'cover',
      overflow: 'hidden',
      backgroundPosition: 'center center',
      //opacity:'50%',
      backgroundRepeat: 'repeat-y',
      backgroundAttachment: 'scroll'
    }
  },
  main_container: {

  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

export default function SignIn() {

  const [email, setEmail] = useState();
  const [password, setPasword] = useState();
  const [redirect, setRedirect] = useState(false);
  const [admin, setAdmin] = useState(false);


  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();

    axios.post('/api/login', {
      email: email,
      password: password
    })
      .then(res => {
        console.log(res.data.email)
        if (res.data.email == email && res.data.pass == password) {
          console.log("Im here " + `${email} \ ${password}`);
          setRedirect(true);
          setAdmin(true);
        }
        if (res.data.code =="204")
         {
          console.log("Invalid " + `${email} \ ${password}`);
          setRedirect(false);
          alert("Im sorry you're wrong")
        }
        else {
          setRedirect(false);
        }

      }).catch(err =>{
        if (err.res.code != 200) {
          console.log('The server did not return a 200 code');
        }
      }) 
  }

  const classes = useStyles();
  var labelerr="Invalid credentials";
  return (
    (redirect) ? ((admin) ? <Redirect to='/Dashboard' /> : <Redirect to='/Main' />) :
      <div className={classes.main_container}>
        <Navbar />
        <Container component="main" maxWidth="xs">

          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
        </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                autoComplete="email"
                autoFocus
                onChange={e => setEmail(e.target.value)}

              />
              <TextField
                variant="outlined"
                margin="normal"
                required="true"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={e => setPasword(e.target.value)}
              />
              <InputLabel  variant="outline" value={labelerr}  />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Sign In
          </Button>
            </form>
          </div>
        </Container>
      </div>

  );
}