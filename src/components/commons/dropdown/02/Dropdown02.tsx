import { useState } from 'react';
import { ReactComponent as DropdownIcon } from 'assets/svgs/icons/dropdown-icon.svg';
import * as S from './Dropdown02.styles';

const CATEGORY = [
  ['인기순', '최신순'],
  ['최신순', '종료마감순'],
];

interface IDropdown02Props {
  page: 0 | 1; // market | activity,support
}

export default function Dropdown02(props: IDropdown02Props) {
  const [isActive, setIsActive] = useState(false);
  const [isSelected, setIsSelected] = useState(CATEGORY[props.page][0]);

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
      <span className="selected">{isSelected}</span>
      <DropdownIcon />
      {isActive && (
        <S.Option>
          <ul>
            {CATEGORY[props.page].map((el, index) => (
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
