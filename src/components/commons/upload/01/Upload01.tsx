import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Colors } from 'styles/Colors';
import * as S from './Upload01.styles';
import { ImageIcon, XbuttonIcon } from 'assets/svgs';

interface IUpload01Props {
  page: 'market' | 'activity' | 'support' | 'user';
  setUrls: Dispatch<SetStateAction<string[]>>;
  urls: string[];
  fetchData?: string[];
}
export default function Upload01(props: IUpload01Props) {
  // const [urls, setUrls] = useState<string[]>([]);
  const urls = props.urls;
  const setUrls = props.setUrls;

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
    temp.splice(index, 1);
    setUrls(temp);
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
              {props.fetchData ? props.fetchData.length : urls.length}
            </span>
            <span>/5</span>
          </p>
        </S.UploadButton>
        <Droppable droppableId="imageList" direction="horizontal">
          {provided => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {/* {props.fetchData ? (
                <> */}
              {props.fetchData?.map((el, index) => (
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
              {/* </> ) : ( <> */}
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
              {/* </> )} */}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </S.Wrap>
  );
}
