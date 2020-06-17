import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import EditIcon from 'components/EditIcon';
import Form from 'components/Form';
import Toggle from 'components/Form/Toggle';
import Link from 'components/Link';
import LoadingIndicator from 'components/LoadingIndicator';
import { actions as cardActions } from 'state/cards';

const Cost = styled.p`
  font-size: 0.6rem;
  grid-area: cost;
  letter-spacing: 1px;
`;

const Title = styled.h3`
  font-weight: 300;
  font-size: 1rem;
  grid-area: title;
  margin: 0;
`;

const Wrapper = styled.li`
  align-items: center;
  display: grid;
  grid-gap: 16px;
  grid-template-areas: 'title cost . edit toggle';
  grid-template-columns: auto auto 1fr auto auto;
  justify-content: space-between;
  list-style: none;
  padding: 16px 32px;
`;

const CardListItem = ({ card, isLoading }) => {
  const { cost, id, isAvailable, name } = card;
  const dispatch = useDispatch();
  return (
    <Wrapper isAvailable={isAvailable}>
      <Title>{name}</Title>
      <Cost>{`$ ${cost}`}</Cost>
      <Link area="edit" to={`/listings/cards/${card.id}`}>
        <EditIcon />
      </Link>
      {isLoading ? (
        <LoadingIndicator area="toggle" />
      ) : (
        <Form area="toggle">
          <Toggle
            name={`card-${id}-status`}
            onChange={() => {
              dispatch(
                cardActions.setStatus({
                  id: card.id,
                  status: !card.isAvailable,
                })
              );
            }}
            value={isAvailable}
          />
        </Form>
      )}
    </Wrapper>
  );
};

CardListItem.defaultProps = {
  card: {
    cost: '0.00',
    id: 0,
    isAvailable: false,
    name: '',
  },
  isLoading: false,
};

CardListItem.propTypes = {
  card: PropTypes.shape({
    cost: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isAvailable: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }),
  isLoading: PropTypes.bool,
};

export default CardListItem;
