import { useState } from 'react';
import * as S from './Dropdown05.styles';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from 'components/commons/modal';
import AlertModal from 'components/commons/modal/alertModal/alertModal';

interface IDropdown05Props {
  // refetch: any;
  deleteContent?: any;
  page: string; // market | activity | support
  title: string;
  contents: string;
  okMessage: string;
  cancelMessage: string;
}

export default function Dropdown05(props: IDropdown05Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

  const onClickCategory = () => {
    setIsActive(prev => !prev);
  };
  const onClickDelete = () => {
    props.deleteContent();
    navigate(`/${props.page}`);
    /* function refetchList() {
     if (id) {
       props.refetch();
     }
   }
   refetchList(); */
  };

  return (
    <>
      {isOpen && (
        <Modal>
          <AlertModal
            cancelMessage={props.cancelMessage}
            contents={props.contents}
            okMessage={props.okMessage}
            onClickCancel={toggleModal}
            onClickOk={onClickDelete}
            title={props.title}
          />
        </Modal>
      )}
      <S.Dropdown
        onClick={onClickCategory}
        className={isActive ? 'activated' : ''}
      >
        <span></span>
        <span></span>
        <span></span>

        {isActive && (
          <S.Option>
            <ul>
              <li>
                <Link to={`/${props.page}/${id}/edit`}>수정</Link>
              </li>
              <li onClick={toggleModal}>삭제</li>
            </ul>
          </S.Option>
        )}
      </S.Dropdown>
    </>
  );
}
