import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Ideas = styled.p`
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Paper = styled.p`
  margin: 0;
  ${(props) => (props.ideas ? 'margin-bottom: 8px;' : '')}
`;

const CustomCard = ({ item }) => (
  <ListItem key={`${item.type}-${item.paper}-${item.ideas}`}>
    <Paper>{item.paper}</Paper>
    {item.ideas && <Ideas>{item.ideas}</Ideas>}
  </ListItem>
);

CustomCard.propTypes = {
  item: PropTypes.shape({
    ideas: PropTypes.string,
    paper: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default CustomCard;
