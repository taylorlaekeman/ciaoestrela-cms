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

const createCard = async (token, name, cost, imageUrl) => {
  const url = `${settings.apiUrl}/cards/`;
  const body = { cost, name, imageUrl };
  const requestSettings = buildSettings({ token, method: 'POST', body });
  return makeRequest(url, requestSettings);
};

const createPin = async (token, name, cost, imageUrl) => {
  const url = `${settings.apiUrl}/pins/`;
  const body = { cost, name, imageUrl };
  const requestSettings = buildSettings({ token, method: 'POST', body });
  return makeRequest(url, requestSettings);
};

const getCards = async (token) => {
  const url = `${settings.apiUrl}/cards/`;
  const requestSettings = buildSettings({ token });
  const cards = await makeRequest(url, requestSettings);
  return getItemsById(cards);
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

const setCardStatus = async (token, cardId, isAvailable) => {
  const url = `${settings.apiUrl}/cards/${cardId}/`;
  return setStatus(token, url, isAvailable);
};

const setPinStatus = async (token, pinId, isAvailable) => {
  const url = `${settings.apiUrl}/pins/${pinId}/`;
  return setStatus(token, url, isAvailable);
};

const setStatus = async (token, url, isAvailable) => {
  const body = { isAvailable };
  const requestSettings = buildSettings({ token, method: 'PATCH', body });
  return makeRequest(url, requestSettings);
};

const update = async (token, url, name, cost, imageUrl) => {
  const body = { cost, name, imageUrl };
  const requestSettings = buildSettings({ token, method: 'PATCH', body });
  return makeRequest(url, requestSettings);
};

const updateCard = async (token, id, name, cost, imageUrl) => {
  const url = `${settings.apiUrl}/cards/${id}/`;
  return update(token, url, name, cost, imageUrl);
};

const updatePin = async (token, id, name, cost, imageUrl) => {
  const url = `${settings.apiUrl}/pins/${id}/`;
  return update(token, url, name, cost, imageUrl);
};

const uploadCardImage = async (token, image) => {
  const url = `${settings.apiUrl}/card-images/`;
  return uploadImage(token, url, image);
};

const uploadImage = async (token, url, image) => {
  const requestSettings = buildSettings({
    token,
    method: 'POST',
    file: image[0],
  });
  return makeRequest(url, requestSettings);
};

const uploadPinImage = async (token, image) => {
  const url = `${settings.apiUrl}/pin-images/`;
  return uploadImage(token, url, image);
};

export default {
  createCard,
  createPin,
  getCards,
  getOrders,
  getPins,
  setCardStatus,
  setPinStatus,
  updateCard,
  updatePin,
  uploadCardImage,
  uploadPinImage,
};
