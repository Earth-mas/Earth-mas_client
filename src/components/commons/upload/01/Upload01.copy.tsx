import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { Colors } from 'styles/Colors';
import * as S from './Upload01.styles';
import { ImageIcon, XbuttonIcon } from 'assets/svgs';
interface IUpload01Props {
  page: 'market' | 'activity' | 'support' | 'user';
  fetchData?: string[];
  urlString: string;
  setUrlString: Dispatch<React.SetStateAction<string>>;
}
export default function Upload01Copy(props: IUpload01Props) {
  // 상위 컴포넌트에 넣을 코드
  // const [urlString, setUrlString] = useState('');

  const [urls, setUrls] = useState<string[]>([]);
  useEffect(() => {
    if (props.fetchData && urls.length === 0) {
      setUrls(props.fetchData);
    }
  }, [props.fetchData]);

  const onChangeUrl = (url: string) => {
    if (urls.length === 5) return;
    const temp = [...urls];
    temp.push(url);
    setUrls(temp);
    props.setUrlString(temp.toString());
    // console.log(temp.toString());
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('files', file);
    await axios
      .post(`https://earth-mas.shop/server/${props.page}/upload`, formData)
      .then(res => {
        const url = `https://storage.googleapis.com/${res.data[0]}`;
        onChangeUrl(url);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onClickDelete = (index: number) => () => {
    const temp = [...urls];
    temp.splice(index, 1);
    setUrls(temp);
    props.setUrlString(temp.toString());
  };
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination === source) return;
    const originData = urls;
    const [reorderedData] = originData.splice(source.index, 1);
    originData.splice(destination.index, 0, reorderedData);
    setUrls(originData);
    props.setUrlString(originData.toString());
  };

  return (
    <S.Wrap>
      <DragDropContext onDragEnd={onDragEnd}>
        <S.UploadButton>
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={onChangeFile}
          />
          <ImageIcon />
          <p>
            <span style={{ color: Colors.SUB1 }}>
              {urls[0] ? urls.length : 0}
            </span>
            <span>/5</span>
          </p>
        </S.UploadButton>
        <Droppable droppableId="imageList" direction="horizontal">
          {provided => (
            <>
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {urls.map((el, index) => (
                  <Draggable draggableId={el} index={index} key={el}>
                    {provided => (
                      <li>
                        <S.ImageWrap
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
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
                      </li>
                    )}
                  </Draggable>
                ))}
              </ul>
              <span style={{ display: 'none' }}>{provided.placeholder}</span>
            </>
          )}
        </Droppable>
      </DragDropContext>
    </S.Wrap>
  );
}
