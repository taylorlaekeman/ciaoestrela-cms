import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { ReactComponent as UnstyledCog } from 'assets/icons/cog.svg';
import Form from 'components/Form';
import Error from 'components/Form/Error';
import UnstyledInput from 'components/Form/Input';
import Submit from 'components/Form/Submit';
import UnstyledLink from 'components/Link';
import Panel from 'components/Panel';
import { actions as pinActions, selectors as pinSelectors } from 'state/pins';

const Cog = styled(UnstyledCog)`
  animation: spin 1s linear infinite;
  fill: ${(props) => props.theme.colours.icon.normal};
  height: 16px;
  width: 16px;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const getCostError = (cost) => {
  if (!cost || parseInt(cost) <= 0) return 'Cost is required and must be a number greater than zero';
  return null;
};

const getNameError = (name) => {
  return name ? null : 'Name is required';
};

const Input = styled(UnstyledInput)`
  margin-bottom: 16px;
`;

const Link = styled(UnstyledLink)`
  margin-bottom: 16px;
`;

const PinCreator = () => {
  const [cost, setCost] = useState('');
  const createPinErrors = useSelector(pinSelectors.selectCreatePinErrors);
  const dispatch = useDispatch();
  const [isCostDirty, setIsCostDirty] = useState(false);
  const isCreatingPin = useSelector(pinSelectors.isCreatingPin);
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [name, setName] = useState('');

  const submitForm = () => {
    if (!getNameError(name) && !getCostError(cost))
      dispatch(pinActions.createPin({ cost, name }));
    setIsNameDirty(true);
    setIsCostDirty(true);
  };

  const updateCost = (cost) => {
    setCost(cost);
    setIsCostDirty(true);
  };

  const updateName = (name) => {
    setName(name);
    setIsNameDirty(true);
  };

  return (
    <>
      <Link to="/listings">Back to listings</Link>
      <Panel>
        <Form onSubmit={submitForm}>
          <Input
            area={'name'}
            error={isNameDirty && getNameError(name)}
            name="Name"
            onBlur={() => setIsNameDirty(true)}
            onChange={updateName}
            value={name}
          />
          <Input
            area={'cost'}
            error={isCostDirty && getCostError(cost)}
            name="Cost"
            onBlur={() => setIsCostDirty(true)}
            onChange={updateCost}
            type="number"
            value={cost}
          />
          <Submit area="submit" disabled={isCreatingPin}>
            {isCreatingPin ? <Cog /> : 'Create pin'}
          </Submit>
          {createPinErrors && <Error>Could not create pin</Error>}
        </Form>
      </Panel>
    </>
  );
};

export default PinCreator;
