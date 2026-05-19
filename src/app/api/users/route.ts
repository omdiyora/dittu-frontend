// app/api/users/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
export const dynamic = "force-dynamic";
// app/api/users/route.ts
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("dittu_users")
      .select("*")
      .order("id");

    if (error) throw error;


    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Database error" },
      { status: 500 }
    );
  }
}

