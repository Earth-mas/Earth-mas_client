// import { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';

export default function Slide(props: {
  banner1: string | undefined;
  banner2: string | undefined;
  banner3: string | undefined;
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
  };

  return (
    <>
      <SliderContainer {...settings}>
        <div>
          <img src={props.banner1} />
        </div>
        <div>
          <img src={props.banner2} />
        </div>
        <div>
          <img src={props.banner3} />
        </div>
      </SliderContainer>
      {/* <ArrowContainer>
          <NextArrow className="slick-next" />
          <PrevArrow className="slick-prev" />
        </ArrowContainer> */}
    </>
  );
}

/* const Wrapper = styled.div`
  width: 100vw;
  position: relative;
  top: 0;
  left: 0;
`; */
const SliderContainer = styled(Slider)`
  width: 100vw;
  img {
    min-width: 1024px;
    width: 100%;
  }

  .slick-dots {
    width: 1024px;
    /* padding: 0 50px; */
    text-align: left;
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
          transition: all 0.2s ease-in-out;
          width: 45px;
          background-color: ${Colors.SUB2};
        }
      }
    }
  }
  /* 
  .slick-prev,
  .slick-next {
    z-index: 1;
    top: unset;
    width: 40px;
    height: 40px;
    border: 3px solid ${Colors.BW};
    border-radius: 50%;
    bottom: 30px;
    ::before {
      font-size: 2.5rem;
      opacity: 1;
      position: relative;
    }
  }
  .slick-prev {
    left: unset;
    right: 20%;
    transform: translate(-50%, 0);
    &::before {
      content: '<';
      top: -5px;
      left: 3px;
    }
  }
  .slick-next {
    right: 16%;
    transform: translate(-50%, 0);
    &::before {
      content: '>';
      top: -5px;
      left: 7px;
    }
  }
  */
`;
/* const ArrowContainer = styled.div`
  z-index: 99;
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translate(-50%, 0);
  min-width: 1024px;
  width: 100%;

  > .slick-prev,
  > .slick-next {
    z-index: 1;
    top: unset;
    width: 40px;
    height: 40px;
    border: 3px solid ${Colors.BW};
    border-radius: 50%;
    bottom: 30px;
    ::before {
      font-size: 2.5rem;
      opacity: 1;
      position: relative;
    }
  }
  > .slick-prev {
    left: unset;
    right: 65px;
    transform: translate(0, 0);
    &::before {
      content: '<';
      top: -5px;
      left: 3px;
    }
  }
  > .slick-next {
    right: 0px;
    transform: translate(0, 0);
    &::before {
      content: '>';
      top: -5px;
      left: 7px;
    }
  }
`;
*/
/* const PrevArrow = styled.button``;
const NextArrow = styled.button``; */
