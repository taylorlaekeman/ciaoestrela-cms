import styled from 'styled-components';

const addProps = () => ({ type: 'submit' });

const Submit = styled.button.attrs(addProps)`
  ${(props) => props.theme.components.button.primary}
`;

export default Submit;
