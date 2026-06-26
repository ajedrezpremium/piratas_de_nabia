export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
  conversation_id?: string;
}

export interface Conversation {
  id: string;
  messages: Message[];
  created_at: string;
  updated_at: string;
}

export interface Route {
  name: string;
  slug: string;
  description: string;
  image?: string;
  price?: string;
  duration?: string;
  ports?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
