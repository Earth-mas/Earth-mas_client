import { Colors } from 'styles/Colors';

import { FontSize } from 'styles/FontStyles';
import styled from '@emotion/styled';

export const MyPageWrapper = styled.div`
  display: flex;
  min-width: 1024px;
  justify-content: space-between;
  padding: 50px 0 145px 0;
  color: ${Colors.B100};

  .mypageUl {
    width: 265px;
    height: 450px;
    box-shadow: ${Colors.B40} 0 7px 16px;
    border-radius: 20px;
    padding: 40px 20px;

    .focused {
      border: 1px solid ${Colors.SUB1};
      color: ${Colors.SUB1};
      margin-bottom: 10px;
      padding: 0 20px;
      font-size: ${FontSize.MEDIUM_C};
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 5px;
      :hover {
        border: 1px solid ${Colors.SUB1};
        color: ${Colors.SUB1};
      }
    }
    .submenu {
      cursor: pointer;
      border: 1px solid ${Colors.B80};
      margin-bottom: 10px;
      padding: 0 20px;
      font-size: ${FontSize.MEDIUM_C};
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 5px;
      :hover {
        border: 1px solid ${Colors.SUB1};
        color: ${Colors.SUB1};
      }
      .profile {
        padding: 20px 40px;
      }

      h1 {
        font-size: ${FontSize.MEDIUM_T};
        padding-bottom: 20px;
      }
    }

    .contentWrapper {
      width: 720px;
      border-radius: 20px;
      padding: 20px 30px;
    }
  }
`;
