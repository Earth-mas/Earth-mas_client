import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 1024px;
`;
export const Container = styled.div`
  display: grid;
  grid-template-columns: 5fr 3fr;
  gap: 30px;
  padding: 50px;

  .slide {
    border: 1px solid black;
    height: 415px;
  }
`;
