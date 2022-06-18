import styled from '@emotion/styled';
import Input01 from 'components/commons/inputs/Input01';
import { Dispatch, SetStateAction } from 'react';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

interface IReviewNewProps {
  title: string;
  minidescription: string;
  id: string;
  contents: string;
  setContents: Dispatch<SetStateAction<string>>;
}
export default function ReviewNew(props: IReviewNewProps) {
  return (
    <Wrap>
      <h1>{props.title}</h1>
      <p className="description">{props.minidescription}</p>
      <h3>별점 평가</h3>
      <p>별점 영역~~</p>
      <h3>리뷰 작성</h3>
      <Input01
        type="text"
        onChange={event => props.setContents(event.target.value)}
      />
      <dl>
        <dt>리뷰 정책</dt>
        <dd>다음 금지 행위 어쩌구 저쩌구 위배되면 깜빵 고고</dd>
        <dd>다음 금지 행위 어쩌구 저쩌구 위배되면 깜빵 고고</dd>
        <dd>다음 금지 행위 어쩌구 저쩌구 위배되면 깜빵 고고</dd>
      </dl>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  height: calc(80vh - 145px);
  overflow: scroll;
  padding: 0px 20px;
  h1 {
    font-family: ${FontFamily.BOLD};
    font-size: ${FontSize.MEDIUM_T};
    color: ${Colors.B100};
    margin-bottom: 10px;
  }
  p {
    font-family: ${FontFamily.MEDIUM};
    font-size: ${FontSize.SMALL};
    color: ${Colors.B80};
    margin-bottom: 5px;
  }
`;
