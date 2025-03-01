import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const Dropdown = styled.div`
  width: 100%;
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
  width: 100%;
  left: 0px;
  top: 58px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 2;

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
