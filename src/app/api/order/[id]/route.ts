// app/api/order/[id]/route.ts

import { supabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: any) {
    try {
        const { id } = params;
        const body = await req.json();

        const { error, data } = await supabase
            .from("dittu_orders")
            .update({
                expected_delivery_date: body.expected_delivery_date,
                delivery_status: body.delivery_status,
                tracking_id: body.tracking_id,
                courier_partner_name: body.courier_partner_name,
                notes: body.notes,
                updated: new Date(),
                payment_actions: body.payment_actions
            })
            .eq("id", id)
            .select();

        if (error) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}