import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoadingApp, makeSelectSnackbar, makeSelectUserData } from './selectors';
import { getUserDataAction, setPathNameAction } from './actions';
import Loading from '../../components/Loading';
// routing
import Routes from '../../routes';

// project imports
import Layouts from '../../layouts';

function App(props) {
  const { showLoading } = props;
  return (
    <>
      {showLoading && <Loading />}
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
