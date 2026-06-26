import { NextResponse } from "next/server";
import { chatCompletion } from "@/lib/openrouter";
import { SYSTEM_PROMPT } from "@/lib/knowledge";
import { supabase } from "@/lib/supabase";

function wantsToSaveCrm(text: string): boolean {
  const keywords = ["anota", "guarda", "registra", "apunta", "nueva tarea", "nuevo cliente", "nuevo proyecto", "crm"];
  return keywords.some((k) => text.toLowerCase().includes(k));
}

function wantsToListCrm(text: string): boolean {
  const keywords = ["qué tareas", "lista", "tareas tengo", "muestra", "crm", "mis tareas", "tareas guardadas"];
  return keywords.some((k) => text.toLowerCase().includes(k));
}

function extractCrmSaveBlocks(text: string): any[] {
  const blocks: any[] = [];
  const regex = /\[CRM:SAVE\]([\s\S]*?)\[\/CRM:SAVE\]/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    try {
      const data = JSON.parse(match[1].trim());
      blocks.push(data);
    } catch {
      // skip invalid JSON
    }
  }
  return blocks;
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Se requiere al menos un mensaje" },
        { status: 400 }
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OpenRouter no está configurado. Revisa las variables de entorno." },
        { status: 500 }
      );
    }

    const lastUserMsg = messages[messages.length - 1]?.content || "";

    let systemPrompt = SYSTEM_PROMPT;

    if (wantsToListCrm(lastUserMsg)) {
      const { data: tasks } = await supabase
        .from("crm_tasks")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (tasks && tasks.length > 0) {
        const crmContext = tasks
          .map(
            (t: any, i: number) =>
              `${i + 1}. Cliente: ${t.cliente} | Proyecto: ${t.proyecto} | Responsable: ${t.responsable} | Estado: ${t.estado} | Próxima acción: ${t.proxima_accion} | Fecha: ${t.fecha} | Valor: ${t.valor}`
          )
          .join("\n");

        systemPrompt =
          SYSTEM_PROMPT +
          `\n\nTAREAS CRM GUARDADAS ACTUALMENTE:\n${crmContext}\n\nSi el usuario pregunta, muéstrale este listado. Si no hay tareas relevantes, díselo.`;
      }
    }

    const response = await chatCompletion(messages, systemPrompt);

    const crmBlocks = extractCrmSaveBlocks(response);
    for (const block of crmBlocks) {
      if (block.cliente) {
        await supabase.from("crm_tasks").insert({
          cliente: block.cliente,
          proyecto: block.proyecto || "",
          responsable: block.responsable || "",
          estado: block.estado || "Contactado",
          proxima_accion: block.proxima_accion || "",
          fecha: block.fecha || "",
          valor: block.valor || "",
          notes: block.notes || "",
        });
      }
    }

    const cleanResponse = response.replace(/\[CRM:SAVE\][\s\S]*?\[\/CRM:SAVE\]/g, "").trim();

    return NextResponse.json({ response: cleanResponse });
  } catch (error) {
    console.error("Error en chat API:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
