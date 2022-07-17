import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';

interface ILineProps {
  margin?: number;
  color?: string;
}
export default function Line(props: ILineProps) {
  return <Gray margin={props.margin} color={props.color} />;
}

const Gray = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props: ILineProps) =>
    props.color ? `${props.color}` : `${Colors.B20}`};
  margin-bottom: ${(props: ILineProps) =>
    props.margin ? `${props.margin}px` : '0px'};
`;
