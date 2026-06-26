"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import ChatMessage from "./ChatMessage";
import type { Message } from "@/types";

function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text.replace(/[#*\[\]]/g, ""));
  utter.lang = "es-ES";
  utter.rate = 1.0;
  utter.pitch = 1.05;
  window.speechSynthesis.speak(utter);
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content:
        "¡Hola! Soy **Nabi**, explorador de los 7 mares y guía de Piratas de Nabia. ⛵\n\nHe recorrido más de **100 destinos** en 50 países. Pregúntame sobre cualquier rincón del mundo o sobre nuestras rutas en las Rías Baixas. ¡Zarpamos!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  const handleSpeak = useCallback((text: string) => {
    speak(text);
  }, []);

  function startVoiceInput() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      inputRef.current?.focus();
    };
    recognition.onerror = () => setListening(false);

    recognition.start();
  }

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
          content:
            "¡Tormenta digital! 🌊 No pude procesar tu mensaje. Inténtalo de nuevo o llámame al **986 320 048**.",
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
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-amber-600 text-sm font-bold text-navy-900 shadow-sm">
                N
              </div>
              <div>
                <p className="text-sm font-bold text-white">Nabi</p>
                <p className="text-xs text-white/50">Explorador de 100+ destinos</p>
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
              <ChatMessage
                key={msg.id}
                role={msg.role}
                content={msg.content}
                onSpeak={handleSpeak}
                onCopy={handleCopy}
              />
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-amber-600 text-sm font-bold text-navy-900">
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
            <button
              type="button"
              onClick={startVoiceInput}
              disabled={loading}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                listening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-ocean-100 text-ocean-600 hover:bg-ocean-200"
              }`}
              aria-label="Entrada de voz"
              title="Hablar"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregúntame sobre cualquier destino..."
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
