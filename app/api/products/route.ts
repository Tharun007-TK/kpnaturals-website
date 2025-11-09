import { NextRequest, NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase-client";
import { getServiceSupabase } from "@/lib/supabase-server";

// GET all products
export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      // Provide richer diagnostics to help pinpoint configuration issues.
      const urlPresent = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
      const anonPresent = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
      console.error("[products GET] Supabase not configured", {
        urlPresent,
        anonPresent,
      });
      return NextResponse.json(
        {
          error: "Supabase not configured",
          diagnostics: {
            supabaseConfigured: isSupabaseConfigured(),
            urlPresent,
            anonPresent,
          },
        },
        { status: 500 }
      );
    }

    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[products GET] Error fetching products", error);
      return NextResponse.json(
        {
          error: "Failed to fetch products",
          diagnostics: { message: error.message, code: error.code },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ products });
  } catch (error: any) {
    console.error("[products GET] Unexpected error", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        diagnostics: { message: error?.message },
      },
      { status: 500 }
    );
  }
}

// POST create new product (admin only)
export async function POST(request: NextRequest) {
  try {
    const supabase = getServiceSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Admin operations not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, description, price, image_url } = body;

    if (!name || !description || price === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: name, description, price" },
        { status: 400 }
      );
    }

    const { data: product, error } = await supabase
      .from("products")
      .insert({
        name,
        description,
        price: parseFloat(price),
        image_url: image_url || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating product:", error);
      return NextResponse.json(
        { error: "Failed to create product" },
        { status: 500 }
      );
    }

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT update product (admin only)
export async function PUT(request: NextRequest) {
  try {
    const supabase = getServiceSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Admin operations not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { id, name, description, price, image_url } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const updates: any = {};
    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (price !== undefined) updates.price = parseFloat(price);
    if (image_url !== undefined) updates.image_url = image_url;

    const { data: product, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating product:", error);
      return NextResponse.json(
        { error: "Failed to update product" },
        { status: 500 }
      );
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE product (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const supabase = getServiceSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Admin operations not configured" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
      return NextResponse.json(
        { error: "Failed to delete product" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
