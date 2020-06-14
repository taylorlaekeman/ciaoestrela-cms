import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  actions as cardActions,
  selectors as cardSelectors,
} from 'state/cards';
import CardForm from 'views/CardForm';

const CardDetails = () => {
  const dispatch = useDispatch();
  const errors = useSelector(cardSelectors.selectErrors);
  const [hasSaved, setHasSaved] = useState(false);
  const imageUrl = useSelector(cardSelectors.selectImageUrl);
  const isCreatingCard = useSelector(cardSelectors.isCreatingCard);

  if (hasSaved && !isCreatingCard && Object.keys(errors).length === 0)
    return <Redirect to="/listings/cards" />;

  return (
    <CardForm
      errors={errors}
      imageUrl={imageUrl}
      isLoading={isCreatingCard}
      onSave={(name, cost) => {
        dispatch(cardActions.createCard({ cost, imageUrl, name }));
        setHasSaved(true);
      }}
    />
  );
};

export default CardDetails;
