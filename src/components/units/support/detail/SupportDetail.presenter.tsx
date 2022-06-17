import { BubbleIcon } from 'assets/svgs';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Input01 from 'components/commons/inputs/Input01';
import Line from 'components/commons/line';
import Slide from 'components/commons/slide';
import Comment from './comment/Comment';
import * as S from './SupportDetail.styles';
import Dompurify from 'dompurify';
import { getPrice } from 'commons/utils/utils';
import Dropdown03 from 'components/commons/dropdown/03/Dropdown03';
import { ISupportDetailUIProps } from './SupportDetail.types';

export default function SupportDetailUI(props: ISupportDetailUIProps) {
  return (
    <S.Wrapper>
      <S.FirstSection>
        <Slide
          slide="sub"
          banner1={props.data?.url}
          banner2="/images/mainBanner/banner2.jpg"
          banner3={undefined}
        />
        <S.MainContent percent={props.percent}>
          <div className="rowWrap">
            <div className="dDay">
              {props.leftDay > 0
                ? `Done`
                : props.leftDay < 0
                ? `D${props.leftDay}`
                : props.leftDay === 0 && 'D-day'}
            </div>
            <Dropdown03 page="support" deleteContent={props.deleteContent} />
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

          <div className="user">
            <div className="userImg">
              <img
                src="/images/profileDefault.png"
                onError={e => {
                  e.currentTarget.src = '/images/profileDefault.png';
                }}
              />
            </div>
            <p className="userName">{props.data?.user?.name}</p>
          </div>

          <Line />

          <p className="subText">
            기부하신 금액은 수수료 없이 <S.Sub1>100% 전달</S.Sub1>
            됩니다
          </p>

          <ContainedButton01 content="기부하기" color="main" />
        </S.MainContent>
      </S.FirstSection>

      <Line />

      <S.SecondSection>
        <S.Contents
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(props.data?.description),
          }}
        >
          {/* <img src="/images/naja-bertolt-jensen-BJUoZu0mpt0-unsplash.jpeg" />
          <h3>벚꽃길을 가득 채운 플라스틱 쓰레기</h3>
          <p>
            벚꽃이 활짝 핀 이번 봄, 코로나의 기세가 줄어들어 오랜만의 벚꽃놀이를
            즐길 수 있었습니다. 벚꽃놀이를 즐기기 위해 여느 때보다 많은 사람이
            참여했었죠. 하지만 몰려든 인파가 만들어낸 쓰레기의 양은
            어마어마했습니다. 벚꽃 명소인 여의도에서는 주말 동안에만 2톤에
            가까운 쓰레기가 나왔다고 합니다. 특히 테이크아웃 커피 컵, 배달 용기
            등의 플라스틱 쓰레기가 대부분을 차지하고 있었어요. 사람들이 떠난
            벚꽃길에는 엄청난 양의 쓰레기만이 남아 있었습니다.
          </p>
          <h3>플라스틱 쓰레기는 기하급수적으로 늘어나고 있어요.</h3>
          <p>
            우리의 보금자리 지구는 전례 없는 양의 플라스틱 쓰레기로 몸살을 앓고
            있습니다. 2021년 한국에서 폐기된 플라스틱류 쓰레기가 이전 연도보다
            약 20% 증가했다고 해요. 제대로 폐기되지 못한 플라스틱의 양은 더
            많고, 여전히 지구를 떠다니고 있을 거예요. 기하급수적으로 늘어나는
            플라스틱 쓰레기양을 줄이기 위한 해결책이 필요할 때입니다. 지구를
            떠다니는 플라스틱은 미세 플라스틱화 되어 지구에 사는 모두를 위협하는
            존재가 되었어요. 불필요한 과대포장, 남용되는 일회용 플라스틱. 우리의
            일상을 편리하게 해주는 플라스틱은 모순적으로 우리의 일상을 서서히
            오염시키고 있습니다.
          </p>
          <h3>미래세대와 함께 지속가능한 지구를 만들어요!</h3>
          <p>
            지구의 쓰레기도 담고 우리의 지구도 쓰담쓰담! 환경재단은 지구쓰담
            캠페인을 통해 쓰레기 문제를 꾸준히 알리고 해양, 도심 등 다양한
            지역에서 쓰레기 정화 활동을 진행하여 지금까지 50톤에 가까운 쓰레기를
            수거했습니다. 올해는 더 나아가 미래 세대 구성원인 청소년들과 함께
            쓰담 활동을 진행하려고 합니다. 현재를 넘어 미래를 같이 구성해나갈
            지구 구성원들과 함께하는 지구쓰담! 쓰레기를 줍는 과정에서 내가 사는
            소중한 지구를 돌아볼 기회를 가지고, 미래의 지구를 만들어 갈 방법을
            같이 배우고자 합니다. 환경재단이 청소년과 함께 지속가능한 지구를
            만들 수 있게 관심과 응원 보내주세요!
          </p> */}
        </S.Contents>
        <S.ParticipationList>
          <p className="title">참여내역</p>

          <p className="totalCount">
            총 <S.Sub1>12</S.Sub1>건이 기부되었습니다.
          </p>

          <>
            <div className="list">
              <p className="date">2022. 05. 31</p>
              <span className="userName">유저이름</span>
              <S.Sub2>10,000원</S.Sub2> <span>참여</span>
            </div>
            <Line />
            <div className="list">
              <p className="date">2022. 05. 31</p>
              <span className="userName">유저이름</span>
              <S.Sub2>10,000원</S.Sub2> <span>참여</span>
            </div>
            <Line />
            <div className="list">
              <p className="date">2022. 05. 31</p>
              <span className="userName">유저이름</span>
              <S.Sub2>10,000원</S.Sub2> <span>참여</span>
            </div>
            <Line />
            <div className="list">
              <p className="date">2022. 05. 31</p>
              <span className="userName">유저이름</span>
              <S.Sub2>10,000원</S.Sub2> <span>참여</span>
            </div>
            <Line />
            <div className="list">
              <p className="date">2022. 05. 31</p>
              <span className="userName">유저이름</span>
              <S.Sub2>10,000원</S.Sub2> <span>참여</span>
            </div>
            <Line />
            <div className="list">
              <p className="date">2022. 05. 31</p>
              <span className="userName">유저이름</span>
              <S.Sub2>10,000원</S.Sub2> <span>참여</span>
            </div>
            <Line />
            <div className="list">
              <p className="date">2022. 05. 31</p>
              <span className="userName">유저이름</span>
              <S.Sub2>10,000원</S.Sub2> <span>참여</span>
            </div>
            <Line />
            <div className="list">
              <p className="date">2022. 05. 31</p>
              <span className="userName">유저이름</span>
              <S.Sub2>10,000원</S.Sub2> <span>참여</span>
            </div>
            <Line />
            <div className="list">
              <p className="date">2022. 05. 31</p>
              <span className="userName">유저이름</span>
              <S.Sub2>10,000원</S.Sub2> <span>참여</span>
            </div>
            <Line />
            <div className="list">
              <p className="date">2022. 05. 31</p>
              <span className="userName">유저이름</span>
              <S.Sub2>10,000원</S.Sub2> <span>참여</span>
            </div>
          </>

          <p className="more">더보기</p>
        </S.ParticipationList>
      </S.SecondSection>

      <Line />

      <S.ThirdSection>
        <div className="commentTitle">
          <span>댓글</span>
          <S.Sub1>2</S.Sub1>
          <BubbleIcon />
        </div>

        <form className="commentWrapper">
          <div className="userImg">
            <img
              src="/images/profileDefault.png"
              onError={e => {
                e.currentTarget.src = '/images/profileDefault.png';
              }}
            />
          </div>

          <div className="commentInput">
            <Input01
              type="text"
              placeholder="댓글을 남겨보세요"
              name="comments"
            />
            <button>입력</button>
          </div>
        </form>

        <Comment />
      </S.ThirdSection>
    </S.Wrapper>
  );
}
