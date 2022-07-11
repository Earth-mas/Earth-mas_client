import styled from '@emotion/styled';
import { GetDate } from 'commons/utils/GetDate';
import Blank from 'components/commons/blank/Blank';
import Line from 'components/commons/line';
import { Link } from 'react-router-dom';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';
import { IActivityList } from 'components/units/activity/list/ActivityList.types';
import { IActivityCardProps } from './ActivityCard.types';

export default function ActivityCard(props: IActivityCardProps) {
  return (
    <Wrapper id={props.el.id}>
      <Link to={`/activity/${props.el.id}`}>
        <div className="imgContainer">
          <img src={props.el.url?.split(',')[0]} />
          <div className="addressContainer">{props.el.location}</div>
        </div>

        <Blank height={10} />
        <div className="infoBox">
          <div className="title">
            <h5>{props.el.title}</h5>
          </div>
          <Line />
          <UserInfoBox>
            <div className="userImg">
              <img
                src={props.el.activityjoin[0].user?.url}
                onError={e => {
                  e.currentTarget.src = '/images/avatar.svg';
                }}
              />
            </div>
            <span>{props.el.activityjoin[0].user?.name}</span>
            <span>{GetDate(props.el.createAt)}</span>
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
      color: ${Colors.B20};
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
      font-family: ${FontFamily.MEDIUM};
      font-size: ${FontSize.MEDIUM_C};
      font-weight: 500;
      color: ${Colors.B100};
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
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
