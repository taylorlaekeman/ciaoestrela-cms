import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  border: solid ${(props) => props.theme.colours.border.buttonSecondary} 1px;
  border-radius: 4px 4px 0 0;
  font-size: 0.8rem;
  list-style: none;
  margin: 0;
  padding: 8px 16px;
`;

const Name = styled.li`
  color: ${(props) => props.theme.colours.text.label};
  padding: 8px 0;
`;

const FileList = ({ className, files }) => {
  const fileNames = [];
  for (let i = 0; i < files.length; i += 1) {
    fileNames.push(files[i].name);
  }
  return (
    <List className={className}>
      {fileNames.map((name) => (
        <Name key={name}>{name}</Name>
      ))}
    </List>
  );
};

FileList.defaultProps = {
  className: '',
  files: { length: 0 },
};

FileList.propTypes = {
  className: PropTypes.string,
  files: PropTypes.shape({
    length: PropTypes.number.isRequired,
  }),
};

export default FileList;
