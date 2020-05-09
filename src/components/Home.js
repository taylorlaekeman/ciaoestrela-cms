import React from 'react';
import styled from 'styled-components';

import Link from 'components/Link';
import Panel from 'components/Panel';

const Item = styled.li`
  margin: 0;
  margin-bottom: 16px;
  padding: 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Links = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Home = () => (
  <Links>
    <Item>
      <Link to="orders">
        <Panel>Orders</Panel>
      </Link>
    </Item>
    <Item>
      <Link to="listings">
        <Panel>Listings</Panel>
      </Link>
    </Item>
  </Links>
);

export default Home;
