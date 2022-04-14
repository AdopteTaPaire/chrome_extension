export interface APIData<T = any> {
	data?: T;
	error?: string;
}

export interface AppState {
	status: number;
	error: string;
}

export interface ChromeMessage {
	type: string;
	payload?: {
		message?: string;
		state?: AppState;
	};
}
