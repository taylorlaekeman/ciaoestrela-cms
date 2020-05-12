import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Error from './Error';
import FileList from './FileList';

const addProps = () => ({ type: 'file' });

const ClickableLabel = styled.label`
  background-color: ${(props) =>
    props.theme.colours.background.buttonSecondary};
  border: solid ${(props) => props.theme.colours.border.buttonSecondary} 1px;
  border-radius: ${(props) => (props.value ? '0 0 4px 4px' : '4px')};
  box-sizing: border-box;
  color: ${(props) => props.theme.colours.text.buttonSecondary};
  display: inline-block;
  padding: 8px 16px;
  width: 100%;
`;

const FileInput = styled.input.attrs(addProps)`
  display: block;
  height: 0;
  opacity: 0;
  overflow: hidden;
  width: 100%;
`;

const Upload = ({ accept, className, error, onChange, text, value }) => (
  <section className={className}>
    <FileInput
      accept={accept}
      files={value}
      id={text}
      onChange={(event) => onChange(event.target.files)}
    />
    {value && <FileList files={value} />}
    <ClickableLabel htmlFor={text} value={value}>
      {text}
    </ClickableLabel>
    {error && <Error htmlFor={text}>{error}</Error>}
  </section>
);

Upload.defaultProps = {
  accept: '',
  className: '',
  error: '',
  onChange: () => {},
  text: '',
  value: null,
};

Upload.propTypes = {
  accept: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onChange: PropTypes.func,
  text: PropTypes.string,
  value: PropTypes.shape({}),
};

export default Upload;
