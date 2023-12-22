import { UserInfo } from "@/models/user";
import fetchData from "@/utils/require";

export const send = (param: { userInfo?: UserInfo; time?: string; message: string }) =>
	fetchData("/send", "post", param);
