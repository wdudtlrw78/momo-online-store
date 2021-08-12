import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function BodyContainer({ children }) {
  return <div className="container clearfix">{children}</div>;
}

BodyContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BodyContainer;
