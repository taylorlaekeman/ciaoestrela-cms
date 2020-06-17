import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/Button';

const Submit = ({
  area,
  children,
  className,
  isDisabled,
  isLoading,
  onClick,
}) => (
  <Button
    area={area}
    className={className}
    isDisabled={isDisabled || isLoading}
    isLoading={isLoading}
    onClick={onClick}
    type="submit"
  >
    {children}
  </Button>
);

Submit.defaultProps = {
  area: '',
  children: '',
  className: '',
  isDisabled: false,
  isLoading: false,
  onClick: () => {},
};

Submit.propTypes = {
  area: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Submit;
