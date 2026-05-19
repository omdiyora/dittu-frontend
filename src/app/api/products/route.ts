import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

// ✅ GET all products
export async function GET() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// ✅ CREATE product
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      description,
      price,
      original_price,
      images,
      badge,
      badge_type,
      product_details,
      stock,
      p_images,
      category
    } = body;

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name,
          slug,
          description,
          price,
          original_price,
          images,
          badge,
          badge_type,
          product_details,
          stock,
          p_images,
          category
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}