import { RootObject } from './ActivityDetail.container';

interface IActivityDetailUIProps {
  data?: RootObject;
}

export default function ActivityDetailUI(props: IActivityDetailUIProps) {
  return (
    <>
      <p>{props.data?.title}</p>
    </>
  );
}
