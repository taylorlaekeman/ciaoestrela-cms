import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Link from 'components/Link';
import LoadingIndicator from 'components/LoadingIndicator';
import { actions as pinActions, selectors as pinSelectors } from 'state/pins';
import PinForm from 'views/pins/PinForm';

const Header = styled.header`
  padding: 32px;
`;

const Wrapper = styled.article`
  height: 100%;
  overflow: scroll;
`;

const PinDetails = () => {
  const pins = useSelector(pinSelectors.selectPins);
  const createErrors = useSelector(pinSelectors.selectCreatePinErrors);
  const dispatch = useDispatch();
  const hasFetched = useSelector(pinSelectors.hasFetched);
  const [hasSaved, setHasSaved] = useState(false);
  const { id } = useParams();
  const imageUrl = useSelector(pinSelectors.selectImageUrl);
  const isSaving = useSelector(pinSelectors.isSaving);
  const updateErrors = useSelector(pinSelectors.selectUpdatePinErrors);

  const isUpdate = id !== 'new';
  const pin = pins[id];

  const errors = isUpdate ? updateErrors : createErrors;

  if (!hasFetched) return <LoadingIndicator centered large />;

  if (isUpdate && !pin) return null;

  if (hasSaved && !isSaving && !errors) return <Redirect to="/listings/pins" />;

  return (
    <Wrapper>
      <Header>
        <Link to="/listings">Back to listings</Link>
      </Header>
      <PinForm
        defaults={pin}
        errors={errors}
        imageUrl={isUpdate ? pin.imageUrl : imageUrl}
        isLoading={isSaving}
        onSave={(name, cost) => {
          if (isUpdate)
            dispatch(
              pinActions.updatePin({
                cost,
                id,
                imageUrl: imageUrl || pin.imageUrl,
                name,
              })
            );
          else dispatch(pinActions.createPin({ cost, imageUrl, name }));
          setHasSaved(true);
        }}
        submitText={isUpdate ? 'Update pin' : 'Create pin'}
      />
    </Wrapper>
  );
};

export default PinDetails;
