import styled from 'styled-components';

const addAttrs = () => ({ type: 'button' });

const Button = styled.button.attrs(addAttrs)`
  ${({ plain, theme }) =>
    plain ? theme.components.button.plain : theme.components.button.primary}
`;

export default Button;
