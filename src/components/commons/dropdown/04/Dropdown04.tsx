import { Dispatch, SetStateAction, useState } from 'react';
import { ReactComponent as DropdownIcon } from 'assets/svgs/icons/dropdown-icon.svg';
import * as S from './Dropdown04.styles';

const Price = [
  { string: '1,000', number: 1000 },
  { string: '5,000', number: 5000 },
  { string: '10,000', number: 10000 },
  { string: '30,000', number: 30000 },
  { string: '50,000', number: 50000 },
];

interface IDropdown02Props {
  setSelectAmount: Dispatch<SetStateAction<string>>;
  // page: 0 | 1; // market | activity,support
  // setSelect?: any;
  // setSelect?: Dispatch<React.SetStateAction<boolean>>;
}

export default function Dropdown04(props: IDropdown02Props) {
  const [isActive, setIsActive] = useState(false);
  const [isSelected, setIsSelected] = useState('1,000');

  const onClickCategory = () => {
    setIsActive(prev => !prev);
  };

  const onClickOption = (el: string) => () => {
    setIsActive(prev => !prev);
    onClickCategory();
    setIsSelected(el);
    props.setSelectAmount(el);
    // props.setSelect((prev: boolean) => !prev);
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
            {Price.map((el, index) => (
              <li
                value={el.number}
                key={index}
                onClick={onClickOption(el.string)}
              >
                {el.string}
              </li>
            ))}
          </ul>
        </S.Option>
      )}
    </S.Dropdown>
  );
}
