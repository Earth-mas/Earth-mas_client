import { Dispatch, SetStateAction, useState } from 'react';
import { ReactComponent as DropdownIcon } from 'assets/svgs/icons/dropdown-icon.svg';
import * as S from './Dropdown04.styles';
import { getPrice } from 'commons/utils/utils';

const Price = [
  { price: 1000 },
  { price: 5000 },
  { price: 10000 },
  { price: 30000 },
  { price: 50000 },
];

interface IDropdown02Props {
  setSelectAmount: Dispatch<SetStateAction<string>>;
}

export default function Dropdown04(props: IDropdown02Props) {
  const [isActive, setIsActive] = useState(false);
  const [isSelected, setIsSelected] = useState('1000');

  const onClickCategory = () => {
    setIsActive(prev => !prev);
  };

  const onClickOption = (el: string) => () => {
    setIsActive(prev => !prev);
    onClickCategory();
    setIsSelected(el);
    props.setSelectAmount(el);
  };

  return (
    <S.Dropdown
      onClick={onClickCategory}
      className={isActive ? 'activated' : ''}
    >
      <span className="selected">{getPrice(Number(isSelected))}</span>
      <DropdownIcon />
      {isActive && (
        <S.Option>
          <ul>
            {Price.map((el, index) => (
              <li
                value={el.price}
                key={index}
                onClick={onClickOption(el.price.toString())}
              >
                {getPrice(Number(el.price))}
              </li>
            ))}
          </ul>
        </S.Option>
      )}
    </S.Dropdown>
  );
}
