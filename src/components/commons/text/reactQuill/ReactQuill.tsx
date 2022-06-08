import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';

interface IQuillEditorProps {
  page: 'market' | 'activity' | 'support';
}

// const PLACEHOLDER = [
//   { page: 'market', contents: '마켓입니다' },
//   { page: 'activity', contents: '액티비티입니다' },
//   { page: 'support', contents: '후원입니다' },
// ];

export default function QuillEditor(props: IQuillEditorProps) {
  // PLACEHOLDER.map((el, index) => {
  //   if (el.page === props.page) {
  //     console.log(PLACEHOLDER[index].contents);
  console.log(props.page);
  //   }
  // });

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
`;
