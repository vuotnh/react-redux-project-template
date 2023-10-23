import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { makeSelectLoadingApp, makeSelectSnackbar, makeSelectUserData } from './selectors';
import { getUserDataAction, setPathNameAction } from './actions';
import Loading from '../../components/Loading';
// routing
import Routes from '../../routes';

// project imports
import Layouts from '../../layouts';

function App(props) {
  const { userData, onGetUserData, showLoading, onSetPathNameAction } = props;
  const { pathname } = window.location;
  const navigate = useNavigate();
  useEffect(() => {
    if (userData === null && localStorage.getItem('token')) {
      onGetUserData();
      onSetPathNameAction(null);
      if (pathname === '/auth/login') {
        navigate('/');
      }
    } else {
      onSetPathNameAction(pathname);
    }
  }, []);
  return (
    <Layouts>
      <Routes />
      {showLoading && <Loading />}
    </Layouts>
  );
}
App.propTypes = {
  userData: PropTypes.any,
  onGetUserData: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  showLoading: makeSelectLoadingApp(),
  showSnackbar: makeSelectSnackbar(),
  userData: makeSelectUserData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGetUserData: () => {
      dispatch(getUserDataAction());
    },
    onSetPathNameAction: (pathname) => {
      dispatch(setPathNameAction(pathname));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
