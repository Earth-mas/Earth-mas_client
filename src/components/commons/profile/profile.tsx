import styled from '@emotion/styled';
import { Avatar } from 'assets/svgs';

interface IProps {
  size: number;
  url?: string;
  name?: string;
}

export default function Profile(props: IProps) {
  console.log(props.url);
  return (
    <AvatarWrapper size={props.size}>
      <div>{props.url ? <img src={props.url} /> : <Avatar />}</div>
      <span>{props.name}</span>
    </AvatarWrapper>
  );
}

const AvatarWrapper = styled.div<{ size: number }>`
  display: flex;
  align-items: center;
  div {
    height: ${(props: IProps) => `${props.size}px`};
  }

  svg {
    width: ${(props: IProps) => `${props.size}px`};
    height: ${(props: IProps) => `${props.size}px`};
    margin-right: 5px;
  }

  img {
    width: ${(props: IProps) => `${props.size}px`};
    border-radius: 70%;
    margin-right: 5px;
  }

  span {
    width: 100%;
    text-align: center;
  }
`;
