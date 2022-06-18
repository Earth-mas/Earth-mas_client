import axios from 'axios';
import Modal from 'components/commons/modal';
import store from 'storejs';

import { useState } from 'react';
import AlertModal from './alertModal';
import { useNavigate } from 'react-router-dom';
import useSetUser from 'hooks/useSetUser';

export default function DeleteUser(props: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClickModal = () => setIsOpen(prev => !prev);

  const accessToken = store.get('accessToken');
  const navigate = useNavigate();

  const onClickDelete = () => {
    axios
      .delete(`https://earth-mas.shop/server/user/${props.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        store.remove('accessToken');
        alert('탈퇴가 완료되었습니다.');
        navigate('/');
      })
      .catch(error => {
        console.log(error);
      });
    useSetUser();
  };

  return (
    <>
      <section className="deleteUser">
        <h2 onClick={onClickModal}>회원탈퇴하기</h2>
      </section>
      {isOpen && (
        <Modal>
          <AlertModal
            onClickClose={onClickModal}
            onClickDelete={onClickDelete}
          />
        </Modal>
      )}
    </>
  );
}
