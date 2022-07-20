import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import store from 'storejs';
import styled from '@emotion/styled';

import Modal from 'components/commons/modal';
import AlertModal from '../../../../commons/modal/alertModal/alertModal';

import { userState } from 'recoil/user';
import axiosApiInstance from 'commons/utils/axiosInstance';

export default function DeleteUser(props: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClickModal = () => setIsOpen(prev => !prev);
  const resetUser = useResetRecoilState(userState);

  const navigate = useNavigate();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { mutate: deleteUser } = useMutation(
    'deleteUser',
    async () => {
      return await axiosApiInstance.delete(`user/${props.id}`);
    },
    {
      onSuccess: () => {
        store.remove('accessToken');
        alert('탈퇴가 완료되었습니다.');
        resetUser();
      },
      onError: (error: any) => {
        alert(error.response.data.message);
      },
    },
  );

  const onClickDelete = () => {
    deleteUser();
    navigate('/');
  };

  return (
    <DeleteUserWrapper>
      <section className="deleteUser">
        <h2 onClick={onClickModal}>회원탈퇴하기</h2>
      </section>
      {isOpen && (
        <Modal>
          <AlertModal
            onClickCancel={onClickModal}
            onClickOk={onClickDelete}
            title="💬 정말 탈퇴하시겠어요?"
            contents="해당 계정의 모든 정보가 삭제되며, 복구할 수 없습니다."
            okMessage="네, 탈퇴할게요"
            cancelMessage="아니오, 취소할게요"
          />
        </Modal>
      )}
    </DeleteUserWrapper>
  );
}

const DeleteUserWrapper = styled.div`
  h2 {
    cursor: pointer;
  }
`;
