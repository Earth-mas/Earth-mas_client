import styled from '@emotion/styled';

interface IDetailContentProps {
  description?: string;
}
export default function DetailContent(props: IDetailContentProps) {
  return (
    <Wrap>
      <div>{props.description}</div>
    </Wrap>
  );
}

const Wrap = styled.div`
  background-color: beige;
`;
