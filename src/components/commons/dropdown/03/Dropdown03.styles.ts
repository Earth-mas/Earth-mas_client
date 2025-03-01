import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const Dropdown = styled.div`
  width: 10px;
  height: 21px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &.activated {
    span {
      background-color: ${Colors.MAIN};
    }
  }

  .selected {
    color: ${Colors.B80};
  }

  span {
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: ${Colors.B100};
  }
`;

export const Option = styled.div`
  position: absolute;
  width: 100px;
  height: 30px;
  top: -5px;
  right: 20px;
  border: 1px solid ${Colors.MAIN};
  border-radius: 20px;
  z-index: 2;

  ul {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    li {
      width: 100%;
      line-height: 30px;
      text-align: center;
      color: ${Colors.B60};
      font-family: ${FontFamily.BOLD};
      font-size: ${FontSize.SMALL};
      :first-of-type {
        padding-left: 5px;
      }
      :last-of-type {
        padding-right: 5px;
      }
      :hover {
        color: ${Colors.MAIN};
        a {
          color: inherit;
        }
      }
      a {
        display: block;
        color: inherit;
        font-family: inherit;
      }
    }
  }
`;
