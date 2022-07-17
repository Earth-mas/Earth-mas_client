import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';
import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { CONTENT } from './ReactQuill.data';
import { useMemo, useRef } from 'react';
import axios from 'axios';
import { UseFormRegister } from 'react-hook-form';
import { FormValues } from 'components/units/market/new/MarketNew.types';
import { host } from 'utils/APIRoutes';

interface IQuillEditorProps {
  page: 0 | 1 | 2; // 0 market | 1 activity | 2 support
  onChange?: (value: string) => void;
  name?: string;
  value?: string;
  defaultValue?: string;
  register?: UseFormRegister<FormValues>;
}

export default function QuillEditor(props: IQuillEditorProps) {
  Quill.register('modules/imageResize', ImageResize);
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
        .post(`${host}/server/${CONTENT[props.page].page}/upload`, formData)
        .then(res => {
          const url = `https://storage.googleapis.com/${res.data[0]}`;

          if (range !== null && range !== undefined) {
            const quill = QuillRef.current?.getEditor();
            quill?.setSelection(range, 1);
            quill?.clipboard.dangerouslyPasteHTML(
              range,
              `<img src=${url} alt="이미지 태그" />`,
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
      imageResize: {
        parchment: Quill.import('parchment'),
      },
    }),
    [],
  );
  return (
    <QuillWrap>
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder={CONTENT[props.page].placeholder}
        onChange={props.onChange}
        {...props.register}
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
