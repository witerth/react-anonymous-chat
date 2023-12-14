import getUserInfo, { UserInfo } from "@/models/user";
import "./item.less";

export default function Item({ message, userInfo }: { message: string; userInfo: UserInfo }) {
	const { userId } = getUserInfo();
	return (
		<div className={"message-list-item " + (userId === userInfo.userId ? "self" : "")}>
			<div className="user-info">
				<div className="user-avatar" style={{ backgroundColor: userInfo.avatar }}></div>
				<div className="user-name">{userInfo.userName}</div>
			</div>
			<div className="message">{message}</div>
		</div>
	);
}
