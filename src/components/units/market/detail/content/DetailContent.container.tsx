import styled from '@emotion/styled';
import Dompurify from 'dompurify';

interface IDetailContentProps {
  description?: string;
}
export default function DetailContent(props: IDetailContentProps) {
  return (
    <Wrap>
      {props.description && (
        <div
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(props.description),
          }}
        ></div>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 40px 80px;
  .ql-align-right {
    text-align: right;
  }
  .ql-align-center {
    text-align: center;
  }
  .ql-align-left {
    text-align: left;
  }
`;
