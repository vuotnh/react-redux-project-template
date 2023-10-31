/* eslint-disable no-console */
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { enqueueSnackbar } from 'notistack';
import makeSelectLoginPage from './selectors';
import { makeSelectPathName } from '../App/selectors';
import { Card, TextField, FormHelperText, Typography, Divider, Grid, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import axiosInstance from '../../utils/axios';

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
function RegisterPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const { email, password, firstName, lastName } = data;
      const registerRes = await axiosInstance({
        method: 'POST',
        url: `${import.meta.env.VITE_API_URL}/auth/register`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          email,
          password,
          firstName,
          lastName,
        },
      });
      if (registerRes.status === 201) {
        navigate('/auth/account-verify');
      }
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message || 'Đăng ký thất bại', { variant: 'error' });
    }
  };
  return (
    <div className={classes.loginContainer}>
      <Card className={classes.loginForm}>
        <div
          style={{
            width: '100%',
          }}>
          <Typography className={classes.formTitle}>Đăng ký</Typography>
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
            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Controller
                name="email"
                rules={{
                  required: {
                    value: true,
                    message: t('loginPage.noEmpty'),
                  },
                }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label={t('loginPage.email')}
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
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Controller
                name="firstName"
                rules={{
                  required: {
                    value: true,
                    message: t('loginPage.noEmpty'),
                  },
                }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Firstname"
                    value={value}
                    onChange={onChange}
                    sx={{
                      width: '80%',
                    }}
                  />
                )}
              />
              <FormHelperText error>{errors?.firstName?.message}</FormHelperText>
            </Grid>

            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                marginTop: '30px',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Controller
                name="lastName"
                rules={{
                  required: {
                    value: true,
                    message: t('loginPage.noEmpty'),
                  },
                }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Lastname"
                    value={value}
                    onChange={onChange}
                    sx={{
                      width: '80%',
                    }}
                  />
                )}
              />
              <FormHelperText error>{errors?.lastName?.message}</FormHelperText>
            </Grid>

            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                marginTop: '30px',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label={t('loginPage.password')}
                    value={value}
                    onChange={onChange}
                    type="password"
                    sx={{
                      width: '80%',
                    }}
                  />
                )}
              />
              <FormHelperText error>{errors?.password?.message}</FormHelperText>
            </Grid>

            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                marginTop: '30px',
                marginBottom: '10px',
              }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: '80%',
                }}>
                Register
              </Button>
            </Grid>
            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                marginTop: '20px',
                marginBottom: '30px',
              }}>
              <Typography
                onClick={() => {
                  navigate('/auth/login');
                }}
                sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  color: 'blue',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}>
                Have an account
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Card>
    </div>
  );
}

RegisterPage.propTypes = {
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

export default compose(withConnect)(RegisterPage);
