import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import CustomCard from 'components/CustomCard';

const ClickableOrder = styled.button`
  background: none;
  border: none;
  padding: 16px 20px;
  text-align: left;
  width: 100%;
`;

const Contact = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
  margin-bottom: 8px;
`;

const CreatedDate = styled.p`
  font-size: 0.7rem;
  font-weight: 300;
  margin: 0;
  margin-bottom: 16px;
`;

const CustomCardTitle = styled.h3`
  font-weight: 500;
  margin: 0;
  margin-bottom: 20px;
`;

const Destination = styled.p`
  font-size: 0.7rem;
  font-weight: 300;
  margin: 0;
  margin-bottom: 20px;
`;

const formatDate = (serverDate) => {
  const date = new Date(serverDate);
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const ItemCount = styled.p`
  background-color: ${(props) => props.theme.colours.background.customCard};
  border-radius: 16px;
  color: ${(props) => props.theme.colours.text.customCard};
  font-weight: 600;
  font-size: 0.7rem;
  padding: 4px 10px;
  margin: 0;
  width: max-content;
`;

const ItemList = styled.ul`
  border-left: solid 8px ${(props) => props.theme.colours.border.customCard};
  border-right: solid 8px ${(props) => props.theme.colours.border.customCard};
  list-style: none;
  margin: 0 -20px;
  padding: 8px 12px;
`;

const ListOrder = styled.li`
  background-color: ${(props) => props.theme.colours.background.order};
  box-shadow: ${(props) => props.theme.boxShadow.medium};
  margin: 0 20px;
  margin-bottom: 20px;

  &:hover {
    box-shadow: ${(props) => props.theme.boxShadow.high};
  }
`;

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Order = ({ isSelected, onSelect, order }) => (
  <ListOrder isSelected={isSelected}>
    <ClickableOrder onClick={onSelect}>
      <CreatedDate>{formatDate(order.createdDate)}</CreatedDate>
      <Contact>{order.contact}</Contact>
      <Destination>{order.destination}</Destination>
      {isSelected ? (
        <ItemList>
          <CustomCardTitle>custom cards</CustomCardTitle>
          {order.items.map((item) => (
            <CustomCard
              item={item}
              key={`${item.type}-${item.paper}-${item.ideas}`}
            />
          ))}
        </ItemList>
      ) : (
        <ItemCount>
          {`${order.items.length} custom card${
            order.items.length === 1 ? '' : 's'
          }`}
        </ItemCount>
      )}
    </ClickableOrder>
  </ListOrder>
);

Order.propTypes = {
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  order: PropTypes.shape({
    contact: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        ideas: PropTypes.string.isRequired,
        paper: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

Order.defaultProps = {
  isSelected: false,
};

export default Order;
