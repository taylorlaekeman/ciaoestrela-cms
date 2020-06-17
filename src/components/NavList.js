import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 16px;
`;

const NavList = ({ children }) => <List>{children}</List>;

NavList.defaultProps = {
  children: null,
};

NavList.propTypes = {
  children: PropTypes.node,
};

export default NavList;
