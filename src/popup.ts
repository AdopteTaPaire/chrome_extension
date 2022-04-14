"use strict";

import "./popup.css";

document.addEventListener("DOMContentLoaded", () => {
	const startButton = document.getElementById("start");
	const stopButton = document.getElementById("stop");
	const errorText = document.getElementById("error");

	if (!startButton || !stopButton || !errorText) return;

	const showStart = () => {
		stopButton.classList.add("hidden");
		startButton.classList.remove("hidden");
	};

	const showStop = () => {
		startButton.classList.add("hidden");
		stopButton.classList.remove("hidden");
	};

	startButton.addEventListener("click", async () => {
		showStop();

		chrome.runtime.sendMessage({ type: "START" }, ({ data, error }) => {
			errorText.innerText = error ?? "";
		});
	});

	stopButton.addEventListener("click", async () => {
		showStart();

		chrome.runtime.sendMessage({ type: "STOP" }, ({ error }) => {
			errorText.innerText = error ?? "";
		});
	});

	chrome.runtime.sendMessage({ type: "STATE" }, ({ status, error }) => {
		if (status === 1) {
			showStop();
		} else {
			showStart();
		}

		errorText.innerText = error ?? "";
	});
});
