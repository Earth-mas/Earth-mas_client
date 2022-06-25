import styled from '@emotion/styled';
import { CalenderIcon, FrameIcon } from 'assets/svgs';
import axios from 'axios';
import { GetDate } from 'commons/utils/GetDate';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Dropdown03 from 'components/commons/dropdown/03/Dropdown03';
import Slide from 'components/commons/slide';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export interface ActivityDetail {
  activityjoing: Activityjoin;
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
  user: User;
}

interface Activitycategory {
  category?: string;
  createAt?: string;
  deleteAt?: any;
  id: string;
}

interface Activityjoin {
  admin: string;
  id: string;
  user: User;
}

interface User {
  address1: string;
  address2: string;
  addressnumber: string;
  createAt: string;
  delete?: string | null;
  email: string;
  id: string;
  name: string;
  password: string;
  phone: string;
  role: string;
  updateAt: string;
  url: string | undefined;
}

interface IpropsMainImg {
  width?: number;
  height?: number;
}

export default function ActivityDetail() {
  const params = useParams();
  const [activityData, setActivityData] = useState<ActivityDetail>();

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
            <img
              src={activityData?.user?.url}
              onError={event =>
                (event.currentTarget.src = '/images/avatar.svg')
              }
            />
            <span>{activityData?.user?.name}</span>
          </div>
          <section className="detailInfo">
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
              <li>{activityData?.maxpeople}명</li>
            </ul>
          </section>
          {/* <FrameIcon className="icon" /> */}
          <section className="icon2">
            <Dropdown03 page={'2'} />
          </section>
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
      <div className="button" style={{ margin: 'auto' }}>
        <ContainedButton01
          content={'참여하기'}
          color={'main'}
          type="submit"
          onClick={onClickSubmit}
        />
      </div>
      <Blank height={100} />
      {/* <ActivityDetailUI data={data} /> */}
    </Wrap>
  );
}

const Wrap = styled.div`
  max-width: 1024px;
  width: 100%;
  margin-top: 50px;
  .button {
    width: 20%;
  }
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
  .icon2 {
    margin-top: 15px;
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
