import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  ChangeEvent,
  Dispatch,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { Colors } from 'styles/Colors';
import * as S from './Upload02.styles';
import { ImageIcon, XbuttonIcon } from 'assets/svgs';
import logo from '../../../../assets/svgs/logo/logo-icon-w.svg';
import { v4 as uuid4 } from 'uuid';

interface IUpload02Props {
  page: 'marketreview';
  fetchData?: string[];
  urlString: string;
  setUrlString: Dispatch<React.SetStateAction<string>>;
}
export default function Upload02(props: IUpload02Props) {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    if (props.fetchData) setUrls(props.fetchData);
    // if (props.fetchData && urls.length === 0) {
    //   setUrls(props.fetchData);
    // }
  }, []);

  const formData = new FormData();

  const onChangeUrl = (url: string) => {
    if (urls.length === 5) return;
    const temp = [...urls];
    temp.push(url);
    setUrls(temp);
    props.setUrlString(temp.toString());
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    formData.append('files', file);
    await axios
      .post(`http://34.64.224.198:3000/server/${props.page}/upload`, formData)
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
    console.log(temp);
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

  const onErrorImg = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = logo;
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
            <span style={{ color: Colors.SUB1 }}>{urls.length}</span>
            <span>/4</span>
          </p>
        </S.UploadButton>
        <Droppable droppableId="imageList" direction="horizontal">
          {provided => (
            <>
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {urls.map((el, index) => (
                  <Draggable draggableId={uuid4()} index={index} key={uuid4()}>
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
                            <img src={el} onError={onErrorImg} />
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
