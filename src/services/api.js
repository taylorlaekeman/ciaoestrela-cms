import settings from 'settings';

const buildSettings = (token, method='GET', body={}) => ({
  body: JSON.stringify(body),
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  method,
});

const createPin = async (token, name, cost) => {
  const url = `${settings.apiUrl}/pins/`;
  const body = { cost, name };
  const requestSettings = buildSettings(token, 'POST', body);
  const response = await makeRequest(url, requestSettings);
  return response;
};

const getOrders = async (token) => {
  const url = `${settings.apiUrl}/orders/`;
  const requestSettings = buildSettings(token);
  const response = await makeRequest(url, requestSettings);
  const orders = {};
  response.forEach((order) => {
    orders[order.id] = order;
  });
  return orders;
};

const makeRequest = async (url, requestSettings) => {
  const response = await fetch(url, requestSettings);
  const json = await response.json();
  if (!response.ok) throw json;
  return json;
};

export default {
  createPin,
  getOrders,
};
