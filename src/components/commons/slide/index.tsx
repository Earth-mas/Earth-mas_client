import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';

export default function Slide(props: {
  banner1: string | undefined;
  banner2: string | undefined;
  banner3: string | undefined;
  slide: string; // main | sub
  // autoplay: boolean; // true | false
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: props.autoplay,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
  };

  return (
    <>
      <SliderContainer {...settings} slide={props.slide}>
        {props.banner1 === undefined ? (
          ''
        ) : (
          <div>
            <img src={props.banner1} />
          </div>
        )}
        {props.banner2 === undefined ? (
          ''
        ) : (
          <div>
            <img src={props.banner2} />
          </div>
        )}
        {props.banner3 === undefined ? (
          ''
        ) : (
          <div>
            <img src={props.banner3} />
          </div>
        )}
      </SliderContainer>
    </>
  );
}

const SliderContainer = styled(Slider)`
  width: ${props =>
    (props.slide === 'main' && '100vw') || (props.slide === 'sub' && '100%')};
  overflow-x: hidden;
  height: inherit;

  div {
    width: 100%;
    height: inherit;
    object-fit: cover;
    img {
      min-width: ${props =>
        (props.slide === 'main' && '1024px') ||
        (props.slide === 'sub' && '100%')};
      width: 100%;
      height: inherit;
      object-fit: cover;
    }
  }

  .slick-dots {
    max-width: 1024px;
    width: 100%;
    text-align: ${props =>
      (props.slide === 'main' && 'left') ||
      (props.slide === 'sub' && 'center')};
    margin: 0 auto;
    left: 50%;
    bottom: 45px;
    transform: translate(-50%, 0%);

    li {
      margin: 0;
      width: auto;
      height: 15px;
      margin: 0 5px;
      button {
        width: 15px;
        height: 15px;
        border-radius: 20px;
        padding: 0;
        background-color: ${Colors.BW};
        &:before {
          content: '';
          width: 15px;
          height: 15px;
          opacity: 1;
        }
      }
      &.slick-active {
        button {
          transition: all 0.3s ease-in-out;
          width: 80px;
          background-color: ${Colors.SUB2};
        }
      }
    }
  }
`;
