import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Order from 'components/Order';
import { selectors as authSelectors } from 'state/auth';
import {
  actions as orderActions,
  selectors as orderSelectors,
} from 'state/orders';

const OrderList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0 20px 10px 20px;
`;

const OrderPanel = () => {
  const dispatch = useDispatch();
  const isFetchingOrders = useSelector(orderSelectors.isFetchingOrders);
  const orders = useSelector(orderSelectors.selectOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const token = useSelector(authSelectors.selectToken);

  useEffect(() => {
    if (token) dispatch(orderActions.fetchOrders());
  }, [dispatch, token]);

  if (isFetchingOrders)
    return (
      <article>
        <header>
          <Title>Orders</Title>
        </header>
        <p>loading...</p>
      </article>
    );

  return (
    <article>
      <header>
        <Title>Orders</Title>
      </header>
      <OrderList>
        {orders.map((order) => (
          <Order
            isSelected={order.id === selectedOrder}
            key={order.id}
            onSelect={() => setSelectedOrder(order.id)}
            order={order}
          />
        ))}
      </OrderList>
    </article>
  );
};

export default OrderPanel;
