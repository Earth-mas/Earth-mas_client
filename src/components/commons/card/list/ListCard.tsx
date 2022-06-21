import styled from '@emotion/styled';
import Blank from 'components/commons/blank/Blank';
import Line from 'components/commons/line';
import UserProfile from 'components/commons/profile/profile';
import { Colors } from 'styles/Colors';
import { IPropsListCard } from './ListCard.types';

export default function ListCard(props: IPropsListCard) {
  return (
    <Wrapper>
      <div className="imgContainer">
        <img src={props.el.img} />
        <div className="addressContainer">{props.el.location}</div>
      </div>

      <Blank height={10} />
      <div className="infoBox">
        <div className="contentsBox">{props.el.contents}</div>
        <Line />
        <div className="userInfo">
          <UserProfile size={25} />
          <li>{props.el.user}</li>
          <li>{props.el.dday}</li>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 235px;
  width: 100%;

  .imgContainer {
    z-index: 1;
    width: 235px;
    height: 235px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      object-fit: cover;
    }
    .addressContainer {
      z-index: 2;
      width: 90px;
      height: 33px;
      position: absolute;
      border-radius: 10px;
      top: 15px;
      left: 145px;
      background-color: rgba(0, 171, 51, 0.5);
      text-align: center;
      line-height: 33px;
      /* display: table-cell;
    vertical-align: middle; */
    }
  }
  .infoBox {
    width: 235px;
    /* height: 85px; */
    border: 1px solid ${Colors.B20};
    border-radius: 10px;
  }
  .contentsBox {
    height: 47px;
    padding: 8px;
    overflow: hidden;

    :hover {
      overflow-y: scroll;
    }
  }

  .userInfo {
    padding: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
