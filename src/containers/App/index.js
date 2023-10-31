import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { makeSelectLoading, makeSelectSnackbar, makeSelectUserData } from './selectors';
import { getUserDataAction, setPathNameAction, showLoadingAction } from './actions';
import Loading from '../../components/Loading';
// routing
import Routes from '../../routes';

// project imports
import Layouts from '../../layouts';

function App(props) {
  const { userData, onGetUserData, loading, onSetPathNameAction } = props;
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
    <>
      {loading && <Loading />}
      <Layouts>
        <React.Suspense fallback={<></>}>
          <Routes />
        </React.Suspense>
      </Layouts>
    </>
  );
}
App.propTypes = {
  userData: PropTypes.any,
  onGetUserData: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
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
    onShowLoadingAction: (loading) => {
      dispatch(showLoadingAction(loading));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
