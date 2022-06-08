import { useState } from 'react';
import { ReactComponent as DropdownIcon } from 'assets/svgs/icons/dropdown-icon.svg';

const MARKET = ['키트', '주방', '욕실', '데일리'];
// const ACTIVITY = ['키트', '주방', '욕실', '데일리'];

// interface IDropdown01Props {
//   page: string;
// }

export default function Dropdown01() {
  const [isActive, setIsActive] = useState(false);
  const [isSelected, setIsSelected] = useState('');

  //   const LIST = () => {
  //     if (props.page === 'market') return MARKET;
  //     if (props.page === 'activity') return ACTIVITY;
  //   };

  const onClickCategory = () => {
    setIsActive(prev => !prev);
  };

  const onClickOption = (el: string) => () => {
    setIsActive(prev => !prev);
    onClickCategory();
    setIsSelected(el);
  };
  return (
    <Dropdown onClick={onClickCategory} className={isActive ? 'activated' : ''}>
      <span className={isSelected ? 'selected' : ''}>
        {isSelected || '카테고리 선택'}
      </span>
      <DropdownIcon />
      {isActive && (
        <Option>
          <ul>
            {MARKET.map((el, index) => (
              <li key={index} onClick={onClickOption(el)}>
                {el}
              </li>
            ))}
          </ul>
        </Option>
      )}
    </Dropdown>
  );
}

import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const Dropdown = styled.div`
  width: 338px;
  height: 48px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${Colors.B60};
  border-radius: 8px;
  padding: 14px 20px;
  color: ${Colors.B60};
  font-family: ${FontFamily.MEDIUM};
  font-size: ${FontSize.MEDIUM_C};
  cursor: pointer;

  &.activated {
    border: 1px solid ${Colors.SUB1};
    color: ${Colors.B80};
  }

  .selected {
    color: ${Colors.B80};
  }
`;

export const Option = styled.div`
  position: absolute;
  width: 338px;
  left: 0px;
  top: 58px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 8px;

  ul {
    li {
      height: 50px;
      display: flex;
      align-items: center;
      padding: 14px 20px;
      cursor: pointer;
      :hover {
        color: ${Colors.MAIN};
        background-color: rgba(0, 160, 90, 0.2);
      }
    }
    li:first-of-type {
      border-radius: 8px 8px 0 0;
    }
    li:last-of-type {
      border-radius: 0 0 8px 8px;
    }
  }
`;
