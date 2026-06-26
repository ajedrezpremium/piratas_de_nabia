interface Props {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
          isUser
            ? "bg-ocean-100 text-ocean-700"
            : "bg-gold-500 text-navy-900"
        }`}
      >
        {isUser ? "Tú" : "N"}
      </div>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-ocean-500 text-white"
            : "bg-white text-navy-800 shadow-sm border border-white/20"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
