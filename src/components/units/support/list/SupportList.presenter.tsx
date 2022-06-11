import Line from 'components/commons/line';
import { Container, Wrapper } from './SupportList.styles';

export default function SupportListUI() {
  return (
    <>
      <Wrapper>
        <Container>
          <div className="slide"></div>
          <div className="mainContents"></div>
        </Container>

        <Line />

        <Container>
          <div className="description"></div>
          <div className="participationList"></div>
        </Container>

        <Line />
      </Wrapper>
    </>
  );
}
