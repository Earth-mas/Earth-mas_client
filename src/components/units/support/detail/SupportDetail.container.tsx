import SupportDetailUI from './SupportDetail.presenter';

export default function SupportDetail() {
  const goal = Number('6500000');
  const price = Number('2999000');
  const percent: number = Math.floor((price / goal) * 100);
  return <SupportDetailUI percent={percent} />;
}
