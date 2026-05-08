import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { identifier, password } = await request.json();

        if (!identifier || !password) {
            return NextResponse.json(
                { message: "Identifier and password are required" },
                { status: 400 }
            );
        }

        // ✅ Find user by email OR username
        const { data: user, error } = await supabase
            .from("dittu_users")
            .select("*")
            .or(`email.eq.${identifier},user_name.eq.${identifier}`)
            .single();

        if (error || !user) {
            return NextResponse.json(
                { message: "Email/Username or Password is Incorrect!" },
                { status: 401 }
            );
        }

        if (password !== user.password) {
            return NextResponse.json(
                { message: "Email/Username or Password is Incorrect!" },
                { status: 401 }
            );
        }

        // ❌ Never send password back
        // delete user.password;

        return NextResponse.json(
            {
                status: 200,
                message: "Login Successfully",
                data: user,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Login Error:", error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
