/* eslint-disable no-console */
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
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router';
import instance from '../../utils/axios';
import { showLoadingAction } from '../App/actions';

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
function LoginPage(props) {
  const { onShowLoading } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (data) => {
    try {
      const { access_token } = data;
      const user_info_res = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: 'application/json',
          },
        },
      );

      const user_info = await user_info_res.json();
      console.log(user_info);
    } catch (err) {
      console.log(err);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (response) => handleLogin(response),
    onError: (error) => console.log('Login Failed:', error),
  });
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

  const onSubmit = async (data) => {
    onShowLoading(true);
    try {
      const { email, password } = data;
      const loginRes = await instance({
        method: 'POST',
        url: `${import.meta.env.VITE_API_URL}/auth/login`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          email,
          password,
        },
      });
      if (loginRes.status === 200) {
        const { access_token, expires_in } = loginRes.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('expires_in', expires_in);
        navigate('/home');
      }
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message || 'Tài khoản hoặc mật khẩu bị sai', {
        variant: 'error',
      });
    }
    onShowLoading(false);
  };
  return (
    <div className={classes.loginContainer}>
      <Card className={classes.loginForm}>
        <div
          style={{
            width: '100%',
          }}>
          <Typography className={classes.formTitle}>{t('loginPage.loginForm')}</Typography>
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
                {t('loginPage.signIn')}
              </Button>
            </Grid>

            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                marginTop: '10px',
              }}>
              <Button
                variant="contained"
                sx={{
                  width: '80%',
                }}
                onClick={() => loginWithGoogle()}>
                Sign in with Google 🚀
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
                  navigate('/auth/register');
                }}
                sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  color: 'blue',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}>
                Create an account
              </Typography>
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
    onShowLoading: (loading) => {
      dispatch(showLoadingAction(loading));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginPage);
