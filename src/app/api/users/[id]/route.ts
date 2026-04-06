import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
// import bcrypt from "bcrypt";

// ✅ GET (single user)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, email, user_name, first_name, last_name, role, avatar_url")
      .eq("id", params.id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { status: 404, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: 200, data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Error fetching user" },
      { status: 500 }
    );
  }
}

// ✅ PUT (update user)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {
      email,
      user_name,
      password,
      first_name,
      last_name,
      role,
      avatar_url,
    } = await request.json();

    let updatedData: any = {
      email,
      user_name,
      first_name,
      last_name,
      role,
      avatar_url,
      updated_at: new Date().toISOString(),
    };

    // ✅ Only update password if provided
    if (password) {
    //   const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = password;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update(updatedData)
      .eq("id", params.id)
      .select("id, email, user_name, first_name, last_name, role, avatar_url")
      .single();

    if (error || !data) {
      return NextResponse.json(
        { status: 404, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "User updated successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Failed to update user" },
      { status: 500 }
    );
  }
}

// ✅ DELETE (remove user)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", params.id)
      .select("id")
      .single();

    if (error || !data) {
      return NextResponse.json(
        { status: 404, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "User deleted successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Failed to delete user" },
      { status: 500 }
    );
  }
}