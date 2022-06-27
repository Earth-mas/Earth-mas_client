import styled from '@emotion/styled';
import logo from '../../../../assets/svgs/logo/logo-icon-w.svg';
import { CalenderIcon } from 'assets/svgs';
import axios from 'axios';
import { GetDate } from 'commons/utils/GetDate';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Dropdown05 from 'components/commons/dropdown/05/Dropdown05';
import Slide from 'components/commons/slide';
import DOMPurify from 'dompurify';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';
import { activityRoute } from 'utils/APIRoutes';
import Modal from 'components/commons/modal';
import AlertModal from 'components/commons/modal/alertModal/alertModal';

export interface ActivityDetail {
  activityjoin: Activityjoin;
  activitycategory: Activitycategory;
  createAt: string;
  dday: string;
  deleteAt?: string;
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
  deleteAt?: string;
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
  const navigate = useNavigate();
  const params = useParams();
  const [activityData, setActivityData] = useState<ActivityDetail>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onErrorImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = logo;
  };

  const getActivityData = async () => {
    await axios
      .get(`https://earth-mas.shop/server/activity/${params.id}`)
      .then(res => {
        setActivityData(res.data);
        console.log('상세 데이터: ', res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteActivityData = async () => {
    await axios
      .delete(`${activityRoute}/${activityData?.id}`)
      .then(res => {
        console.log('삭제할 데이터:', res);
        // navigate(`/activity`);
      })
      .catch(error => {
        console.log(error);
      });
    // navigate(`/activity`);
  };

  useEffect(() => {
    getActivityData();
    deleteActivityData();
    // navigate(`/activity`);
  }, []);

  const cancelDeleteModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const onClickSubmit = () => {
    alert('채팅참여');
  };

  return (
    <>
      {isModalOpen && (
        <Modal>
          <AlertModal
            title={'삭제하시겠습니까?'}
            contents={'해당 게시글의 모든 정보가 완전히 삭제됩니다.'}
            okMessage={'삭제하겠습니다'}
            cancelMessage={'취소하겠습니다'}
            onClickOk={deleteActivityData}
            onClickCancel={cancelDeleteModal}
          />
        </Modal>
      )}
      <Wrap>
        <MainImg>
          <Slide banner={activityData?.url?.split(',')} slide={'sub'} />
        </MainImg>
        <Blank height={50} />
        <PostBox>
          <p className="title">{activityData?.title}</p>
          <Blank height={25} />
          <div className="postInfoBox">
            <div className="userInfo">
              <img
                src={activityData?.activityjoin?.user?.url}
                onError={onErrorImg}
                // {event =>
                //   (event.currentTarget.src = '/images/avatar.svg')
                // }
              />
              <span>{activityData?.activityjoin?.user?.name}</span>
            </div>
            <section className="detailInfo">
              <span>
                <CalenderIcon className="icon" />
                {GetDate(activityData?.createAt)}~{GetDate(activityData?.dday)}
              </span>
              <ul className="UL">
                <text>카테고리</text>
                <li>{activityData?.activitycategory?.category}</li>
                <text>지역</text>
                <li>{activityData?.location}</li>
                <text>모집인원</text>
                <li>{activityData?.maxpeople}명</li>
              </ul>
            </section>
            <section className="icon2">
              <Dropdown05
                page="activity"
                toggleDeleteModal={cancelDeleteModal}
              />
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
      </Wrap>
    </>
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

  .UL {
    & > text {
      color: ${Colors.B60};
      margin-right: 5px;
    }
    LI {
      display: inline;
      font-size: ${FontSize.MEDIUM_C};
      margin-right: 20px;
    }
  }

  .postContents {
    padding: 20px;
  }
`;
