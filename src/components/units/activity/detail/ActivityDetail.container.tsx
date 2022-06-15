import styled from '@emotion/styled';
import { CalenderIcon, FrameIcon } from 'assets/svgs';
import axios from 'axios';
import { GetDate } from 'commons/utils/GetDate';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import ContainedButton02 from 'components/commons/button/contained/ContainedButton02';
import OutlinedButton01 from 'components/commons/button/outlined/OutlinedButton01';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';
import ActivityDetailUI from './ActivityDetail.presenter';

export interface RootObject {
  activitycategory: Activitycategory;
  id: string;
  createAt: string;
  dday: string;
  deleteAt?: any;
  description: string;
  location: string;
  maxpeople: number;
  people: number;
  subdescription: string;
  title: string;
  updateAt: string;
  url: string;
}

interface Activitycategory {
  category: string;
  createAt: string;
  deleteAt?: any;
}

export default function ActivityDetail() {
  const [activityData, setActivityData] = useState<RootObject>();

  useEffect(() => {
    const result = async () => {
      try {
        const response = await axios.get(
          'https://earth-mas.shop/server/activity/finddcs',
        );
        console.log(response);
        setActivityData(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    result();
  }, []);

  const onClickSubmit = () => {
    alert('채팅참여');
  };

  return (
    <Wrap>
      <MainImg>
        <img
          className="slide"
          // style={{ width: '100%', height: '380px' }}
          src={`https://storage.googleapis.com/${activityData?.url}`}
          onError={event =>
            (event.currentTarget.src = '/images/activity/XBox.jpg')
          }
        />
      </MainImg>
      <Blank height={50} />
      <PostBox>
        <p className="title">{activityData?.title}</p>
        <Blank height={25} />
        <div className="postInfoBox">
          <div className="userInfo">
            <img src="" />
            <text>KB star</text>
          </div>
          <div className="detailInfo">
            <li>
              <CalenderIcon className="icon" />
              {GetDate(activityData?.createAt)}~{GetDate(activityData?.dday)}
            </li>
            <ul>
              <text>카테고리</text>
              <li>{activityData?.activitycategory.category}</li>
              <text>지역</text>
              <li>{activityData?.location}</li>
              <text>모집인원</text>
              <li>{activityData?.people}명</li>
            </ul>
          </div>
          <FrameIcon className="icon" />
        </div>
        <Blank height={25} />
        <div className="postContents">
          준비물 :<p>{activityData?.subdescription}</p>
          본문 :<p>{activityData?.description}</p>
        </div>
      </PostBox>
      <ContainedButton01
        content={'참여하기'}
        color={'main'}
        type="submit"
        onClick={onClickSubmit}
      />
      {/* <ActivityDetailUI data={data} /> */}
    </Wrap>
  );
}

const Wrap = styled.div`
  max-width: 1024px;
  width: 100%;
  margin-top: 50px;
  background-color: green;
`;

const MainImg = styled.div`
  .slide {
    width: 100%;
    height: 380px;
    border-radius: 5px;
  }
`;

const PostBox = styled.div`
  width: 100%;
  .title {
    font-family: ${FontFamily.BOLD};
    font-size: ${FontSize.LARGE_T};
  }

  .postInfoBox {
    height: 80px;
    border: 1px solid ${Colors.B60};
    border-radius: 8px;
    padding: 12px 20px;
    background-color: red;
    display: flex;

    & img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: yellow;
    }

    .userInfo {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      width: 12%;
      margin-right: 20px;
    }

    /* & div:last-of-type {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    } */
    /* & div > div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    } */

    .detailInfo {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }

  .icon {
    margin-right: 5px;
  }
  .icon:last-child {
    margin-left: auto;
  }

  UL {
    & > text {
      color: ${Colors.B60};
      margin-right: 5px;
    }
  }
  LI {
    display: inline;
    font-size: ${FontSize.MEDIUM_C};
    margin-right: 20px;
  }

  .postContents {
    padding: 20px;
  }
`;
