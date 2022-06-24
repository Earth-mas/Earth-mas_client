import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontSize } from 'styles/FontStyles';
import { IPaginationStyleProps } from './Pagination.type';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;

  & > div {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      height: 10px;
      width: 10px;
      border: solid ${Colors.B100};
      border-width: 2px 2px 0 0;
    }
  }
`;

export const PageNumber = styled.div`
  font-size: ${FontSize.MEDIUM_C};
  margin-right: 10px;
  color: ${(props: IPaginationStyleProps) =>
    props.clickPage === Number(props.id) ? 'white' : Colors.B100};
  background-color: ${(props: IPaginationStyleProps) =>
    props.clickPage === Number(props.id) ? Colors.SUB1 : ''};
  &:last-of-type {
    margin-right: 0 !important;
  }
`;

export const Prev = styled.div`
  margin-right: 10px;
  background-color: ${Colors.B20};
`;
export const PrevArrow = styled.div`
  transform: rotate(-135deg);
  margin-left: 3px;
`;
export const Next = styled.div`
  background-color: ${Colors.B20};
`;
export const NextArrow = styled.div`
  transform: rotate(45deg);
  margin-right: 3px;
`;
