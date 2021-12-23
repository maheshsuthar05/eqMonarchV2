import { TextFieldFormsy } from '@fuse/core/formsy';
import FuseAnimate from '@fuse/core/FuseAnimate';

import clsx from 'clsx';
import React, { useRef, useState, useEffect } from 'react';
import Formsy from 'formsy-react';
import { useDispatch } from 'react-redux';
import * as authActions from 'app/auth/store/actions';

import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import * as Actions from 'app/auth/store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `linear-gradient(to right, ${
      theme.palette.primary.dark
    } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
    color: theme.palette.primary.contrastText
  },
  textField: {
    '& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl.MuiInputBase-adornedEnd.MuiOutlinedInput-adornedEnd': {
      width: '100%'
    }
  }
}));

function Login() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formRef = useRef(null);

  const handleSubmit = (model) => {
    dispatch(authActions.submitLogin(model));
  };

  const disableButton = () => {
    setIsFormValid(false);
  };

  const enableButton = () => {
    setIsFormValid(true);
  };

  useEffect(() => {
    dispatch({ type: Actions.USER_LOGGED_OUT });
  });
  return (
    <div
      className={clsx(
        classes.root,
        'flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0'
      )}
    >
      <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
        <FuseAnimate animation="transition.expandIn">
          <img
            className="w-128 mb-32"
            src="assets/images/logos/equator-logo.png"
            alt="logo"
          />
        </FuseAnimate>

        <FuseAnimate animation="transition.slideUpIn" delay={300}>
          <Typography variant="h3" color="inherit" className="font-light">
            Welcome to the Equator!
          </Typography>
        </FuseAnimate>
      </div>

      <FuseAnimate animation={{ translateX: [0, '100%'] }}>
        <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
          <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
            <Typography variant="h6" className="text-center md:w-full mb-48">
              LOGIN TO YOUR ACCOUNT
            </Typography>

            <div className="w-full">
              <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col justify-center w-full"
              >
                <TextFieldFormsy
                  className={clsx(classes.textField, 'mb-16')}
                  type="text"
                  name="email"
                  label="Username/Email"
                  value="admin"
                  validations={{
                    minLength: 2
                  }}
                  validationErrors={{
                    minLength: 'Min character length is 4'
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          email
                        </Icon>
                      </InputAdornment>
                    )
                  }}
                  variant="outlined"
                  required
                />

                <TextFieldFormsy
                  className={clsx(classes.textField, 'mb-16')}
                  type="password"
                  name="password"
                  label="Password"
                  value="admin"
                  validations={{
                    minLength: 4
                  }}
                  validationErrors={{
                    minLength: 'Min character length is 4'
                  }}
                  InputProps={{
                    className: 'pr-2',
                    type: showPassword ? 'text' : 'password',
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Icon className="text-20" color="action">
                            {showPassword ? 'visibility' : 'visibility_off'}
                          </Icon>
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  variant="outlined"
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-full mx-auto mt-16 normal-case"
                  aria-label="LOG IN"
                  disabled={!isFormValid}
                  value="legacy"
                >
                  Login
                </Button>
              </Formsy>
            </div>
          </CardContent>
        </Card>
      </FuseAnimate>
    </div>
  );
}

export default Login;
