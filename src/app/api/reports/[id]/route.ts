// app/api/reports/[id]/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("loan_reports")
      .select("*")
      .eq("id", params.id)
      .single(); // 👈 important

    if (error || !data) {
      return NextResponse.json(
        { status: 404, message: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: 200, data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Error fetching report" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // ✅ Remove empty values
    const updateData = Object.fromEntries(
      Object.entries(body).filter(
        ([_, v]) => v !== "" && v !== null && v !== undefined
      )
    );

    // Optional: remove unwanted keys
    delete updateData.endpointUrlPath;
    delete updateData.methodName;

    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("loan_reports")
      .update(updateData)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 200,
      message: "Report updated",
      data,
    });

  } catch (error: any) {
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("loan_reports")
      .delete()
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { message: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Report deleted",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}