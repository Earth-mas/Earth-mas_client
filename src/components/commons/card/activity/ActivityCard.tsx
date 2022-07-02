import styled from '@emotion/styled';
import { GetDate } from 'commons/utils/GetDate';
import Blank from 'components/commons/blank/Blank';
import Line from 'components/commons/line';
import Dompurify from 'dompurify';
import { Link } from 'react-router-dom';
import { Colors } from 'styles/Colors';
import { IPropsActivityCardList } from './ActivityCard.types';

export default function ActivityCard(props: IPropsActivityCardList) {
  return (
    <Wrapper id={props.el.id}>
      <Link to={`/activity/${props.el.id}`}>
        <div className="imgContainer">
          <img src={props.el?.url?.split(',')[0]} />
          <div className="addressContainer">{props.el?.location}</div>
        </div>

        <Blank height={10} />
        <div className="infoBox">
          {/* <div
            className="contentsBox"
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(props.el?.description),
            }}
          /> */}
          <div className="title">{props.el?.title}</div>
          <Line />
          <UserInfoBox>
            <div className="userImg">
              <img
                src={props.el?.activityjoin[0].user?.url}
                onError={e => {
                  e.currentTarget.src = '/images/avatar.svg';
                }}
              />
            </div>
            <span>
              {props.el?.activityjoin[0].user?.name
                ? props.el?.activityjoin[0].user?.name
                : '에러지롱!'}
            </span>
            <text>{GetDate(props.el?.createAt)}</text>
          </UserInfoBox>
        </div>
      </Link>
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

    .title {
      height: 40px;
      text-align: center;
      padding: 10px;
    }
  }
  .contentsBox {
    height: 47px;
    padding: 8px;
    overflow: hidden;

    :hover {
      overflow-y: scroll;
    }
  }
`;

const UserInfoBox = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .userImg {
    min-width: 30px;
    max-width: 30px;
    width: 100%;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
