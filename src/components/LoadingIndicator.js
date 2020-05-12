import styled from 'styled-components';

import { ReactComponent as Cog } from 'assets/icons/cog.svg';

const LoadingIndicator = styled(Cog)`
  animation: spin ${(props) => (props.large ? '2s' : '1s')} linear infinite;
  fill: ${(props) => props.theme.colours.icon.normal};
  height: ${(props) => (props.large ? '32px' : '16px')};
  width: ${(props) => (props.large ? '32px' : '16px')};

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingIndicator;
