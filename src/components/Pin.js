import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { actions as pinActions } from 'state/pins';

const Button = styled.button`
  align-content: baseline;
  appearance: none;
  background: none;
  border: none;
  display: grid;
  justify-content: space-between;
  grid-auto-columns: max-content;
  grid-gap: 8px;
  grid-template-areas:
    'title status'
    'cost  status';
  padding: 0;
  text-align: left;
  width: 100%;
`;

const Cost = styled.p`
  color: ${(props) => props.theme.colours.text.subtitle};
  font-size: 0.8rem;
  grid-area: cost;
  margin: 0;
`;

const Status = styled.p`
  background-color: ${(props) =>
    props.isAvailable
      ? props.theme.colours.background.pin.active
      : props.theme.colours.background.pin.disabled};
  border-radius: 16px;
  color: ${(props) =>
    props.isAvailable
      ? props.theme.colours.text.pin.active
      : props.theme.colours.text.pin.disabled};
  font-size: 0.5rem;
  font-weight: 500;
  grid-area: status;
  height: min-content;
  letter-spacing: 2px;
  margin: 0;
  padding: 8px 16px;
  text-transform: uppercase;
  width: max-content;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.colours.text.body};
  font-size: 1rem;
  font-weight: 400;
  grid-area: title;
  margin: 0;
`;

const Wrapper = styled.li`
  padding: 16px 32px;
  box-sizing: border-box;

  &:hover {
    border-left: solid ${({ theme }) => theme.colours.border.pin.hover} 4px;
    border-right: solid ${({ theme }) => theme.colours.border.pin.hover} 4px;
    padding: 16px 28px;
  }
`;

const Pin = ({ className, pin }) => {
  const dispatch = useDispatch();

  const updateStatus = () =>
    dispatch(
      pinActions.setStatus({
        id: pin.id,
        status: !pin.isAvailable,
      })
    );

  return (
    <Wrapper className={className}>
      <Button onClick={updateStatus}>
        <Title>{pin.name}</Title>
        <Cost>{`$${pin.cost}`}</Cost>
        <Status isAvailable={pin.isAvailable}>
          {pin.isAvailable ? 'active' : 'disabled'}
        </Status>
      </Button>
    </Wrapper>
  );
};

Pin.defaultProps = {
  className: '',
  pin: {
    cost: '',
    id: 0,
    isAvailable: false,
    name: '',
  },
};

Pin.propTypes = {
  className: PropTypes.string,
  pin: PropTypes.shape({
    cost: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isAvailable: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default Pin;
