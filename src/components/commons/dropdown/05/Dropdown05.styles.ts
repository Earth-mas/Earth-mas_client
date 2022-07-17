import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const Dropdown = styled.div`
  width: 10px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-top: 6px;

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
  left: -110px;
  border: 1px solid ${Colors.MAIN};
  border-radius: 20px;
  z-index: 2;
  background-color: white;

  ul {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    li {
      line-height: 30px;
      color: ${Colors.B60};
      font-family: ${FontFamily.BOLD};
      font-size: ${FontSize.SMALL};

      :hover {
        color: ${Colors.MAIN};
      }
    }
  }
`;
