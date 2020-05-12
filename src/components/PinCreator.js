import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Form from 'components/Form';
import Error from 'components/Form/Error';
import UnstyledInput from 'components/Form/Input';
import Submit from 'components/Form/Submit';
import UnstyledUpload from 'components/Form/Upload';
import UnstyledLink from 'components/Link';
import LoadingIndicator from 'components/LoadingIndicator';
import Panel from 'components/Panel';
import { actions as pinActions, selectors as pinSelectors } from 'state/pins';

const getCostError = (cost) => {
  if (!cost || parseInt(cost, 10) <= 0)
    return 'Cost is required and must be a number greater than zero';
  return null;
};

const getImageError = (image) => {
  return image ? null : 'An image is required';
};

const getNameError = (name) => {
  return name ? null : 'Name is required';
};

const Input = styled(UnstyledInput)`
  margin-bottom: 16px;
`;

const Link = styled(UnstyledLink)`
  margin-bottom: 16px;
`;

const Upload = styled(UnstyledUpload)`
  margin-bottom: 16px;
`;

const PinCreator = () => {
  const [cost, setCost] = useState('');
  const createPinErrors = useSelector(pinSelectors.selectCreatePinErrors);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [isCostDirty, setIsCostDirty] = useState(false);
  const isCreatingPin = useSelector(pinSelectors.isCreatingPin);
  const [isImageDirty, setIsImageDirty] = useState(false);
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [name, setName] = useState('');

  const submitForm = () => {
    if (!getNameError(name) && !getCostError(cost) && !getImageError(image))
      dispatch(pinActions.createPin({ cost, image, name }));
    setIsNameDirty(true);
    setIsCostDirty(true);
    setIsImageDirty(true);
  };

  return (
    <>
      <Link to="/listings">Back to listings</Link>
      <Panel>
        <Form onSubmit={submitForm}>
          <Input
            error={isNameDirty && getNameError(name)}
            name="Name"
            onBlur={() => setIsNameDirty(true)}
            onChange={(newName) => {
              setName(newName);
              setIsNameDirty(true);
            }}
            value={name}
          />
          <Input
            error={isCostDirty && getCostError(cost)}
            name="Cost"
            onBlur={() => setIsCostDirty(true)}
            onChange={(newCost) => {
              setCost(newCost);
              setIsCostDirty(true);
            }}
            type="number"
            value={cost}
          />
          <Upload
            accept=".png"
            error={isImageDirty && getImageError(image)}
            onChange={(newImage) => {
              setImage(newImage);
              setIsImageDirty(true);
            }}
            text="Click to upload an image"
            value={image}
          />
          <Submit disabled={isCreatingPin}>
            {isCreatingPin ? <LoadingIndicator /> : 'Create pin'}
          </Submit>
          {createPinErrors && <Error>Could not create pin</Error>}
        </Form>
      </Panel>
    </>
  );
};

export default PinCreator;
