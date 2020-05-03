import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Ideas = styled.p`
  margin: 0;
`;

const ListItem = styled.li`
  padding: 4px 8px;
`;

const Paper = styled.p`
  margin: 0;
`;

const Type = styled.p`
  margin: 0;
`;

const OrderItem = ({ item }) => (
  <ListItem key={`${item.type}-${item.paper}-${item.ideas}`}>
    <Type>{item.type}</Type>
    <Paper>{item.paper}</Paper>
    {item.ideas && <Ideas>{item.ideas}</Ideas>}
  </ListItem>
);

OrderItem.propTypes = {
  item: PropTypes.shape({
    ideas: PropTypes.string,
    paper: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderItem;
