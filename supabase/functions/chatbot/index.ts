
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    console.log('Received request with messages:', messages?.length || 0);

    if (!openAIApiKey) {
      console.error('OpenAI API key is missing');
      return new Response(JSON.stringify({ 
        error: "OpenAI API key is not configured. Please contact support." 
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      console.error('Invalid messages array:', messages);
      return new Response(JSON.stringify({ 
        error: "Invalid message format. Please try again." 
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log('Making OpenAI API request...');
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { 
            role: "system", 
            content: "You are WombBot, a supportive and knowledgeable expert on women's health, periods, reproductive wellness, and community support. Provide helpful, accurate, and friendly advice. Always be empathetic and understanding. Keep responses conversational and supportive." 
          },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      
      if (response.status === 401) {
        return new Response(JSON.stringify({ 
          error: "API authentication failed. Please check your OpenAI API key." 
        }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } else if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: "API rate limit exceeded. Please try again in a moment." 
        }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } else {
        return new Response(JSON.stringify({ 
          error: `OpenAI API error: ${response.status}. Please try again later.` 
        }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const data = await response.json();
    console.log('OpenAI response received, choices:', data?.choices?.length || 0);

    const answer = data?.choices?.[0]?.message?.content;

    if (!answer) {
      console.error('No answer in OpenAI response:', data);
      return new Response(JSON.stringify({ 
        error: "I'm having trouble generating a response right now. Please try rephrasing your question." 
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log('Successfully returning answer');
    return new Response(JSON.stringify({ answer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error('Edge Function error:', error);
    return new Response(JSON.stringify({ 
      error: "I'm experiencing technical difficulties. Please try again in a moment." 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
