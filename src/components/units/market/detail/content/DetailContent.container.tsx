import styled from '@emotion/styled';

interface IDetailContentProps {
  description?: string;
}
export default function DetailContent(props: IDetailContentProps) {
  return (
    <Wrap>
      <div>
        <div
          dangerouslySetInnerHTML={{ __html: String(props.description) }}
        ></div>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  /* background-color: beige; */
  > div {
    padding: 40px 20px;
  }
`;
