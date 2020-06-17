import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import UnstyledForm from 'components/Form';
import Error from 'components/Form/Error';
import Input from 'components/Form/Input';
import Upload from 'components/Form/Upload';
import Submit from 'components/Form/Submit';
import {
  actions as cardActions,
  selectors as cardSelectors,
} from 'state/cards';

const Form = styled(UnstyledForm)`
  ${({ theme }) => theme.components.panel}
  margin: 16px;
  padding: 32px;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0;
  margin-bottom: 32px;
  padding: 0;
`;

const CardForm = ({
  defaults,
  errors,
  imageUrl,
  isLoading,
  onSave,
  submitText,
}) => {
  const [cost, setCost] = useState(defaults.cost);
  const dispatch = useDispatch();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const isUploadingImage = useSelector(cardSelectors.isUploadingImage);
  const [name, setName] = useState(defaults.name);

  const costError =
    !cost || parseInt(cost, 10) <= 0
      ? 'Cost is required and must be a number greater than zero'
      : null;
  const imageError = imageUrl ? null : 'An image is required';
  const nameError = name ? null : 'Name is required';

  return (
    <Form
      onSubmit={() => {
        setHasSubmitted(true);
        if (!costError && !imageError && !nameError) onSave(name, cost);
      }}
    >
      <Title>Create a card</Title>
      <Input
        error={nameError}
        hasSubmitted={hasSubmitted}
        name="Name"
        onChange={setName}
        value={name}
      />
      <Input
        error={costError}
        hasSubmitted={hasSubmitted}
        name="Cost"
        onChange={setCost}
        type="number"
        value={cost}
      />
      <Upload
        accept=".png"
        error={imageError}
        hasSubmitted={hasSubmitted}
        isLoading={isUploadingImage}
        onChange={(newImage) => dispatch(cardActions.uploadImage(newImage))}
        value={imageUrl}
      >
        Click to upload an image
      </Upload>
      <Submit isLoading={isLoading}>{submitText}</Submit>
      {Object.values(errors).length > 0 && <Error>Could not create card</Error>}
    </Form>
  );
};

CardForm.defaultProps = {
  defaults: {
    cost: '',
    name: '',
  },
  errors: {},
  imageUrl: '',
  isLoading: false,
  onSave: () => {},
  submitText: '',
};

CardForm.propTypes = {
  defaults: PropTypes.shape({
    cost: PropTypes.string,
    name: PropTypes.string,
  }),
  errors: PropTypes.shape({}),
  imageUrl: PropTypes.string,
  isLoading: PropTypes.bool,
  onSave: PropTypes.func,
  submitText: PropTypes.string,
};

export default CardForm;
