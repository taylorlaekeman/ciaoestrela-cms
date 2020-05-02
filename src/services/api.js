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
  return json;
};

export default {
  getOrders,
};
