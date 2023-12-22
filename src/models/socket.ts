// 创建 WebSocket 连接
const ws = new WebSocket("ws://121.41.44.122:6565/ws");

let heartbeatInterval: number | undefined;
//持续心跳
function startPing() {
	heartbeatInterval = setInterval(() => {
		if (ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify({ type: "ping" }));
		}
	}, 5000);
}

//连接成功
ws.onopen = function () {
	console.log("connect-success");
	ws.send(JSON.stringify({ type: "ping" }));
	startPing();
};
//连接关闭
ws.onclose = function (event) {
	console.log("connect-close：", event);
	clearInterval(heartbeatInterval);
};
//连接异常
ws.onerror = function (event) {
	console.log("connect-error：" + event);
};

export default ws;
