export interface UserInfo {
  userId: string;
  userName: string;
  avatar: string;
}

let userInfo: UserInfo = {
  userId: "",
  userName: "",
  avatar: ""
}

// 生词随机用户ID
function getId() {
  const result = Math.random();
  return "1" + String(result).slice(2, 8);
}

// 生词随机用户头像color
function getAvatar() {
  [255, 255, 255]
  const r = Math.floor(Math.random() * 25) * 10;
  const g = Math.floor(Math.random() * 25) * 10;
  const b = Math.floor(Math.random() * 25) * 10;
  return `rgb(${[r, g, b].join(",")})`;
}

export default function getUserInfo() {
  if (!userInfo.userId) {
    const userId = getId();
    userInfo = {
      userId,
      userName: "用户" + userId,
      avatar: getAvatar()
    }
  }
  return userInfo;
}

