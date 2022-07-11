import { Dispatch, useState } from 'react';
import { DropdownIcon } from 'assets/svgs';
import * as S from './Dropdown02.styles';

const CATEGORY = [
  [
    { title: '인기순', find: 'findlike' },
    { title: '최신순', find: 'finddcs' },
  ],
  [
    { title: '최신순', find: 'finddcs' },
    { title: '종료마감순', find: 'finddday' },
  ],
];

interface ICategory {
  title: string;
  find: string;
}

interface IDropdown02Props {
  page: 0 | 1; // market | activity,support
  setSelect: Dispatch<React.SetStateAction<string>>;
}

export default function Dropdown02Copy(props: IDropdown02Props) {
  // 상위 컴포넌트에 들어갈 내용
  //   const [select, setSelect] = useState<string>('finddcs');
  // axios 요청시 삼항연산자 안써도 됩니다~ (아래 참고)
  // axios.post(`${marketRoute}/${select}

  const [isActive, setIsActive] = useState(false);
  const [isSelected, setIsSelected] = useState(CATEGORY[props.page][0].title);

  const onClickCategory = () => {
    setIsActive(prev => !prev);
  };

  const onClickOption = (el: ICategory) => () => {
    setIsActive(prev => !prev);
    onClickCategory();
    setIsSelected(el.title);
    props.setSelect(el.find);
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
            {CATEGORY[props.page].map(el => (
              <li key={el.title} onClick={onClickOption(el)}>
                {el.title}
              </li>
            ))}
          </ul>
        </S.Option>
      )}
    </S.Dropdown>
  );
}
