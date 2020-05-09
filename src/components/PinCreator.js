import React, { useState } from 'react';
import styled from 'styled-components';

import UnstyledForm from 'components/Form';
import UnstyledInput from 'components/Form/Input';
import Submit from 'components/Form/Submit';
import UnstyledLink from 'components/Link';
import Panel from 'components/Panel';

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
  const [cost, setCost] = useState('');
  const [name, setName] = useState('');

  return (
    <>
      <Link to="/listings">Back to listings</Link>
      <Panel>
        <Form onSubmit={console.log}>
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
          <Submit area="submit" value="Create pin" />
        </Form>
      </Panel>
    </>
  );
};

export default PinCreator;
