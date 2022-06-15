import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontSize } from 'styles/FontStyles';

export default function Comment() {
  return (
    <Wrapper>
      <div className="userImg">
        <img
          src="/images/profileDefault.png"
          onError={e => {
            e.currentTarget.src = '/images/profileDefault.png';
          }}
        />
      </div>
      <div className="userContent">
        <div className="userName">
          <span>유저이름</span>
          <Mine>내 댓글</Mine>
        </div>
        <p>댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글</p>
        <div className="contentButton">
          <span>몇분전</span>
          <button>• 수정</button>
          <button>• 삭제</button>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;

  .userImg {
    min-width: 30px;
    max-width: 30px;
    width: 100%;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 12px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .userContent {
    .userName {
      margin-bottom: 8px;
      display: flex;
      align-items: center;

      span:first-of-type {
        margin-right: 8px;
      }
    }

    p {
      margin-bottom: 8px;
    }

    .contentButton {
      display: flex;
      flex-direction: row;
      > * {
        font-size: ${FontSize.SMALL};
        color: ${Colors.B100};
        margin-right: 5px;
      }
      button {
        :hover {
          color: ${Colors.SUB1};
        }
      }
    }
  }
`;

const Mine = styled.span`
  display: inline-block;
  width: 45px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 0.75rem;
  color: ${Colors.BW};
  background-color: ${Colors.SUB1};
  border-radius: 5px;
`;
