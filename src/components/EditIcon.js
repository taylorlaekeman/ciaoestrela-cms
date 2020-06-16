import styled from 'styled-components';

import { ReactComponent as Icon } from 'assets/icons/edit-pencil.svg';

const EditIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colours.fill.icon};
  grid-area: ${({ area }) => area};
  height: 16px;
  width: 16px;
`;

export default EditIcon;
