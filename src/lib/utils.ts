import { APIData } from "./types";

// const domain = "https://atp.pj-lefort.com";
const domain = "http://localhost:3000";
export const APIUrl = `${domain}/api`;
export const loginUrl = `${domain}/login`;

export const fetchAPI: (
	endpoint: string,
	method?: string,
	body?: { [key: string]: string }
) => Promise<APIData> = (endpoint, method, body) => {
	return fetch(`${APIUrl}/${endpoint}`, {
		method: method || "GET",
		headers: {
			"Content-Type": "application/json",
			"Allow-Control-Allow-Origin": "*",
		},
		body: JSON.stringify(body) || undefined,
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error(error);
		});
};
