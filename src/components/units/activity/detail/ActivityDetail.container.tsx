import styled from '@emotion/styled';
import { CalenderIcon, FrameIcon } from 'assets/svgs';
import axios from 'axios';
import { GetDate } from 'commons/utils/GetDate';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import UserProfile from 'components/commons/profile/profile';
import Slide from 'components/commons/slide';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export interface RootObject {
  activitycategory: Activitycategory;
  createAt: string;
  dday: string;
  deleteAt?: any;
  description: string;
  id: string;
  location: string;
  maxpeople: number;
  people: number;
  subdescription: string;
  title: string;
  updateAt: string;
  url?: string;
}

interface Activitycategory {
  category?: string;
  createAt?: string;
  deleteAt?: any;
  id: string;
}

interface IpropsMainImg {
  width?: number;
  height?: number;
}

export default function ActivityDetail() {
  const params = useParams();
  const userInfo = useRecoilValue(userState);
  const { url, name } = userInfo;
  const [activityData, setActivityData] = useState<RootObject>();

  // useEffect(() => {
  //   const result = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://earth-mas.shop/server/activity/${params.id}`,
  //       );
  //       console.log('response 값: ', response);
  //       setActivityData(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   result();
  // }, []);
  useEffect(() => {
    const getActivityData = async () => {
      await axios
        .get(`https://earth-mas.shop/server/activity/${params.id}`)
        .then(res => {
          setActivityData(res.data);
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getActivityData();
  }, []);

  const onClickSubmit = () => {
    alert('채팅참여');
  };

  return (
    <Wrap>
      <MainImg>
        {/* <img
          className="slide"
          src={`https://storage.googleapis.com/${activityData?.url}`}
          onError={event =>
            (event.currentTarget.src = '/images/activity/XBox.jpg')
          }
        /> */}
        <Slide banner={activityData?.url?.split(',')} slide={'sub'} />
      </MainImg>
      <Blank height={50} />
      <PostBox>
        <p className="title">{activityData?.title}</p>
        <Blank height={25} />
        <div className="postInfoBox">
          <div className="userInfo">
            {/* <img
              src=""
              onError={event =>
                (event.currentTarget.src = '/images/avatar.svg')
              }
            /> */}
            <UserProfile size={40} avataUrl={url} name={name} />
            {/* <text>KB star</text> */}
          </div>
          <div className="detailInfo">
            <li>
              <CalenderIcon className="icon" />
              {GetDate(activityData?.createAt)}~{GetDate(activityData?.dday)}
            </li>
            <ul>
              <text>카테고리</text>
              <li>{activityData?.activitycategory?.category}</li>
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
          준비물 :{activityData?.subdescription}
          <br />
          본문 :
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(String(activityData?.description)),
            }}
          />
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
`;

const MainImg = styled.div`
  width: 100%;
  /* height: ${(props: IpropsMainImg) =>
    props.height ? `${380}px` : 'none'}; */
  height: 380px;
  border-radius: 5px;
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
    display: flex;

    & img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
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
