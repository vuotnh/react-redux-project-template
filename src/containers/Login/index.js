import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import makeSelectLoginPage from './selectors';
import { makeSelectPathName } from '../App/selectors';
import { Card, TextField, FormHelperText, Typography, Divider, Grid, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller, useForm } from 'react-hook-form';

const useStyles = makeStyles(() => ({
  loginContainer: {
    width: '100%',
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginForm: {
    width: '30%',
    border: '1px solid rgba(0, 0, 0, 0.2)',
  },
  formTitle: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '20px',
    paddingBottom: '20px',
    fontWeight: 'bold !important',
    fontSize: '25px !important',
  },
  emailInput: {
    width: '80%',
    height: '30px !important',
  },
}));
function LoginPage() {
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = () => {};
  return (
    <div className={classes.loginContainer}>
      <Card className={classes.loginForm}>
        <div
          style={{
            width: '100%',
          }}>
          <Typography className={classes.formTitle}>Login form</Typography>
        </div>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '30px',
              flexDirection: 'column',
            }}>
            <Grid item sx={{ justifyContent: 'center', display: 'flex' }}>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="email"
                    value={value}
                    onChange={onChange}
                    sx={{
                      width: '80%',
                    }}
                  />
                )}
              />
              <FormHelperText error>{errors?.email?.message}</FormHelperText>
            </Grid>

            <Grid item sx={{ justifyContent: 'center', display: 'flex', marginTop: '30px' }}>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="email"
                    value={value}
                    onChange={onChange}
                    sx={{
                      width: '80%',
                    }}
                  />
                )}
              />
              <FormHelperText error>{errors?.email?.message}</FormHelperText>
            </Grid>

            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                marginTop: '30px',
                marginBottom: '30px',
              }}>
              <Button
                variant="contained"
                sx={{
                  width: '80%',
                }}>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func,
  onReset: PropTypes.func,
  loginPage: PropTypes.object,
  onGetUserDataAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
  pathname: makeSelectPathName(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginPage);
