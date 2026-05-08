// app/api/users/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";


// export async function POST(request: Request) {
//     const client = await pool.connect();

//     try {
//         const {
//             email,
//             user_name,
//             password,
//             first_name,
//             last_name,
//             role,
//             avatar_url,
//         } = await request.json();


//         await client.query("BEGIN");

//         const query = `
//       INSERT INTO users 
//       (email, user_name, password, first_name, last_name, role, avatar_url)
//       VALUES ($1,$2,$3,$4,$5,$6,$7)
//       RETURNING id, email, user_name, first_name, last_name, role, avatar_url;
//     `;

//         const { rows } = await client.query(query, [
//             email,
//             user_name,
//             password,
//             first_name,
//             last_name,
//             role,
//             avatar_url,
//         ]);

//         await client.query("COMMIT");

//         return NextResponse.json(
//             {
//                 status: 201,
//                 message: "User created successfully",
//                 data: rows[0],
//             },
//             { status: 201 }
//         );
//     } catch (error: any) {
//         await client.query("ROLLBACK");
//         console.error("Create User Error:", error);

//         return NextResponse.json(
//             { status: 500, message: "Failed to create user" },
//             { status: 500 }
//         );
//     } finally {
//         client.release();
//     }
// }


// app/api/users/route.ts
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("dittu_users")
      .select("*");

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
// export async function GET() {
//     try {
//         const { rows } = await pool.query(
//             "SELECT * FROM users ORDER BY id DESC"
//         );

//         return NextResponse.json(
//             { status: 200, data: rows },
//             { status: 200 }
//         );
//     } catch (error) {
//         return NextResponse.json(
//             { status: 500, message: "Error fetching users" },
//             { status: 500 }
//         );
//     }
// }
