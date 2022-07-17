import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';

export const Wrap = styled.div`
  display: flex;
  grid-gap: 10px;

  ul {
    display: flex;

    li {
      margin: 0 10px;
    }
  }
`;

export const UploadButton = styled.label`
  width: 80px;
  height: 80px;
  border: 1px solid ${Colors.B60};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    :hover {
      cursor: pointer;
    }
  }
  p {
    margin-top: 5px;
  }
`;

export const ImageWrap = styled.div`
  position: relative;
  z-index: 1;
`;

export const Image = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const XButton = styled.div`
  z-index: 2;
  position: absolute;
  top: -8px;
  left: 70px;
  :hover {
    cursor: pointer;
  }
`;
