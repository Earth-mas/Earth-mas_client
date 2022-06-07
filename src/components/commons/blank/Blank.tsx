import styled from '@emotion/styled';

interface IPropsDiv {
  width: number;
  height: number;
}

const Div = styled.div`
  width: ${(props: IPropsDiv) => `${props.width}px`};
  height: ${(props: IPropsDiv) => `${props.height}px`};
`;

export default function Blank(props: IPropsDiv) {
  return <Div width={props.width} height={props.height} />;
}
