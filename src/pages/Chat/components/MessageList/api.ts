import fetchData from "@/utils/require";

export const getHistory = (param: { id?: number; limit?: number }) =>
	fetchData("/history", "post", param);
