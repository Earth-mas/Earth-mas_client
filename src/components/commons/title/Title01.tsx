import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

interface ITitle01Props {
  content: string;
}
export default function Title01(props: ITitle01Props) {
  return <H1>{props.content}</H1>;
}

const H1 = styled.h1`
  font-family: ${FontFamily.BOLD};
  font-size: ${FontSize.LARGE_C};
  color: ${Colors.B100};
`;
