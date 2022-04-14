"use strict";

import { AppState, ChromeMessage } from "./lib/types";
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

const state: AppState = {
	status: 0,
	error: "",
};

registerMessageListener("STATE", async () => {
	return state;
});

registerMessageListener("START", async (request, sender) => {
	state.status = 1;
	state.error = "";

	let { data, error } = await fetchAPI("users/me");

	if (data && data.user?.rank !== "admin") {
		error = "Vous n'êtes pas administrateur";
	}

	if (error) {
		if (error == "Unauthorized") {
			chrome.tabs.create({ url: loginUrl });
		}

		state.error = error;
		return { error };
	}

	return { data };
});

registerMessageListener("STOP", async (request, sender) => {
	state.status = 0;
	state.error = "";

	return {};
});
