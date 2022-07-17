import { ChangeEvent, useRef, useState } from 'react';

import { Avatar, CameraIcon } from 'assets/svgs';

import axiosApiInstance from 'commons/utils/axiosInstance';
import Modal from 'components/commons/modal';
import InfoModal from 'components/commons/modal/infoModal/infoModal';
import { useMutation, useQueryClient } from 'react-query';

interface IProps {
  url: string;
  id: string;
}

export default function UpdateImage(props: IProps) {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [isOpen, setIsOpen] = useState(false);

  const formData = new FormData();
  const fileRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const onClickModal = () => setIsOpen(prev => !prev);

  const onClickButton = () => {
    if (fileRef.current != null) fileRef.current.click();
  };

  const { mutate: uploadProfile } = useMutation(
    'uploadProfile',
    async () => {
      return axiosApiInstance.post(`user/upload`, formData);
    },
    {
      onSuccess: res => {
        const url = `https://storage.googleapis.com/${res.data[0]}`;
        updateUserURL(url);
      },
      onError: (error: any) => {
        alert(error.response.data.message);
      },
    },
  );

  const { mutate: updateUserURL } = useMutation(
    'updateUserURL',
    async (url: string) => {
      return await axiosApiInstance.put(`user`, { url });
    },
    {
      onSuccess: () => {
        setIsOpen(true);
        queryClient.invalidateQueries('getUser', { refetchInactive: true });
      },
      onError: (error: any) => {
        alert(error.response.data.message);
      },
    },
  );

  const { mutate: resetUserURL } = useMutation(
    'resetUserURL',
    async () => {
      return await axiosApiInstance.put(`user`, { url: null });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getUser', { refetchInactive: true });
        alert('프로필 사진이 삭제되었습니다.');
      },
      onError: (error: any) => {
        alert(error.response.data.message);
      },
    },
  );

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    formData.append('files', file);
    uploadProfile();
  };

  const onClickDelete = () => {
    if (!props.url) return alert('등록된 이미지가 없습니다.');
    resetUserURL();
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
        {props.url ? <img src={props.url} /> : <Avatar />}
        <span>
          <CameraIcon className="cameraIcon" />
        </span>
      </button>
      <button onClick={onClickDelete}>이미지 삭제하기</button>
    </div>
  );
}
