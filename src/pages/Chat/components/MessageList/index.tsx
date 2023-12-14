import { useEffect, useRef, useState } from "react";
import Item from "./conponents/Item";
import { getBroadcastChannel } from "@/models/broadcastChannel";
import { UserInfo } from "@/models/user";
import "./index.less";
import eventProxy from "@/models/eventProxy";

type ListItem = {
	message: string;
	time: string;
	userInfo: UserInfo;
};

export default function MessageList() {
	const messageListDom = useRef<HTMLDivElement>(null);
	const [list, setList] = useState<ListItem[]>([]);

	// 创建broadcastChannel
	const broadcastChannel = getBroadcastChannel();
	broadcastChannel.onmessage = handleMessage;
	function handleMessage(event: MessageEvent) {
		console.log("接收到 event", event);
		// TODO: 处理接收到信息后的逻辑
		setList([...list.map((i, index) => ({ ...i, time: i.time + index })), event.data]);
		scrollBottom();
	}

	// 监听当前用户发送信息，添加到信息列表中
	eventProxy.on("send", (message: ListItem) => {
		setList([...list, message]);
		scrollBottom();
	});

	// 滚动到底部，显示用户发送信息
	function scrollBottom() {
		setTimeout(() => {
			messageListDom.current?.scrollTo({
				behavior: "smooth",
				top: messageListDom.current.scrollHeight
			});
		}, 0);
	}

	// 滚动到顶部加载更多信息
	// function loadMoreData() {
	// 	setList([...list, ...list]);
	// 	const height = messageListDom.current.scrollHeight;
	// 	setTimeout(() => {
	// 		messageListDom.current.scrollTop = messageListDom.current.scrollHeight - height - 50;
	// 	}, 0);
	// }

	useEffect(() => {
		const dom = messageListDom.current as HTMLDivElement;
		dom.scrollTop = dom.scrollHeight;
		// messageListDom.current.onscroll = function () {
		// 	// 判断是否滚动到页面顶部
		// 	console.dir(messageListDom.current);
		// 	if (messageListDom.current.scrollTop === 0) {
		// 		// 执行加载更多的操作
		// 		loadMoreData();
		// 	}
		// };
	});

	return (
		<div ref={messageListDom} className="message-list">
			{list.map(i => (
				<Item key={i.userInfo.userId + i.time} message={i.message} userInfo={i.userInfo} />
			))}
		</div>
	);
}
