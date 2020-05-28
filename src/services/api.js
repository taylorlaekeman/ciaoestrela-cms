import settings from 'settings';

const buildSettings = ({ token, method = 'GET', body = {}, file = null }) => {
  const requestSettings = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
  };
  if (method !== 'GET' && Object.entries(body).length > 0)
    requestSettings.body = JSON.stringify(body);
  if (method !== 'GET' && file) {
    requestSettings.body = file;
    requestSettings.headers['Content-Disposition'] =
      'attachment; filename="image.png"';
  } else {
    requestSettings.headers['Content-Type'] = 'application/json';
  }
  return requestSettings;
};

const createPin = async (token, name, cost, imageUrl) => {
  const url = `${settings.apiUrl}/pins/`;
  const body = { cost, name, imageUrl };
  const requestSettings = buildSettings({ token, method: 'POST', body });
  return makeRequest(url, requestSettings);
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
  const requestSettings = buildSettings({ token });
  const orders = await makeRequest(url, requestSettings);
  return getItemsById(orders);
};

const getPins = async (token) => {
  const url = `${settings.apiUrl}/pins/`;
  const requestSettings = buildSettings({ token });
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
  const requestSettings = buildSettings({ token, method: 'PATCH', body });
  return makeRequest(url, requestSettings);
};

const uploadImage = async (token, image) => {
  const url = `${settings.apiUrl}/pin-images/`;
  const requestSettings = buildSettings({
    token,
    method: 'POST',
    file: image[0],
  });
  return makeRequest(url, requestSettings);
};

export default {
  createPin,
  getOrders,
  getPins,
  setPinStatus,
  uploadImage,
};
