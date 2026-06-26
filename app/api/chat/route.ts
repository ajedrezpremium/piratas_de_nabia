import { NextResponse } from "next/server";
import { chatCompletion } from "@/lib/openrouter";
import { SYSTEM_PROMPT } from "@/lib/knowledge";

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

    const response = await chatCompletion(messages, SYSTEM_PROMPT);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error en chat API:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
