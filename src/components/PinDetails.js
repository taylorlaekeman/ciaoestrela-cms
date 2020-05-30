import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import UnstyledForm from 'components/Form';
import Error from 'components/Form/Error';
import UnstyledInput from 'components/Form/Input';
import Submit from 'components/Form/Submit';
import UnstyledUpload from 'components/Form/Upload';
import Link from 'components/Link';
import LoadingIndicator from 'components/LoadingIndicator';
import { actions as pinActions, selectors as pinSelectors } from 'state/pins';

const Form = styled(UnstyledForm)`
  ${({ theme }) => theme.components.panel}
  margin: 0 16px;
  padding: 32px;
`;

const getCostError = (cost) => {
  if (!cost || parseInt(cost, 10) <= 0)
    return 'Cost is required and must be a number greater than zero';
  return null;
};

const getImageError = (imageUrl, isUploading) => {
  if (isUploading) return false;
  return imageUrl ? null : 'An image is required';
};

const getNameError = (name) => {
  return name ? null : 'Name is required';
};

const Header = styled.header`
  padding: 32px;
`;

const Input = styled(UnstyledInput)`
  margin-bottom: 16px;
`;

const Upload = styled(UnstyledUpload)`
  margin-bottom: 16px;
`;

const Wrapper = styled.article`
  height: 100%;
  overflow: scroll;
`;

const PinDetails = () => {
  const [cost, setCost] = useState('');
  const createPinErrors = useSelector(pinSelectors.selectCreatePinErrors);
  const dispatch = useDispatch();
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
  const [isCostDirty, setIsCostDirty] = useState(false);
  const isCreatingPin = useSelector(pinSelectors.isCreatingPin);
  const [isImageDirty, setIsImageDirty] = useState(false);
  const [isNameDirty, setIsNameDirty] = useState(false);
  const isUploadingImage = useSelector(pinSelectors.isUploadingImage);
  const [name, setName] = useState('');
  const {
    params: { id: pinId },
  } = useRouteMatch();
  const updatePinErrors = useSelector(pinSelectors.selectUpdatePinErrors);
  const uploadedImageUrl = useSelector(pinSelectors.selectImageUrl);

  const isUpdate = pinId !== 'new';
  const pin = useSelector(pinSelectors.selectPin(pinId));

  const hasLoaded = !!pin;

  const imageUrl = uploadedImageUrl || pin?.imageUrl;

  const submitForm = () => {
    if (
      !getNameError(name) &&
      !getCostError(cost) &&
      !getImageError(imageUrl, isUploadingImage)
    ) {
      if (isUpdate)
        dispatch(pinActions.updatePin({ cost, id: pin.id, imageUrl, name }));
      else
        dispatch(pinActions.createPin({ cost, imageUrl, name }));
      setHasSubmittedForm(true);
    }
    setIsNameDirty(true);
    setIsCostDirty(true);
    setIsImageDirty(true);
  };

  useEffect(() => {
    if (hasLoaded) {
      setName(pin.name);
      setCost(pin.cost);
    }
  }, [hasLoaded, pin]);

  if (!isCreatingPin && hasSubmittedForm)
    return <Redirect to="/listings/pins" />;

  return (
    <Wrapper>
      <Header>
        <Link to="/listings">Back to listings</Link>
      </Header>
      <Form onSubmit={submitForm}>
        {isUpdate && !hasLoaded ? (
          <LoadingIndicator centered large />
        ) : (
          <>
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
              error={isImageDirty && getImageError(imageUrl, isUploadingImage)}
              onChange={(newImage) => {
                dispatch(pinActions.uploadImage(newImage));
                setIsImageDirty(true);
              }}
              value={imageUrl || (pin && pin.imageUrl)}
            >
              {isUploadingImage ? (
                <LoadingIndicator />
              ) : (
                'Click to upload an image'
              )}
            </Upload>
            <Submit isDisabled={isCreatingPin} isLoading={isCreatingPin}>
              {isUpdate ? 'Update pin' : 'Create pin'}
            </Submit>
            {(createPinErrors || updatePinErrors) && <Error>Could not create pin</Error>}
          </>
        )}
      </Form>
    </Wrapper>
  );
};

export default PinDetails;
