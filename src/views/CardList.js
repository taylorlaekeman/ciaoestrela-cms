import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import UnstyledLink from 'components/Link';
import { selectors as authSelectors } from 'state/auth';
import {
  actions as cardActions,
  selectors as cardSelectors,
} from 'state/cards';
import CardListItem from 'views/CardListItem';

const Empty = styled.p`
  color: ${({ theme }) => theme.colours.text.empty};
  font-size: 0.85rem;
  margin: 0;
  padding: 16px;
`;

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colours.background.footer};
  border-radius: 0 0 4px 4px;
`;

const Header = styled.header`
  padding: 16px;
`;

const Link = styled(UnstyledLink)`
  padding: 16px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colours.text.body};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

const Wrapper = styled.article`
  ${({ theme }) => theme.components.panel}
  margin: 16px;
  padding: 0;
`;

const CardList = () => {
  const cards = useSelector(cardSelectors.selectCards);
  const dispatch = useDispatch();
  const isSettingStatus = useSelector(cardSelectors.isSettingStatus);
  const token = useSelector(authSelectors.selectToken);

  useEffect(() => {
    if (token) dispatch(cardActions.fetchCards());
  }, [dispatch, token]);

  return (
    <Wrapper>
      <Header>
        <Title>Cards</Title>
      </Header>
      {Object.values(cards).length === 0 ? (
        <Empty>Create a card to get started</Empty>
      ) : (
        <List>
          {Object.values(cards).map((card) => (
            <CardListItem
              card={card}
              isLoading={isSettingStatus[card.id]}
              key={card.id}
            />
          ))}
        </List>
      )}
      <Footer>
        <Link plain to="/listings/cards/new">
          + Create a card
        </Link>
      </Footer>
    </Wrapper>
  );
};

export default CardList;
