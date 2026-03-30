import axios from "axios";
import { NextResponse } from "next/server";

type queryProps = {
  QueryName: string;
  ClientId: string;
  ParamValues: any[];
  endpointUrlPath?: string;
  methodName?: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // 🔥 change to your domain in production
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const handler = async (req: Request) => {
  const url =
    process.env.API_ENDPOINT || process.env.APPSETTING_API_ENDPOINT;

  let endpointUrl = `${url}`;
  let body = {} as queryProps;

  try {
    body = await req.json();

    const endpointUrlPath = body.endpointUrlPath;
    const methodName = body.methodName;

    delete body.endpointUrlPath;
    delete body.methodName;

    const proxiedReq =
      methodName === "PUT"
        ? await axios.put(endpointUrl + endpointUrlPath, body)
        : methodName === "DELETE"
        ? await axios.delete(endpointUrl + endpointUrlPath)
        : Object.values(body).length >= 1
        ? await axios.post(endpointUrl + endpointUrlPath, body)
        : await axios.get(endpointUrl + endpointUrlPath);

    return NextResponse.json(
      { data: proxiedReq.data ?? [] },
      { headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      error?.response?.data || { error: "Internal Server Error" },
      { headers: corsHeaders }
    );
  }
};

// ✅ Handle preflight request
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;