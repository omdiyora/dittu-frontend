import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from("loan_reports")
      .insert([body])
      .select();

    if (error) throw error;

    return NextResponse.json(
      {
        status: 201,
        message: "Report created successfully",
        data,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("loan_reports")
      .select("*")
      .order("id", { ascending: false }); // 🔥 latest first

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

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await request.json();

//     const { data, error } = await supabase
//       .from("loan_reports")
//       .update({
//         report_date: body.report_date,
//         name: body.name,
//         type_loan: body.type_loan,
//         branch: body.branch,
//         updated_at: new Date().toISOString(),
//         updated_by: body.updated_by,
//       })
//       .eq("id", params.id)
//       .select()
//       .single();

//     if (error) {
//       return NextResponse.json(
//         { message: error.message },
//         { status: 500 }
//       );
//     }

//     if (!data) {
//       return NextResponse.json(
//         { message: "Report not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       message: "Report updated",
//       data,
//     });
//   } catch (error: any) {
//     return NextResponse.json(
//       { message: "Update failed" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { data, error } = await supabase
//       .from("loan_reports")
//       .delete()
//       .eq("id", params.id)
//       .select()
//       .single();

//     if (error) {
//       return NextResponse.json(
//         { message: error.message },
//         { status: 500 }
//       );
//     }

//     if (!data) {
//       return NextResponse.json(
//         { message: "Report not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       message: "Report deleted",
//       data,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Delete failed" },
//       { status: 500 }
//     );
//   }
// }