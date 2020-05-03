import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import OrderItem from 'components/OrderItem';

const ClickableOrder = styled.button`
  background: none;
  border: none;
  padding: 16px 20px;
  text-align: left;
  width: 100%;
`;

const Contact = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  margin: 0;
  margin-bottom: 8px;
`;

const Destination = styled.p`
  font-size: 0.7rem;
  font-weight: 400;
  margin: 0;
  margin-bottom: 8px;
`;

const ItemCount = styled.p`
  font-size: 0.7rem;
  font-weight: 400;
  margin: 0;
`;

const ItemList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListOrder = styled.li`
  ${(props) =>
    props.isSelected &&
    `background-color: ${props.theme.colours.page.background};`}

  &:hover {
    background-color: ${(props) => props.theme.colours.page.background};
  }
`;

const Order = ({ isSelected, onSelect, order }) => (
  <ListOrder isSelected={isSelected}>
    <ClickableOrder onClick={onSelect}>
      <Contact>{order.contact}</Contact>
      <Destination>{order.destination}</Destination>
      {isSelected ? (
        <ItemList>
          {order.items.map((item) => (
            <OrderItem
              item={item}
              key={`${item.type}-${item.paper}-${item.ideas}`}
            />
          ))}
        </ItemList>
      ) : (
        <ItemCount>
          {`${order.items.length} item${order.items.length === 1 ? '' : 's'}`}
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
    destination: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

Order.defaultProps = {
  isSelected: false,
};

export default Order;
