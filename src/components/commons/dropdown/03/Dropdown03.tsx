import { useState } from 'react';
import * as S from './Dropdown03.styles';
import { Link, useNavigate, useParams } from 'react-router-dom';

interface IDropdown03Props {
  deleteContent?: any;
  page: string; // market | activity | support
}

export default function Dropdown03(props: IDropdown03Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const onClickCategory = () => {
    setIsActive(prev => !prev);
  };

  const onClickDelete = () => {
    props.deleteContent();
    navigate(`/${props.page}`);
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
            <li onClick={onClickDelete}>삭제</li>
          </ul>
        </S.Option>
      )}
    </S.Dropdown>
  );
}
