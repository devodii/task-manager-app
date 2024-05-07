import { io } from "socket.io-client";

const url = process.env.NEXT_PUBLIC_API_URL! + "/task";

export const socket = io(url, {
  autoConnect: true,
});
