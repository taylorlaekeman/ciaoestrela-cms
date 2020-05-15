import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { ReactComponent as UnstyledCog } from 'assets/icons/cog.svg';

const Cog = styled(({ className }) => <UnstyledCog className={className} />)`
  animation: spin ${(props) => (props.large ? '2s' : '1s')} linear infinite;
  fill: ${(props) => props.theme.colours.fill.icon};
  height: ${(props) => (props.large ? '32px' : '16px')};
  width: ${(props) => (props.large ? '32px' : '16px')};

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  padding-bottom: 60%;
`;

const LoadingIndicator = ({ centered, className, large }) => {
  if (centered)
    return (
      <Wrapper>
        <Cog className={className} large={large} />
      </Wrapper>
    );

  return <Cog className={className} large={large} />;
};

LoadingIndicator.defaultProps = {
  centered: false,
  className: '',
  large: false,
};

LoadingIndicator.propTypes = {
  centered: PropTypes.bool,
  className: PropTypes.string,
  large: PropTypes.bool,
};

export default LoadingIndicator;
