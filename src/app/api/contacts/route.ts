import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

// ✅ CREATE CONTACT (POST)
export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      phone_number,
      loan_type,
      message,
      created_by,
    } = await request.json();

    const { data, error } = await supabase
      .from("enquiries")
      .insert([
        {
          name,
          email,
          phone_number,
          loan_type,
          message,
          created_by,
        },
      ])
      .select("id")
      .single();

    if (error) {
      return NextResponse.json(
        { status: 500, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: 201,
        message: "Contact created successfully",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Failed to create contact" },
      { status: 500 }
    );
  }
}

// ✅ GET ALL CONTACTS
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("id", { ascending: false }); // 👈 replaces ORDER BY DESC

    if (error) {
      return NextResponse.json(
        { status: 500, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { status: 200, data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Error fetching contacts" },
      { status: 500 }
    );
  }
}