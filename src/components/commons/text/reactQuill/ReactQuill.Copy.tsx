import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { PLACEHOLDER } from './ReactQuill.data';
import { useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
interface IQuillEditorProps {
  page: number;
  onChange?: any;
  name?: string;
  value?: any;
  defaultValue?: string;
  resgister?: any;
}

export default function QuillEditorCopy(props: IQuillEditorProps) {
  const QuillRef = useRef<ReactQuill>();

  const handleImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];

      if (!file) return;

      const range = QuillRef.current?.getEditor().getSelection()?.index;
      const formData = new FormData();
      formData.append('files', file);
      await axios
        .post(`http://34.64.224.198:3000/server/market/upload`, formData)
        .then(res => {
          const url = `https://storage.googleapis.com/${res.data[0]}`;
          console.log(url);

          if (range !== null && range !== undefined) {
            const quill = QuillRef.current?.getEditor();
            quill?.setSelection(range, 1);
            quill?.clipboard.dangerouslyPasteHTML(
              range,
              `<img src=${url} alt="이미지 태그가 삽입됩니다." />`,
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['link', 'image'],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
        ],

        handlers: {
          image: handleImage,
        },
      },
    }),
    [],
  );

  useEffect(() => {
    // console.log(quillRef.current);
  }, []);
  return (
    <QuillWrap>
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder={PLACEHOLDER[props.page]}
        onChange={props.onChange}
        {...props.resgister}
        ref={element => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={props.value}
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

// import ReactQuill, { Quill } from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import styled from '@emotion/styled';
// import { Colors } from 'styles/Colors';
// import { PLACEHOLDER } from './ReactQuill.data';
// import { useEffect, useRef } from 'react';
// import axios from 'axios';
// interface IQuillEditorProps {
//   page: number;
//   onChange?: any;
//   name?: string;
//   value?: any;
//   defaultValue?: string;
//   resgister?: any;
// }

// export default function QuillEditor(props: IQuillEditorProps) {
//   const quillRef = useRef(null);

//   // 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
//   const toolbarOptions = [
//     [{ header: [1, 2, 3, false] }],
//     ['link', 'image'],
//     ['bold', 'italic', 'underline', 'strike'],
//     ['blockquote'],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     [{ color: [] }, { background: [] }],
//     [{ align: [] }],
//   ];

//   const handleImage = () => {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();
//     input.onchange = async () => {
//       const file = input.files?.[0];
//       const range = quill.getSelection(true);

//       if (!file) return;
//       const formData = new FormData();
//       formData.append('files', file);
//       await axios
//         .post(`http://34.64.224.198:3000/server/${props.page}/upload`, formData)
//         .then(res => {
//           const url = `https://storage.googleapis.com/${res.data[0]}`;

//           quill.insertEmbed(range.index, 'image', url);
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     };
//   };

//   const quill = new Quill('#editor', {
//     modules: {
//       toolbar: {
//         container: toolbarOptions,
//         handlers: {
//           image: handleImage,
//         },
//       },
//       clipboard: {
//         matchVisual: false,
//       },
//     },
//   });

//   return (
//     <QuillWrap>
//       <ReactQuill
//         theme="snow"
//         // modules={modules}
//         placeholder={PLACEHOLDER[props.page]}
//         onChange={props.onChange}
//         {...props.resgister}
//         ref={quillRef}
//         //  formats={formats}
//         value={props.value}
//       />
//     </QuillWrap>
//   );
// }

// const QuillWrap = styled.div`
//   .ql-toolbar {
//     border: 1px solid ${Colors.B60};
//     border-radius: 8px 8px 0px 0px;
//   }
//   .ql-container {
//     height: 500px;
//     overflow-y: scroll;
//     border: 1px solid ${Colors.B60};
//     border-radius: 0px 0px 8px 8px;
//   }
//   .ql-editor {
//     padding: 20px;
//   }
// `;
