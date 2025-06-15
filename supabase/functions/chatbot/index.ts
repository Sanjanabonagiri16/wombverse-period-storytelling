
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import OpenAI from "https://esm.sh/openai@4.47.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      console.error('API key is missing from Supabase secrets.');
      return new Response(JSON.stringify({ 
        error: "API key is not configured. Please add it to your Supabase project secrets." 
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: openAIApiKey,
      defaultHeaders: {
        "HTTP-Referer": "https://wombwhispers.lovable.dev",
        "X-Title": "WombWhispers",
      },
    });

    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ 
        error: "Invalid message format. Please try again." 
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: "You are WombBot, a supportive and knowledgeable expert on women's health, periods, reproductive wellness, and community support. Provide helpful, accurate, and friendly advice. Always be empathetic and understanding. Keep responses conversational and supportive." 
        },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const answer = completion.choices[0]?.message?.content;

    if (!answer) {
      return new Response(JSON.stringify({ 
        error: "I'm having trouble generating a response right now. Please try rephrasing your question." 
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ answer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error('Edge Function error:', error);
    
    let errorMessage = "I'm experiencing technical difficulties. Please try again in a moment.";
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        errorMessage = "Your API key seems to be invalid. Please check it in your Supabase secrets and try again.";
      } else if (error.status === 429) {
        errorMessage = "I'm receiving too many requests right now. Please try again in a moment.";
      } else {
        errorMessage = `An API error occurred: ${error.message}. Please try again later.`;
      }
    }

    return new Response(JSON.stringify({ 
      error: errorMessage 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
