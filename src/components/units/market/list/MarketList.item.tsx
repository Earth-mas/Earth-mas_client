import styled from '@emotion/styled';
import {
  HeartRedIcon,
  HeartSmallIcon,
  HeartWhiteIcon,
  StarSmallIcon,
} from 'assets/svgs';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';
import banner1 from '../../../../assets/images/marketBanner/banner1.jpeg';
interface IMarketListItemProps {
  el: {
    title: string;
    amount: string;
    like: string;
    rating: string;
    review: string;
    url?: string;
  };
}
export default function MarketListItem(props: IMarketListItemProps) {
  const onClickLike = () => {
    alert('like');
  };

  const onClickDetail = () => {
    alert('move to detail');
  };

  return (
    <Wrap>
      <div className="image-wrap">
        <div className="like-wrap" onClick={onClickLike}>
          {/* <HeartWhiteIcon /> */}
          <HeartRedIcon />
        </div>
        <img
          src={props.el.url ? props.el.url : banner1}
          alt="상품이미지"
          onClick={onClickDetail}
        />
      </div>
      <div className="description-wrap">
        <h5>{props.el.title}</h5>
        <h2>
          <span className="discount-percent">27% </span>
          <span> {Number(props.el.amount).toLocaleString()}</span>
        </h2>
        <SubDescription>
          <span>
            <HeartSmallIcon /> {props.el.like}
          </span>{' '}
          <span>
            <StarSmallIcon /> {props.el.rating}({props.el.review})
          </span>
        </SubDescription>
      </div>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 15px;

  .image-wrap {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      :hover {
        cursor: pointer;
        transform: scale(1.1);
        transition: all 0.4s ease-in-out;
      }
    }
    .like-wrap {
      z-index: 2;
      position: absolute;
      bottom: 10px;
      right: 15px;
      :hover {
        cursor: pointer;
      }
    }
  }

  .description-wrap {
    padding: 0px 5px;
    display: flex;
    flex-direction: column;
    grid-gap: 3px;

    h5 {
      font-family: ${FontFamily.MEDIUM};
      font-size: ${FontSize.MEDIUM_C};
      font-weight: 500;
      color: ${Colors.B100};
    }

    h2 {
      font-family: ${FontFamily.BOLD};
      font-size: ${FontSize.MEDIUM_T};
      color: ${Colors.B100};
      .discount-percent {
        color: ${Colors.SUB2};
      }
    }
  }
`;

const SubDescription = styled.div`
  span {
    font-family: ${FontFamily.MEDIUM};
    font-size: ${FontSize.SMALL};
    color: ${Colors.B60};
  }
`;
