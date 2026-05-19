import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ✅ Use SERVICE ROLE KEY (important)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);


export async function GET() {
    const { data: orders, error: orderError } = await supabase
        .from("dittu_orders")
        .select("*");

    const { data: users, error: userError } = await supabase
        .from("dittu_users")
        .select("*");

        console.log(users,'users');
        

    if (orderError || userError) {
        return NextResponse.json(
            { error: orderError?.message || userError?.message },
            { status: 500 }
        );
    }

    // Merge orders with users
    const mergedData = orders.map((order) => {
        const user = users.find((u) => u.id.toString() === order.customer_id.toString());
        if (!user) {
            return { ...order, customer: null };
        }

        // remove password field
        const { password, ...safeUser } = user;

        return {
            ...order,
            customer: safeUser,
        };
    });

    return NextResponse.json(mergedData);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { error } = await supabase
            .from("dittu_orders")
            .insert([body]);

        if (error) {
            throw error;
        }

        return NextResponse.json(
            { message: "Order created successfully" },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}