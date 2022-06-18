import { Avatar, CameraIcon } from 'assets/svgs';
import axios from 'axios';
import Modal from 'components/commons/modal';
import InfoModal from 'components/commons/modal/infoModal/infoModal';
import { ChangeEvent, useRef, useState } from 'react';
import store from 'storejs';

interface IProps {
  url: string;
  id: string;
}

export default function UpdateImage(props: IProps) {
  const [newUrl, setNewUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const onClickModal = () => setIsOpen(prev => !prev);
  const formData = new FormData();
  const accessToken = store.get('accessToken');
  const fileRef = useRef<HTMLInputElement>(null);
  const onClickButton = () => {
    if (fileRef.current != null) fileRef.current.click();
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    formData.append('files', file);
    axios
      .post(`http://34.64.224.198:3000/server/user/upload`, formData)
      .then(res => {
        const url = `https://storage.googleapis.com/${res.data[0]}`;
        setNewUrl(url);
        axios
          .put(
            `https://earth-mas.shop/server/user/${props.id}`,
            {
              url,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          )
          .then(() => setIsOpen(true));
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };

  const onClickDelete = () => {
    if (!props.url && !newUrl) {
      return alert('등록된 이미지가 없습니다.');
    }
    axios
      .put(
        `http://34.64.224.198:3000/server/user/${props.id}`,
        {
          url: null,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(() => {
        setNewUrl('.');
        alert('프로필 사진이 삭제되었습니다.');
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="avatarImage">
      {isOpen && (
        <Modal>
          <InfoModal
            onClickOk={onClickModal}
            title="💬 이미지 등록하기"
            contents="이미지가 성공적으로 등록되었습니다."
            okMessage="확인"
          />
        </Modal>
      )}
      <button onClick={onClickButton}>
        <input type="file" onChange={onChangeFile} ref={fileRef} />
        {!props.url && !newUrl && <Avatar />}
        {props.url && !newUrl && <img src={props.url} />}
        {newUrl && newUrl.length > 1 && <img src={newUrl} />}
        {props.url && newUrl && newUrl.length <= 1 && <Avatar />}
        {!props.url && newUrl && newUrl.length <= 1 && <Avatar />}
        <span>
          <CameraIcon className="cameraIcon" />
        </span>
      </button>
      <button onClick={onClickDelete}>이미지 삭제하기</button>
    </div>
  );
}
