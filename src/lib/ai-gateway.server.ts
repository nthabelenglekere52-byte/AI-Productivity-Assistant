import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

/**
 * ===== AI CONNECTION POINT =====
 * All AI requests go through the Lovable AI Gateway from server-side code only.
 * The API key is read from the server environment (never exposed to the browser).
 * To swap in another provider later, change the baseURL/headers here only.
 */
export function createLovableAiGatewayProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "lovable-ai-gateway",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });
}

export const ASSISTANT_MODEL = "google/gemini-3.7-flash";

export function getApiKey(): string | null {
  return process.env["LOVABLE_API_KEY"] ?? null;
}