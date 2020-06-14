import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import LoadingIndicator from 'components/LoadingIndicator';
import Error from './Error';

const addProps = () => ({ type: 'file' });

const ClickableLabel = styled.label`
  ${({ theme }) => theme.components.button.secondary}
`;

const FileInput = styled.input.attrs(addProps)`
  display: block;
  height: 0;
  opacity: 0;
  overflow: hidden;
  width: 100%;
`;

const Image = styled.img`
  border: solid ${({ theme }) => theme.colours.border.button.secondary} 1px;
  border-radius: 4px;
  padding: 0 25%;
  width: 100%;
`;

const Wrapper = styled.section`
  margin-bottom: 16px;
`;

const Upload = ({
  accept,
  children,
  className,
  error,
  hasSubmitted,
  isLoading,
  onChange,
  value,
}) => {
  const id = `upload-${children}`;
  const [isDirty, setIsDirty] = useState(false);

  const hasVisibleError = !isLoading && (hasSubmitted || isDirty) && error;

  return (
    <Wrapper className={className}>
      <FileInput
        accept={accept}
        files={value}
        id={id}
        onBlur={() => setIsDirty(true)}
        onChange={(event) => {
          setIsDirty(true);
          onChange(event.target.files);
        }}
        onClick={() => setIsDirty(true)}
      />
      {value && <Image src={value} />}
      <ClickableLabel htmlFor={id} value={value}>
        {isLoading ? <LoadingIndicator /> : children}
      </ClickableLabel>
      {hasVisibleError && <Error htmlFor={id}>{error}</Error>}
    </Wrapper>
  );
};

Upload.defaultProps = {
  accept: '',
  children: '',
  className: '',
  error: '',
  hasSubmitted: false,
  isLoading: false,
  onChange: () => {},
  value: null,
};

Upload.propTypes = {
  accept: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  hasSubmitted: PropTypes.bool,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default Upload;
