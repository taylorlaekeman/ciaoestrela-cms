import settings from 'settings';

const buildSettings = (token, method = 'GET', body = {}) => {
  const requestSettings = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method,
  };
  if (method !== 'GET') requestSettings.body = JSON.stringify(body);
  return requestSettings;
};

const createPin = async (token, name, cost) => {
  const url = `${settings.apiUrl}/pins/`;
  const body = { cost, name };
  const requestSettings = buildSettings(token, 'POST', body);
  const response = await makeRequest(url, requestSettings);
  return response;
};

const getItemsById = (items) => {
  const itemsById = {};
  items.forEach((item) => {
    itemsById[item.id] = item;
  });
  return itemsById;
};

const getOrders = async (token) => {
  const url = `${settings.apiUrl}/orders/`;
  const requestSettings = buildSettings(token);
  const orders = await makeRequest(url, requestSettings);
  return getItemsById(orders);
};

const getPins = async (token) => {
  const url = `${settings.apiUrl}/pins/`;
  const requestSettings = buildSettings(token);
  const pins = await makeRequest(url, requestSettings);
  return getItemsById(pins);
};

const makeRequest = async (url, requestSettings) => {
  const response = await fetch(url, requestSettings);
  const json = await response.json();
  if (!response.ok) throw json;
  return json;
};

const setPinStatus = async (token, pinId, isAvailable) => {
  const url = `${settings.apiUrl}/pins/${pinId}/`;
  const body = { isAvailable };
  const requestSettings = buildSettings(token, 'PATCH', body);
  return makeRequest(url, requestSettings);
};

export default {
  createPin,
  getOrders,
  getPins,
  setPinStatus,
};
