import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ReactComponent as UnstyledEditIcon } from 'assets/icons/edit-pencil.svg';
import Link from 'components/Link';
import Form from 'components/Form';
import Toggle from 'components/Form/Toggle';
import { actions as pinActions } from 'state/pins';

const Cost = styled.p`
  color: ${(props) => props.theme.colours.text.subtitle};
  font-size: 0.6rem;
  font-weight: 500;
  grid-area: cost;
  letter-spacing: 0.1em;
  margin: 0;
`;

const EditIcon = styled(UnstyledEditIcon)`
  fill: ${({ theme }) => theme.colours.fill.icon};
  height: 16px;
  width: 16px;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.colours.text.body};
  font-size: 1rem;
  font-weight: 400;
  grid-area: title;
  margin: 0;
`;

const Wrapper = styled.li`
  ${({ theme }) => theme.components.panel}
  align-items: center;
  border-right: solid
    ${({ isAvailable, theme }) =>
      isAvailable
        ? theme.colours.border.pin.active
        : theme.colours.border.pin.disabled}
    8px;
  display: grid;
  justify-content: space-between;
  grid-gap: 4px 16px;
  grid-template-areas:
    'cost  . edit toggle'
    'title . edit toggle';
  grid-template-columns: auto 1fr max-content auto;
  margin-bottom: 16px;
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
    <Wrapper className={className} isAvailable={pin.isAvailable}>
      <Title>{pin.name}</Title>
      <Cost>{`$ ${pin.cost}`}</Cost>
      <Link area="edit" to={`/listings/pins/${pin.id}`}>
        <EditIcon />
      </Link>
      <Form area="toggle">
        <Toggle
          name={`pin-${pin.id}-status`}
          onChange={updateStatus}
          value={pin.isAvailable}
        />
      </Form>
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
