import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';
import Title01 from '../text/title/Title01';
import category1 from '../../../assets/images/market/category/category1.jpeg';
import category2 from '../../../assets/images/market/category/category2.jpeg';
import category3 from '../../../assets/images/market/category/category3.jpeg';
import category4 from '../../../assets/images/market/category/category4.jpeg';
import category5 from '../../../assets/images/market/category/category5.jpeg';

import Line from '../line';

const CATEGORY = [
  [
    { category: '전체', image: category1 },
    { category: '욕실', image: category2 },
    { category: '주방', image: category3 },
    { category: '데일리', image: category4 },
    { category: '키트', image: category5 },
  ],
  [
    { category: '전체', image: 'a' },
    { category: '제로웨이스트', image: 'b' },
    { category: '플로깅', image: 'c' },
    { category: '플로킹', image: 'd' },
    { category: '라이딩', image: 'e' },
  ],
];

interface ICategoryProps {
  page: 0 | 1;
}

export default function Category(props: ICategoryProps) {
  return (
    <Wrap>
      <Title01 content="카테고리" size="T" margin={35} />
      <ul>
        {CATEGORY[props.page].map(el => (
          <li key={el.category}>
            <span>#{el.category}</span>
            <img src={el.image} />
          </li>
        ))}
      </ul>
      <Line margin={50} />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  ul {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 30px;
    position: relative;
    margin-bottom: 30px;
  }
  li {
    width: 100%;
    height: 80px;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      cursor: pointer;
    }
    span {
      z-index: 2;
      position: absolute;
      font-family: ${FontFamily.BOLD};
      font-size: ${FontSize.MEDIUM_T};
      color: ${Colors.BW};
    }
    img {
      z-index: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
