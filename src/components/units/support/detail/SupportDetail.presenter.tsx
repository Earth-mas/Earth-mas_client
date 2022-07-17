import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Line from 'components/commons/line';
import Slide from 'components/commons/slide';
import * as S from './SupportDetail.styles';
import Dompurify from 'dompurify';
import { getPrice } from 'commons/utils/utils';
import Dropdown03 from 'components/commons/dropdown/03/Dropdown03';
import { ISupportDetailUIProps } from './SupportDetail.types';
import { ParticipationListContainer } from './participationList/ParticipationList.container';
import CommentContainer from './comment/CommentList.container';
import { userState } from 'recoil/user';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { ChatButton } from 'components/units/chat/button';
import Modal from 'components/commons/modal';
import AlertModal from 'components/commons/modal/alertModal/alertModal';

export default function SupportDetailUI(props: ISupportDetailUIProps) {
  const userInfo = useRecoilValue(userState);

  return (
    <>
      {props.modal && (
        <Modal>
          <AlertModal
            title="💬 정말 삭제하시겠어요?"
            contents="해당 후원의 모든 정보가 삭제되며, 복구할 수 없습니다."
            okMessage="네, 삭제할게요"
            cancelMessage="아니오, 취소할게요"
            onClickCancel={props.openModal}
            onClickOk={props.deleteContent}
          />
        </Modal>
      )}
      <S.Wrapper>
        <S.FirstSection>
          <Slide slide="sub" banner={props.data?.url?.split(',')} />
          <S.MainContent percent={props.percent}>
            <div className="rowWrap">
              <div className="dDay">
                {props.leftDay > 0
                  ? `Done`
                  : props.leftDay < 0
                  ? `D${props.leftDay}`
                  : props.leftDay === 0 && 'D-day'}
              </div>
              {props.data?.user?.id === userInfo.id && (
                <Dropdown03 page="support" openModal={props.openModal} />
              )}
            </div>

            <div className="title">{props.data?.title}</div>

            <div className="percent">{props.percent}%</div>
            <div className="graph">
              <div className="participate"></div>
            </div>

            <div className="goal">
              <p>{getPrice(props.data?.wishamount)}원 목표</p>
              <p>{getPrice(props.data?.currentamount)}원</p>
            </div>

            <div className="user_button">
              <div className="user">
                <div className="userImg">
                  <img
                    src={props.data?.user?.url}
                    onError={e => {
                      e.currentTarget.src = '/images/profileDefault.png';
                    }}
                  />
                </div>
                <p className="userName">{props.data?.user?.name}</p>
              </div>
              {props.data?.user?.id !== userInfo.id && (
                <ChatButton userInfo={props.data?.user} content="문의하기" />
              )}
            </div>

            <Line />

            <p className="subText">
              기부하신 금액은 수수료 없이 <S.Sub1>100% 전달</S.Sub1>
              됩니다
            </p>

            <Link to={'payment'}>
              <ContainedButton01 content="기부하기" color="main" />
            </Link>
          </S.MainContent>
        </S.FirstSection>

        <Line />

        <S.SecondSection>
          <S.Contents
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(props.data?.description),
            }}
          />

          <ParticipationListContainer />
        </S.SecondSection>

        <Line />

        <S.ThirdSection>
          <CommentContainer />
        </S.ThirdSection>
      </S.Wrapper>
    </>
  );
}
