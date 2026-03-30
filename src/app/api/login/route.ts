import axios from "axios";
import { NextResponse } from "next/server";

type queryProps = {
  ParamValues: any[];
};

const handler = async (req: Request, context: any) => {
  const url = process.env.API_ENDPOINT || process.env.APPSETTING_API_ENDPOINT || 'https://backend-complianceportal.azurewebsites.net'

  let endpointUrl = `${url}` as string;
  try {
    const body = await req.json();
    const proxiedReq = await axios.post(
      `${url}/login`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (proxiedReq.status === 200) {
      return NextResponse.json({ data: proxiedReq.data ?? [] });
    }
  } catch (error: any) {
    return NextResponse.json(error?.response?.data || error);
  }
};

export const POST = handler;
// // If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
// export async function OPTIONS(request: Request) { }
