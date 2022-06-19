import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const ChatList = (props: {
  el: {
    user: {
      url: string | undefined;
      name: string;
    };
    createdAt: string;
    currentMsg: string;
  };
}) => {
  return (
    <Wrapper>
      <div className="user">
        <div className="userImg">
          <img
            src={props.el?.user?.url}
            onError={e => {
              e.currentTarget.src = '/images/profileDefault.png';
            }}
          />
        </div>
      </div>

      <div className="userInfo">
        <div className="name-date">
          <p className="userName">{props.el?.user?.name}</p>
          <p className="date">{props.el?.createdAt}</p>
        </div>
        <p>{props.el?.currentMsg}</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 65px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  :hover {
    background-color: rgba(0, 160, 91, 0.1);
  }

  .user {
    display: flex;
    align-items: center;

    .userImg {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .userInfo {
    margin-left: 10px;
    overflow: hidden;

    .name-date {
      display: flex;
      align-items: center;
      .userName {
        font-size: ${FontSize.SMALL};
        font-family: ${FontFamily.BOLD};
        color: ${Colors.B100};
      }
      .date {
        margin-left: 8px;
        font-size: 0.75rem;
        font-family: ${FontFamily.SEMIBOLD};
        color: ${Colors.B60};
      }
    }

    > p {
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: ${FontSize.MEDIUM_C};
      font-family: ${FontFamily.MEDIUM};
      color: ${Colors.B100};
    }
  }
`;
