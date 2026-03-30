// if (typeof window === "undefined") {
// 	throw new Error(
// 		"Please do not use this file on server side use serverAPICaller instead",
// 	);
// }

export const clientAPICaller = async <T>(init: RequestInit) => {
	// @ts-ignore
	const url = process.env.APPSETTING_NEXTAUTH_URL || process.env.NEXT_PUBLIC_HOST || process.env.APPSETTING_NEXT_PUBLIC_HOST

	const result = await fetch(`${url}/api`, {
		...init,
		method: 'POST',
		headers: {
			...(init.headers || {}),
			"Content-Type": "application/json",
		},
	});
	const response = await result.json();
	return response.data || response as T;
};
