import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { ReactComponent as UnstyledCog } from 'assets/icons/cog.svg';
import Form from 'components/Form';
import Error from 'components/Form/Error';
import UnstyledInput from 'components/Form/Input';
import Submit from 'components/Form/Submit';
import UnstyledLink from 'components/Link';
import LoadingIndicator from 'components/LoadingIndicator';
import Panel from 'components/Panel';
import { actions as pinActions, selectors as pinSelectors } from 'state/pins';

const getCostError = (cost) => {
  if (!cost || parseInt(cost, 10) <= 0)
    return 'Cost is required and must be a number greater than zero';
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

  return (
    <>
      <Link to="/listings">Back to listings</Link>
      <Panel>
        <Form onSubmit={submitForm}>
          <Input
            area="name"
            error={isNameDirty && getNameError(name)}
            name="Name"
            onBlur={() => setIsNameDirty(true)}
            onChange={(newName) => {
              setName(newName);
              setIsNameDirty(true);
            }}
            value={name}
          />
          <Input
            area="cost"
            error={isCostDirty && getCostError(cost)}
            name="Cost"
            onBlur={() => setIsCostDirty(true)}
            onChange={(newCost) => {
              setCost(newCost);
              setIsCostDirty(true);
            }}
            type="number"
            value={cost}
          />
          <Submit area="submit" disabled={isCreatingPin}>
            {isCreatingPin ? <LoadingIndicator /> : 'Create pin'}
          </Submit>
          {createPinErrors && <Error>Could not create pin</Error>}
        </Form>
      </Panel>
    </>
  );
};

export default PinCreator;
