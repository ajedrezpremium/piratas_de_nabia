import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("crm_tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("CRM GET error:", error);
    return NextResponse.json({ tasks: [] });
  }

  return NextResponse.json({ tasks: data || [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.cliente) {
      return NextResponse.json(
        { error: "El campo 'cliente' es obligatorio" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("crm_tasks")
      .insert({
        cliente: body.cliente,
        proyecto: body.proyecto || "",
        responsable: body.responsable || "",
        estado: body.estado || "Contactado",
        proxima_accion: body.proxima_accion || "",
        fecha: body.fecha || "",
        valor: body.valor || "",
        notes: body.notes || "",
      })
      .select()
      .single();

    if (error) {
      console.error("CRM POST error:", error);
      return NextResponse.json(
        { error: "Error al guardar la tarea CRM" },
        { status: 500 }
      );
    }

    return NextResponse.json({ task: data });
  } catch {
    return NextResponse.json(
      { error: "Error procesando la solicitud" },
      { status: 400 }
    );
  }
}
