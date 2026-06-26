const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

const MODELS = [
  "openrouter/free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "nousresearch/hermes-3-llama-3.1-405b:free",
  "meta-llama/llama-3.2-3b-instruct:free",
];

async function tryModel(
  model: string,
  messages: { role: string; content: string }[],
  systemPrompt: string
) {
  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://piratasdenabia.com",
      "X-Title": "Piratas de Nabia - Demo IA",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`${model} - ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || null;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function chatCompletion(
  messages: { role: string; content: string }[],
  systemPrompt: string
) {
  let lastError: string = "";

  for (const model of MODELS) {
    try {
      const result = await tryModel(model, messages, systemPrompt);
      if (result) return result;
    } catch (e: any) {
      lastError = e.message;
      console.warn(`Model ${model} failed:`, e.message);
      if (e.message.includes("429")) {
        await delay(1500);
      }
    }
  }

  throw new Error(`Todos los modelos fallaron. Último error: ${lastError}`);
}
