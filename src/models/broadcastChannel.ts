let broadcastChannel: BroadcastChannel;
// 创建BroadcastChannel
function createBroadcastChannel() {
  broadcastChannel = new BroadcastChannel("chat");
}

export function sendMessage(message: unknown) {
  broadcastChannel.postMessage(message);
}

export function getBroadcastChannel() {
  if (!broadcastChannel) {
    createBroadcastChannel();
  }
  return broadcastChannel;
}
