import { Avatar, CameraIcon, SettingIcon } from 'assets/svgs';
import { UserWrapper } from './MyPageUser.styles';

export default function UserInfo() {
  return (
    <UserWrapper>
      <div className="title">
        <SettingIcon />
        <h1>계정 관리</h1>
      </div>
      <div className="userInfo">
        <div className="avatarImage">
          <Avatar />
          <span>
            <CameraIcon className="cameraIcon" />
          </span>
          <button>이미지 삭제하기</button>
        </div>
      </div>
    </UserWrapper>
  );
}
