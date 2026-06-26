"use client";
import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import type { Message } from "@/types";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content: "¡Hola! Soy **Nabi**, tu asistente virtual de Piratas de Nabia. ⛵\n\nPregúntame sobre rutas, horarios, precios o cualquier duda que tengas. ¡Estoy aquí para ayudarte!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("Error en la respuesta");

      const data = await res.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Lo siento, tuve un problema técnico. Por favor, inténtalo de nuevo o llámanos al **986 320 048**.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex w-[380px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-white/20 bg-white shadow-2xl">
          <div className="flex items-center justify-between rounded-t-2xl bg-navy-900 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-navy-900">
                N
              </div>
              <div>
                <p className="text-sm font-bold text-white">Nabi</p>
                <p className="text-xs text-white/50">Asistente virtual</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/50 transition-colors hover:text-white"
              aria-label="Cerrar chat"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4" style={{ maxHeight: "400px" }}>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-navy-900">
                  N
                </div>
                <div className="rounded-2xl bg-white px-4 py-2.5 shadow-sm border border-white/20">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gold-400" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gold-400" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gold-400" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-white/10 p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 rounded-xl border border-white/20 bg-ocean-50 px-4 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:border-ocean-400 focus:outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ocean-500 text-white transition-colors hover:bg-ocean-600 disabled:opacity-50"
              aria-label="Enviar"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-2xl text-navy-900 shadow-lg shadow-gold-500/30 transition-all hover:scale-105 hover:shadow-gold-500/50"
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span>⛵</span>
        )}
      </button>
    </>
  );
}
