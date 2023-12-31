import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
import "./index.less";
import getUserInfo, { UserInfo } from "@/models/user";
// import { sendMessage } from "@/models/broadcastChannel";
import eventProxy from "@/utils/eventProxy";
import { Button, Input } from "antd";
import { send } from "./api";

const { TextArea } = Input;

export default function ChatInput() {
	const textareaDom = useRef<HTMLTextAreaElement>(null);
	const [message, setMessage] = useState("");
	const userInfo: UserInfo = getUserInfo();

	useEffect(() => {});

	function handleClick() {
		if (!message.trim()) {
			setMessage("");
			return;
		}
		const param = {
			userInfo,
			time: new Date().getTime() + "",
			message: message.trim()
		};
		setMessage("");
		// sendMessage(param);
		send(param);
		eventProxy.trigger("send", param);
	}

	function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
		setMessage(e.currentTarget.value);
	}

	function handleInputKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
		if (e.key === "Enter") {
			if (!e.shiftKey) {
				setTimeout(() => {
					message.trim() && handleClick();
				}, 0);
			}
		}
	}

	return (
		<div className="chat-input">
			<div className="chat-tools">
				<Button onClick={handleClick} disabled={!message}>
					发送
				</Button>
			</div>
			<TextArea
				ref={textareaDom}
				value={message}
				rows={6}
				placeholder="愣着干嘛，聊天啊！！！"
				style={{ height: 120, resize: "none" }}
				onChange={handleChange}
				onKeyDown={handleInputKeyDown}
			></TextArea>
		</div>
	);
}
