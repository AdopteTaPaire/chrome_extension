export interface APIData<T = {}> {
	data?: T;
	error?: string;
	status: number;
}

export interface ChromeMessage {
	type: string;
	payload?: {
		message: string;
	};
}
