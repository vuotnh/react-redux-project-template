import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectUserList from './selectors';
import { getUserListAction } from './actions';

function UserPage(props) {
  const { onGetListUser } = props;

  useEffect(async () => {
    await onGetListUser();
  }, []);
  return <h1>User Page</h1>;
}

UserPage.propTypes = {
  userData: PropTypes.any,
  onGetListUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userListStates: makeSelectUserList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGetListUser: () => {
      dispatch(getUserListAction());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
