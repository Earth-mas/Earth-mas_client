import { useState } from 'react';
import * as S from './Dropdown06.styles';
import { Link, useParams } from 'react-router-dom';

// activity 전용 수정 / 삭제 컴포넌트

interface IDropdown05Props {
  page: string; // market | activity | support
  toggleDeleteModal?: () => void;
}

export default function Dropdown05(props: IDropdown05Props) {
  const { id } = useParams();
  const [isActive, setIsActive] = useState(false);

  const onClickCategory = () => {
    setIsActive(prev => !prev);
  };

  return (
    <>
      <S.Dropdown
        onClick={onClickCategory}
        // className={isActive ? 'activated' : ''}
      >
        <span></span>
        <span></span>
        <span></span>

        {isActive && (
          <S.Option>
            <div>
              <text>
                <Link to={`/${props.page}/${id}/edit`}>수정</Link>
              </text>
              <text onClick={props.toggleDeleteModal}>
                <Link to={`/${props.page}`}>삭제</Link>
              </text>
            </div>
          </S.Option>
        )}
      </S.Dropdown>
    </>
  );
}
