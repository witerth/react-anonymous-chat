import fetchData from "@/utils/require";

export const getHistory = (param: { userId?: string; time?: string }) =>
	fetchData("/history", "post", param);
