# PLAN 1.0 — Producción Vercel

## Fase 0: Pre-deploy (5 min)

```bash
git add -A
git commit -m "feat: chatbot con voz, copy, share + personalidad explorador 100 destinos"
git push origin main
```

## Fase 1: Supabase (gratis)

1. Ir a https://supabase.com → proyecto
2. **SQL Editor** → pegar y ejecutar:

```sql
CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  messages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

## Fase 2: Vercel (gratis)

1. Ir a https://vercel.com/new
2. Importar el repo de GitHub
3. **Framework:** Next.js (detecta automático)
4. **Añadir variables de entorno:**

| Variable | Valor |
|---|---|
| `OPENROUTER_API_KEY` | `sk-or-v1-...` (tu key de https://openrouter.ai/keys) |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://tu-proyecto.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJ...` (tu anon key de Supabase > Settings > API) |

5. Click **Deploy** → ~2 min

## Fase 3: Post-deploy

- **[https://tu-app.vercel.app](https://tu-app.vercel.app)** — demo online
- **Vercel Analytics** (gratis) → activar en dashboard

## Fase 4: Mejoras futuras (prioridad)

1. Base de conocimiento RAG con embeddings (Supabase pgvector)
2. Subida de documentos (OCR) para ofertas, contratos
3. Reserva real via FareHarbor API
4. Multilenguaje (inglés, portugués)
5. Dashboard de analítica de conversaciones
6. Integración WhatsApp Business + Instagram
7. Texto a voz y voz a texto
8. Botones copiar y compartir RRSS

## Costes

| Servicio | Gratuito | Límite |
|---|---|---|
| Vercel | ✅ | 100 GB ancho de banda/mes |
| Supabase | ✅ | 500 MB BD, 5 GB ancho banda |
| OpenRouter | ✅ | Modelos free (rate limit) |
| GitHub | ✅ | Repos ilimitados |

**Coste total mensual: 0 €**
