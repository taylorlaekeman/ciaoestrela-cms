import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import UnstyledLink from 'components/Link';

const Item = styled.li`
  margin: 0;
  margin-bottom: 16px;
  padding: 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Link = styled(UnstyledLink)`
  ${({ theme }) => theme.components.panel}
`;

const NavListItem = ({ text, to }) => (
  <Item>
    <Link plain to={to}>
      {text}
    </Link>
  </Item>
);

NavListItem.defaultProps = {
  text: '',
  to: '',
};

NavListItem.propTypes = {
  text: PropTypes.string,
  to: PropTypes.string,
};

export default NavListItem;
