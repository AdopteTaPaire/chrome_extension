"use strict";

import "./popup.css";

document.addEventListener("DOMContentLoaded", () => {
	const startButton = document.getElementById("start");
	const stopButton = document.getElementById("stop");
	const errorText = document.getElementById("error");

	startButton?.addEventListener("click", async () => {
		console.log("started");
		startButton.classList.add("hidden");
		stopButton?.classList.remove("hidden");

		chrome.runtime.sendMessage({ type: "START" }, ({ error }) => {
			if (error && errorText) {
				errorText.innerHTML = error;
			}
		});
	});

	stopButton?.addEventListener("click", async () => {
		console.log("stopped");
		stopButton.classList.add("hidden");
		startButton?.classList.remove("hidden");

		chrome.runtime.sendMessage({ type: "STOP" }, ({ error }) => {
			if (error && errorText) {
				errorText.innerHTML = error;
			}
		});
	});
});
