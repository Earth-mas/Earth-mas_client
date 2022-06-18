import styled from '@emotion/styled';

interface IProps {
  size: number;
  avataUrl?: string;
  name?: string;
}

export default function UserProfile(props: IProps) {
  const avatarImgUrl = '/images/avatar.svg';
  return (
    <AvatarWrapper size={props.size}>
      <div className="avatar">
        <img src={props.avataUrl ?? avatarImgUrl} />
      </div>
      <span>{props.name}</span>
    </AvatarWrapper>
  );
}

const AvatarWrapper = styled.div<{ size: number }>`
  display: flex;
  align-items: center;

  .avatar {
    height: ${props => `${props.size}px`};
  }

  img {
    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
    border-radius: 70%;
    margin-right: 5px;
  }

  span {
    width: 100%;
    text-align: center;
  }
`;
