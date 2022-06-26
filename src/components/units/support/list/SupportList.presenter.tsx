import { NewButton } from 'components/commons/button/new/NewButton';
import SupportCard from 'components/commons/card/support/SupportCard';
import Dropdown02 from 'components/commons/dropdown/02/Dropdown02';
import Pagination from 'components/commons/pagination';
import Slide from 'components/commons/slide';
import * as S from './SupportList.styles';
import { v4 as uuidv4 } from 'uuid';
import { ISupportListProps, ISupportListUIProps } from './SupportList.types';

export default function SupportListUI(props: ISupportListUIProps) {
  return (
    <>
      <S.SlideWrapper>
        <Slide
          slide="main"
          banner={['/images/supportBanner/supportBanner1.jpg']}
          autoplay={true}
        />
      </S.SlideWrapper>
      <S.Wrapper>
        <div className="topWrapper">
          <p className="totalCount">
            전체 기부 <span>{props.data?.data?.length}</span>개
          </p>
          <Dropdown02 page={1} setSelect={props.setSelect} />
        </div>
        <S.CardWrapper>
          {props.data?.data?.arr?.map((el: ISupportListProps) => (
            <SupportCard key={uuidv4()} el={el} />
          ))}
        </S.CardWrapper>
        <Pagination
          page="list"
          listCount={props.data?.data?.length}
          refetch={props.refetch}
          clickPage={props.clickPage}
          setClickPage={props.setClickPage}
        />
        <NewButton />
      </S.Wrapper>
    </>
  );
}
