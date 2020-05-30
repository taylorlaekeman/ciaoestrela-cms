import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import LoadingIndicator from 'components/LoadingIndicator';

const UnstyledButton = styled.button`
  ${({ isPlain, isSecondary, theme }) => {
    if (isPlain) return theme.components.button.plain;
    if (isSecondary) return theme.components.button.secondary;
    return theme.components.button.primary;
  }}
  grid-area: ${({ area }) => area};
`;

const Button = ({
  area,
  children,
  className,
  isDisabled,
  isLoading,
  isPlain,
  isSecondary,
  onClick,
  type,
}) => (
  <UnstyledButton
    area={area}
    className={className}
    disabled={isDisabled}
    isPlain={isPlain}
    isSecondary={isSecondary}
    onClick={onClick}
    type={type}
  >
    {isLoading ? <LoadingIndicator /> : children}
  </UnstyledButton>
);

Button.defaultProps = {
  area: '',
  children: '',
  className: '',
  isDisabled: false,
  isLoading: false,
  isPlain: false,
  isSecondary: false,
  onClick: () => {},
  type: 'button',
};

Button.propTypes = {
  area: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isPlain: PropTypes.bool,
  isSecondary: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
