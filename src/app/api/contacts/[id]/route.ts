import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

// ✅ GET (single contact)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { status: 404, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: 200, data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Error fetching contact" },
      { status: 500 }
    );
  }
}

// ✅ PUT (update contact)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {
      name,
      email,
      phone_number,
      loan_type,
      message,
      updated_by,
    } = await request.json();

    const { data, error } = await supabase
      .from("enquiries")
      .update({
        name,
        email,
        phone_number,
        loan_type,
        message,
        updated_by,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json(
        { status: 404, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "Contact updated successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Failed to update contact" },
      { status: 500 }
    );
  }
}

// ✅ DELETE (remove contact)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("enquiries")
      .delete()
      .eq("id", params.id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json(
        { status: 404, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "Contact deleted successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Failed to delete contact" },
      { status: 500 }
    );
  }
}