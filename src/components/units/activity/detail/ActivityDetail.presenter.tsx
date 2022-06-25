import { ActivityDetail } from './ActivityDetail.container';

interface IActivityDetailUIProps {
  data?: ActivityDetail;
}

export default function ActivityDetailUI(props: IActivityDetailUIProps) {
  return (
    <>
      <p>{props.data?.title}</p>
    </>
  );
}
