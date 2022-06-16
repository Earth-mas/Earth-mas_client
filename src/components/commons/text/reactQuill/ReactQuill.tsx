import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { PLACEHOLDER } from './ReactQuill.data';
import { SetStateAction } from 'react';
interface IQuillEditorProps {
  page: number;
  onChange?: any;
  name: string;
}

export default function QuillEditor(props: IQuillEditorProps) {
  // 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ['link', 'image'],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ];

  // 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
  // const formats = [
  //   'header',
  //   'font',
  //   'size',
  //   'bold',
  //   'italic',
  //   'underline',
  //   'strike',
  //   'align',
  //   'blockquote',
  //   'list',
  //   'bullet',
  //   'indent',
  //   'background',
  //   'color',
  //   'link',
  //   'image',
  //   'video',
  //   'width',
  // ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  return (
    <QuillWrap>
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder={PLACEHOLDER[props.page]}
        onChange={props.onChange}
        //  formats={formats}
      />
    </QuillWrap>
  );
}

const QuillWrap = styled.div`
  .ql-toolbar {
    border: 1px solid ${Colors.B60};
    border-radius: 8px 8px 0px 0px;
  }
  .ql-container {
    height: 500px;
    overflow-y: scroll;
    border: 1px solid ${Colors.B60};
    border-radius: 0px 0px 8px 8px;
  }
  .ql-editor {
    padding: 20px;
  }
`;
