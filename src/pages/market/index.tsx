import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import ContainedButton02 from 'components/commons/button/contained/ContainedButton02';
import OutlinedButton01 from 'components/commons/button/outlined/OutliendButton01';

import Input01 from 'components/commons/inputs/Input01';
import Input02 from 'components/commons/inputs/Input02';

export default function MarketPage() {
  return (
    <div>
      Market
      <ContainedButton01 content={'상품 등록'} color={'main'} />
      <ContainedButton01 content={'상품 등록'} color={'sub'} />
      <Input01 content={'인풋입니다'} type={'text'} />
      <Input02 content="검색어를 입력해주세요" />
      <ContainedButton02 content={'더보기'} color={'main'} />
      <ContainedButton02 content={'더보기'} color={'sub'} />
    </div>
  );
}
