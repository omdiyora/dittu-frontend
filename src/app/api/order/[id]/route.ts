import { supabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: any) {
    const { id } = params;
    const body = await req.json();

    const { error } = await supabase
        .from("dittu_orders")
        .update({
            payment_actions: body.payment_actions,
        })
        .eq("order_id", id);

    if (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}