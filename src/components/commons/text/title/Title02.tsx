import styled from '@emotion/styled';
import Dropdown02 from 'components/commons/dropdown/02/Dropdown02';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

interface ITitle02Props {
  content?: string;
  margin?: number;
}
export default function Title02(props: ITitle02Props) {
  return (
    <Wrap>
      <H1 margin={props.margin}>{props.content}</H1>
      <Dropdown02 page={0} />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const H1 = styled.h1`
  font-family: ${FontFamily.BOLD};
  font-size: ${FontSize.LARGE_T};
  color: ${Colors.B100};
  margin-bottom: ${(props: ITitle02Props) =>
    props.margin ? `${props.margin}px` : '0px'};
`;
