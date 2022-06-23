import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const NewButton = () => {
  return (
    <>{localStorage.getItem('accessToken') && <LinkNew to="new">+</LinkNew>}</>
  );
};

const LinkNew = styled(Link)`
  z-index: 10;
  position: fixed;
  right: 55px;
  bottom: 40px;
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  text-align: center;
  background-color: ${Colors.SUB2};
  color: ${Colors.BW};
  font-family: ${FontFamily.BOLD};
  font-size: ${FontSize.LARGE_T};
`;
