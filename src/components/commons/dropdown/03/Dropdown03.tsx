import { useState } from 'react';
import * as S from './Dropdown03.styles';
import { Link, useParams } from 'react-router-dom';

interface IDropdown03Props {
  openModal: () => void;
  page: string; // market | activity | support
}

export default function Dropdown03(props: IDropdown03Props) {
  const { id } = useParams();
  const [isActive, setIsActive] = useState(false);

  const onClickCategory = () => {
    setIsActive(prev => !prev);
  };

  return (
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
            <li onClick={props.openModal}>삭제</li>
          </ul>
        </S.Option>
      )}
    </S.Dropdown>
  );
}
