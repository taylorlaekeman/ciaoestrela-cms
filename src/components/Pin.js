import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Cost = styled.p``;

const Title = styled.h3`
  color: ${(props) => props.theme.colours.text.body};
  font-size: 1em;
  font-weight: 400;
`;

const Wrapper = styled.li`
  padding: 8px 0;
`;

const Pin = ({ className, pin }) => (
  <Wrapper className={className}>
    <Title>{pin.name}</Title>
    <Cost>{pin.cost}</Cost>
  </Wrapper>
);

Pin.defaultProps = {
  className: '',
  pin: {
    cost: 0,
    name: '',
  },
};

Pin.propTypes = {
  className: PropTypes.string,
  pin: PropTypes.exact({
    cost: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default Pin;
