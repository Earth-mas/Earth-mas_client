import { useState } from 'react';
import * as S from './Dropdown05.styles';
import { Link, useNavigate, useParams } from 'react-router-dom';

interface IDropdown05Props {
  // refetch: any;
  // deleteContent?: any;
  page: string; // market | activity | support
  toggleEditModal?: () => void;
  toggleDeleteModal?: () => void;
}

export default function Dropdown05(props: IDropdown05Props) {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const onClickCategory = () => {
    setIsActive(prev => !prev);
  };

  // const onClickDelete = () => {
  //   props.toggleDeleteModal;
  //   navigate(`/${props.page}`);
  // };

  return (
    <>
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
              {props.page === 'marketreview' ? (
                <li onClick={props.toggleEditModal}>수정</li>
              ) : (
                <li>
                  <Link to={`/${props.page}/${id}/edit`}>수정</Link>
                </li>
              )}
              <li onClick={props.toggleDeleteModal}>삭제</li>
            </ul>

            {/* {props.page === 'marketreview' ? (
              <ul>
                <li onClick={props.toggleEditModal}>수정</li>
                <li onClick={props.toggleDeleteModal}>삭제</li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to={`/${props.page}/${id}/edit`}>수정</Link>
                </li>
                <li onClick={props.toggleDeleteModal}>삭제</li>
              </ul>
            )} */}
          </S.Option>
        )}
      </S.Dropdown>
    </>
  );
}
