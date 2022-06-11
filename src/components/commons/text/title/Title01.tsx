import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

interface ITitle01Props {
  content?: string;
  margin?: number;
  size: 'T' | 'C';
}
export default function Title01(props: ITitle01Props) {
  return (
    <>
      <H1 size={props.size} margin={props.margin}>
        {props.content}
      </H1>
    </>
  );
}

const H1 = styled.h1`
  font-family: ${FontFamily.BOLD};
  font-size: ${props => {
    if (props.size === 'T') return `${FontSize.LARGE_T}`;
    if (props.size === 'C') return `${FontSize.LARGE_C}`;
  }};

  color: ${Colors.B100};
  margin-bottom: ${(props: ITitle01Props) =>
    props.margin ? `${props.margin}px` : '0px'};
`;
