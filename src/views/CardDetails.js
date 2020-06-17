import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import LoadingIndicator from 'components/LoadingIndicator';
import {
  actions as cardActions,
  selectors as cardSelectors,
} from 'state/cards';
import CardForm from 'views/CardForm';

const CardDetails = () => {
  const cards = useSelector(cardSelectors.selectCards);
  const dispatch = useDispatch();
  const createErrors = useSelector(cardSelectors.selectCreateErrors);
  const hasFetched = useSelector(cardSelectors.hasFetched);
  const [hasSaved, setHasSaved] = useState(false);
  const { id } = useParams();
  const imageUrl = useSelector(cardSelectors.selectImageUrl);
  const isSaving = useSelector(cardSelectors.isSaving);
  const updateErrors = useSelector(cardSelectors.selectUpdateErrors);

  const card = cards[id];
  const isUpdate = id !== 'new';

  const errors = isUpdate ? updateErrors : createErrors;

  if (!hasFetched) return <LoadingIndicator centered large />;

  if (hasFetched && isUpdate && !card) return null;

  if (hasSaved && !isSaving && Object.keys(errors).length === 0)
    return <Redirect to="/listings/cards" />;

  return (
    <CardForm
      defaults={card}
      errors={errors}
      imageUrl={isUpdate ? card.imageUrl : imageUrl}
      isLoading={isSaving}
      onSave={(name, cost) => {
        if (isUpdate)
          dispatch(
            cardActions.updateCard({
              cost,
              id,
              imageUrl: imageUrl || card.imageUrl,
              name,
            })
          );
        else dispatch(cardActions.createCard({ cost, imageUrl, name }));
        setHasSaved(true);
      }}
    />
  );
};

export default CardDetails;
