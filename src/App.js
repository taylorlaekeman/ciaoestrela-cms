import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import store from 'state';
import GlobalStyles from 'styles/GlobalStyles';
import theme from 'styles/theme';
import CiaoestrelaCms from 'views/CiaoestrelaCms';

const App = () => (
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Security
          clientId="0oaa68lpjlDPKKogP4x6"
          issuer="https://dev-777810.okta.com/oauth2/default"
          redirectUri={`${window.location.origin}/implicit/callback`}
          scopes={['openid', 'profile', 'email']}
          pkce
        >
          <Route path="/implicit/callback" component={LoginCallback} />
          <SecureRoute path="/">
            <CiaoestrelaCms />
          </SecureRoute>
        </Security>
      </Router>
    </ThemeProvider>
  </ReduxProvider>
);

export default App;
