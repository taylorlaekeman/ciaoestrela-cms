import styled from 'styled-components';

const addAttrs = () => ({ type: 'button' });

const Button = styled.button.attrs(addAttrs)`
  ${({ theme }) => theme.components.button.primary}
`;

export default Button;
