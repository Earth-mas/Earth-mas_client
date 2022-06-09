import { ImageIcon, XbuttonIcon } from 'assets/svgs';

import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { Colors } from 'styles/Colors';
import * as S from './Upload01.styles';

interface IUpload01Props {
  page: 'market' | 'activity' | 'support' | 'user';
}
export default function Upload01Copy(props: IUpload01Props) {
  const [urls, setUrls] = useState<string[]>([]);

  const formData = new FormData();

  const onChangeUrl = (url: string) => {
    if (urls.length === 5) return;
    const temp = [...urls];
    temp.push(url);
    setUrls(temp);
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    formData.append('files', file);

    await axios
      .post(`http://34.64.224.198:3000/${props.page}/upload`, formData)
      .then(res => {
        const url = `https://storage.googleapis.com/${res.data[0]}`;
        onChangeUrl(url);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onClickDelete = (index: number) => () => {
    alert(index);
    const temp = [...urls];
    temp.splice(index, 1);
    setUrls(temp);
  };

  useEffect(() => {
    console.log(urls);
  }, []);

  return (
    <S.Wrap>
      <S.UploadButton>
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={onChangeFile}
        />
        <ImageIcon />
        <p>
          <span style={{ color: Colors.SUB1 }}>{urls.length}</span>
          <span>/5</span>
        </p>
      </S.UploadButton>

      {urls.map((el, index) => (
        <S.ImageWrap key={el}>
          <S.XButton onClick={onClickDelete(index)}>
            <XbuttonIcon />
          </S.XButton>
          <S.Image>
            {index === 0 && (
              <S.Text>
                <span>대표사진</span>
              </S.Text>
            )}

            <img src={el} />
          </S.Image>
        </S.ImageWrap>
      ))}
    </S.Wrap>
  );
}
