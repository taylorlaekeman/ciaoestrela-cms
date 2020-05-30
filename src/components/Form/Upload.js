import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

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

const Upload = ({ accept, children, className, error, onChange, value }) => {
  const id = `upload-${children}`;
  return (
    <section className={className}>
      <FileInput
        accept={accept}
        files={value}
        id={id}
        onChange={(event) => onChange(event.target.files)}
      />
      {value && <Image src={value} />}
      <ClickableLabel htmlFor={id} value={value}>
        {children}
      </ClickableLabel>
      {error && <Error htmlFor={id}>{error}</Error>}
    </section>
  );
};

Upload.defaultProps = {
  accept: '',
  children: '',
  className: '',
  error: '',
  onChange: () => {},
  value: null,
};

Upload.propTypes = {
  accept: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default Upload;
