import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const Dropdown = styled.div`
  width: 180px;
  height: 37px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${Colors.SUB1};
  border-radius: 8px;
  padding-left: 20px;
  padding-right: 15px;
  font-family: ${FontFamily.MEDIUM};
  font-size: ${FontSize.SMALL};
  cursor: pointer;

  &.activated {
    border: 1px solid ${Colors.SUB1};
    color: ${Colors.B80};
  }

  .selected {
    color: ${Colors.MAIN};
  }
`;

export const Option = styled.div`
  position: absolute;
  width: 100%;
  left: 0px;
  top: 47px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 2;

  ul {
    li {
      height: 37px;
      display: flex;
      align-items: center;
      padding: 14px 20px;
      font-size: ${FontSize.SMALL};
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
