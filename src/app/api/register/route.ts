import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ✅ Use SERVICE ROLE KEY (important)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { first_name, last_name, email, password } = body;

        // 🔒 Basic validation
        if (!first_name || !last_name || !email || !password) {
            return NextResponse.json(
                { message: "Missing fields" },
                { status: 400 }
            );
        }

        // 🔍 Check if user exists
        const { data: existingUser } = await supabase
            .from("dittu_users")
            .select("id")
            .eq("email", email)
            .single();

        if (existingUser) {
            return NextResponse.json(
                { message: "Email already registered" },
                { status: 400 }
            );
        }

        // 🔐 Hash password
        const hashedPassword = password

        // ✅ Insert user
        const { error } = await supabase.from("dittu_users").insert([
            {
                first_name,
                last_name,
                email,
                password: hashedPassword,
                account_status: "active",
            },
        ]);

        if (error) {
            throw error;
        }

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}