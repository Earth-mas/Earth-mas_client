import styled from '@emotion/styled';
import Title01 from 'components/commons/text/title/Title01';
import { Colors } from 'styles/Colors';
import image from '../../../../assets/images/marketBanner/banner1.jpeg';

const DATA = [
  { image: image },
  { image: image },
  { image: image },
  { image: image },
  { image: image },
];

// const CONTENTS = {
//   title: '',
// };

export default function MarketDetail() {
  return (
    <Wrap>
      <nav>
        <Title01 content="마켓 > 주방" margin={35} size="C" />
      </nav>
      <main>
        <ItemImage>
          <div className="carousel-preview">
            <ul>
              {DATA.map(el => (
                <li className="carousel-preview-image">
                  <img src={el.image} />
                </li>
              ))}
            </ul>
          </div>
          <div className="carousel-zoom">
            <img src={image} />
            {/* state에 url 담아서 보여주기.. 어떻게..? */}
          </div>
        </ItemImage>
        <section>
          <Title01 size="C" content="NO 플라스틱 주방용품 키트" margin={15} />
        </section>
      </main>
    </Wrap>
  );
}

const Wrap = styled.div`
  max-width: 1024px;
  width: 100%;
  padding: 50px 0px 100px 0px;
  main {
    display: flex;
    grid-gap: 50px;
  }
  section {
    width: 100%;
    display: flex;
    grid-gap: 5px;
  }
`;

const ItemImage = styled.section`
  width: 100%;
  display: flex;
  grid-gap: 5px;
  .carousel-preview {
    & ul {
      display: flex;
      flex-direction: column;
      grid-gap: 5px;
    }
    & li.carousel-preview-image {
      width: 60px;
      aspect-ratio: 1 / 1;
      border-radius: 10px;
      overflow: hidden;
      :hover {
        cursor: pointer;
        border: 2px solid ${Colors.MAIN};
      }
      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        :hover {
          transform: scale(1.3);
          transition: all 0.3s ease-in-out;
        }
      }
    }
  }

  .carousel-zoom {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    overflow: hidden;
    :hover {
      cursor: pointer;
    }
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
