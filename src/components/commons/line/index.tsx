import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';

export default function Line() {
  return <Gray />;
}

const Gray = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${Colors.B20};
`;
