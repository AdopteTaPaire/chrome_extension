"use strict";

import { ChromeMessage } from "./lib/types";
import { fetchAPI, loginUrl } from "./lib/utils";

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

const listeners: { [key: string]: Function } = {};
function registerMessageListener(
	type: string,
	cb: Parameters<typeof chrome.runtime.onMessage.addListener>[0]
) {
	listeners[type] = cb;
}

chrome.runtime.onMessage.addListener(
	(request: ChromeMessage, sender, sendResponse) => {
		const func = listeners[request.type];
		if (func) {
			func(request, sender).then((res: any) => {
				sendResponse(res);
			});
		} else {
			sendResponse({});
		}

		return true;
	}
);

let status = 0;

registerMessageListener("START", async (request, sender) => {
	status = 1;

	const { data, error, status: reqStatus } = await fetchAPI("users/me");
	if (error) {
		if (reqStatus == 401) {
			chrome.tabs.create({ url: loginUrl });
		}

		return { error };
	}
	console.log(data);

	return { data: { message: "hello" } };
});

registerMessageListener("STOP", async (request, sender) => {
	status = 0;
});
