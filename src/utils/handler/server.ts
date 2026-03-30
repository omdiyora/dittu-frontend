if (typeof window !== "undefined") {
  throw new Error(
    "Please do not use this file on client side use clientAPICaller instead"
  );
}

export const serverAPICaller = async <T>(init: RequestInit) => {
  try {
    const body = JSON.parse(init.body as string) || "";
    const endpointUrlPath = body.endpointUrlPath;
    delete body.endpointUrlPath;
    const url = process.env.API_ENDPOINT || process.env.APPSETTING_API_ENDPOINT || 'https://backend-complianceportal.azurewebsites.net'

    const result = await fetch(`${url}${endpointUrlPath}`, {
      ...body,
      headers: {
        ...(init.headers || {}),
        "Content-Type": "application/json",
        AuthorizationToken: `${process.env.API_KEY}`,
      },
    });
    const response = await result.json();
    return response as T;
  } catch (err) {
	console.log(err)
  }
};
