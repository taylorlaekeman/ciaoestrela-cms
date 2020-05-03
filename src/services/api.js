import settings from 'settings';

const getOrders = async (token) => {
  const response = await fetch(`${settings.apiUrl}/orders/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  if (!response.ok) throw json;
  const orders = {};
  json.forEach((order) => {
    orders[order.id] = order;
  });
  return orders;
};

export default {
  getOrders,
};
