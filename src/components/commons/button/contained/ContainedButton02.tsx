import styled from '@emotion/styled';
import { FontFamily, FontSize } from 'styles/FontStyles';
import { Colors } from 'styles/Colors';

const Button = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 40px;
  cursor: pointer;
  font-family: ${FontFamily.BOLD};
  font-size: ${FontSize.MEDIUM_C};
  color: ${Colors.BW};
  background-color: ${props => {
    if (props.color === 'main') return Colors.MAIN;
    if (props.color === 'sub') return Colors.SUB1;
  }};
`;

interface IContainedButton02Props {
  content: string;
  color: string;
}

export default function ContainedButton02(props: IContainedButton02Props) {
  return <Button color={props.color}>{props.content}</Button>;
}
