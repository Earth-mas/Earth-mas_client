import { useState } from 'react';
import { ReactComponent as DropdownIcon } from 'assets/svgs/icons/dropdown-icon.svg';
import * as S from './Dropdown01.styles';

const MARKET = ['키트', '주방', '욕실', '데일리'];
const ACTIVITY = ['제로웨이스트', '플로깅', '플로킹', '라이딩'];

interface IDropdown01Props {
  page: 'market' | 'activity';
}

export default function Dropdown01(props: IDropdown01Props) {
  const [isActive, setIsActive] = useState(false);
  const [isSelected, setIsSelected] = useState('');

  const onClickCategory = () => {
    setIsActive(prev => !prev);
  };

  const onClickOption = (el: string) => () => {
    setIsActive(prev => !prev);
    onClickCategory();
    setIsSelected(el);
  };
  return (
    <S.Dropdown
      onClick={onClickCategory}
      className={isActive ? 'activated' : ''}
    >
      <span className={isSelected ? 'selected' : ''}>
        {isSelected || '카테고리 선택'}
      </span>
      <DropdownIcon />
      {isActive && (
        <S.Option>
          <ul>
            {props.page === 'market'
              ? MARKET.map((el, index) => (
                  <li key={index} onClick={onClickOption(el)}>
                    {el}
                  </li>
                ))
              : ACTIVITY.map((el, index) => (
                  <li key={index} onClick={onClickOption(el)}>
                    {el}
                  </li>
                ))}
          </ul>
        </S.Option>
      )}
    </S.Dropdown>
  );
}
