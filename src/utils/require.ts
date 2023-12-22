type RequestType = "get" | "post" | "put" | "delete" | "patch";

const BASE_URL = "/api";

const handleResponse = async (response: any) => {
	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage || "Network response was not ok");
	}

	return response.json();
};

const fetchData = async (
	endpoint: string,
	method: RequestType,
	data?: any,
	options?: RequestInit
) => {
	const url = `${BASE_URL}${endpoint}`;
	const response = await fetch(url, { method, body: JSON.stringify(data), ...options });
	return handleResponse(response);
};

export default fetchData;
