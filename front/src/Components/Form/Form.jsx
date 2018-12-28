import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        phone: '',
        birthDate: '',
        currency: '',
        comments: '', // multiline
      },
      confirmPassword: '',
      showPassword: false,
      showPasswordConfirm: false,
      snackBarOpen: false,
      snackBarStyle: {},
    };
  }

  updateUser = (field, event) => {
    this.setState({
      user : {
        ...this.state.user,
        [field]: event.target.value,
      }
    })
  }

  togglePassword = (field) => {
    this.setState({
      [field]: !this.state[field]
    });
  };

  submitForm = () => {
    this.checkForm();
  }

  checkForm = () => {
    const { user, confirmPassword } = this.state;
    let localCheckForm = true;
    // Check consistency between new password and old password (if existing)
    if(user.password !== confirmPassword){
      this.openSnackBar("Both passwords must be identical", "warning")
      localCheckForm=false;
    }
    // Check password acceptability
    if(user.password!=="" && !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(user.password))){
      this.openSnackBar("Password must contain at least 8 characters, including a majuscule, a minuscule and a figure or a symbol", "warning")
      localCheckForm=false;
    }
    // Check email acceptability
    if(!(/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/.test(user.email))){
      this.openSnackBar("Wrong email format", "warning")
      localCheckForm=false;
    }
  }

  openSnackBar = (message, status) => {
    this.setState({ 
      snackBarOpen: true,
      snackBarMessage: message,
      snackBarStyle:{
        backgroundColor: status === 'fail' ? 'orange' : 'green'
      }
    });
  }

  closeSnackBar = () => {
    this.setState({ 
      snackBarOpen: false,
      snackBarMessage: '',
    });
  }

  render() {
    const { user, showPassword, showPasswordConfirm, confirmPassword, snackBarOpen, snackBarMessage, snackBarStyle } = this.state;
    return (
      <Grid container spacing={24} style={{ marginTop: '50px', width: '80vw', marginLeft: '10vw' }}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <TextField
              required
              label="Name"
              value={user.lastName}
              onChange={e => this.updateUser('lastName', e)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="First name"
              value={user.firstName}
              onChange={e => this.updateUser('firstName', e)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              value={user.email}
              onChange={e => this.updateUser('email', e)}
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <InputLabel htmlFor="adornment-password">Password</InputLabel>
              <Input
                id="adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={user.password}
                onChange={e => this.updateUser('password', e)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={() => this.togglePassword('showPassword')}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>Password must contain at leat 8 characters, including a minuscule, a majuscule and a figure or symbol</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <InputLabel htmlFor="adornment-password-confirm">Confirm password</InputLabel>
              <Input
                id="adornment-password-confirm"
                type={showPasswordConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => this.setState({confirmPassword: e.target.value})}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={() => this.togglePassword('showPasswordConfirm')}
                    >
                      {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Button onClick={()=>this.submitForm()}>Envoyer</Button>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          style={snackBarStyle}
          open={snackBarOpen}
          autoHideDuration={6000}
          onClose={this.closeSnackBar}
          message={snackBarMessage}
        ></Snackbar>  
      </Grid>
    );
  }
}

export default Form;
