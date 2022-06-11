import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';

interface ILineProps {
  margin?: number;
}
export default function Line(props: ILineProps) {
  return <Gray margin={props.margin} />;
}

const Gray = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${Colors.B20};
  margin-bottom: ${(props: ILineProps) =>
    props.margin ? `${props.margin}px` : '0px'};
`;
