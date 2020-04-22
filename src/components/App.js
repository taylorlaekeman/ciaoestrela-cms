import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyles from 'styles/GlobalStyles';
import theme from 'styles/theme';
import Header from './Header';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
`;

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Wrapper>
      <Header />
    </Wrapper>
  </ThemeProvider>
);

export default App;
