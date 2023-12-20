import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Layouts({ children }) {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  // check auth
  // useEffect(() => {
  //   if (localStorage.getItem('access_token') === null) {
  //     navigate('/auth/login');
  //   } else {
  //     // navigate('/home');
  //   }
  // }, []);

  return children || null;
}

Layouts.propTypes = {
  children: PropTypes.node,
};

export default Layouts;
