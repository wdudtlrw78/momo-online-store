import React, { useEffect } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useSelector } from 'react-redux';

function Admin(props) {
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    if (!userData?.isAdmim) {
      alert('This page is accessible only to administrators.');
      props.history.push('/');
    }
  }, []);

  return <div>Admin Page</div>;
}

Admin.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Admin;
