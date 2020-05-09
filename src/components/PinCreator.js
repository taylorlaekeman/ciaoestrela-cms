import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { ReactComponent as UnstyledCog } from 'assets/icons/cog.svg';
import UnstyledForm from 'components/Form';
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

const Form = styled(UnstyledForm)`
  display: grid;
  grid-template-areas:
    'name-label'
    'name-input'
    '.         '
    'cost-label'
    'cost-input'
    '.         '
    'submit    ';
  grid-template-rows: auto auto 16px auto auto 16px auto;
`;

const Input = styled(UnstyledInput)`
  background-color: yellow;
`;

const Link = styled(UnstyledLink)`
  margin-bottom: 16px;
`;

const PinCreator = () => {
  const [cost, setCost] = useState(5);
  const dispatch = useDispatch();
  const isCreatingPin = useSelector(pinSelectors.isCreatingPin);
  const [name, setName] = useState('');

  return (
    <>
      <Link to="/listings">Back to listings</Link>
      <Panel>
        <Form onSubmit={() => dispatch(pinActions.createPin({ cost, name }))}>
          <Input
            areas={['name-label', 'name-input']}
            name="Name"
            onChange={setName}
            value={name}
          />
          <Input
            areas={['cost-label', 'cost-input']}
            name="Cost"
            onChange={setCost}
            type="number"
            value={cost}
          />
          <Submit area="submit" disabled={isCreatingPin}>
            {isCreatingPin ? <Cog /> : 'Create pin'}
          </Submit>
        </Form>
      </Panel>
    </>
  );
};

export default PinCreator;
