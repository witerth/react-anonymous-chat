import ChatInput from "./components/ChatInput";
import MessageList from "./components/MessageList";
import "./index.less";

export default function Chat() {
	return (
		<div className="chat">
			<MessageList></MessageList>
			<ChatInput></ChatInput>
		</div>
	);
}
