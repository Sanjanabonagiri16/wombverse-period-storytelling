import React, { useState, useRef } from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    {
      sender: "bot",
      text: "Hi! I'm WombBot, your supportive companion for women's health questions. Ask me anything about periods, wellness, or community support!"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!input.trim()) return;

    const userMsg = { sender: "user" as "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setInput("");

    try {
      const chatHistory = [
        ...messages.map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        })),
        { role: "user", content: input },
      ];

      console.log('Invoking chatbot function...');

      const { data, error: invokeError } = await supabase.functions.invoke('chatbot', {
        body: { messages: chatHistory },
      });

      if (invokeError) {
        throw invokeError;
      }
      
      console.log('Response data:', data);

      if (data.answer) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.answer }
        ]);
      } else if (data.error) {
        console.error('API Error:', data.error);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `I apologize, but I encountered an issue: ${data.error}` }
        ]);
        setError(data.error);
      } else {
        throw new Error('No answer or error in response');
      }
    } catch (err: any) {
      console.error('Chatbot error:', err);
      const errorMessage = "I'm having trouble connecting right now. Please try again in a moment.";
      setError(errorMessage);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: errorMessage }
      ]);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  return (
    <>
      {/* Floating Chatbot Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          size="icon"
          className={`bg-gradient-to-tr from-indigo-600 via-slate-700 to-red-600 shadow-xl text-white rounded-full p-0 w-14 h-14 border-4 border-white ${
            isOpen ? "ring-4 ring-indigo-500" : ""
          }`}
          onClick={() => setIsOpen((o) => !o)}
          aria-label="Open Chatbot"
        >
          <Bot size={32} className="text-white" />
        </Button>
      </div>
      
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-32 right-8 z-50 w-full max-w-xs sm:max-w-sm drop-shadow-2xl">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-900/70 to-slate-800 rounded-xl border border-slate-600 flex flex-col h-96 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-600 bg-slate-900/70">
              <div className="flex items-center gap-2">
                <Bot className="text-red-400 w-6 h-6" />
                <span className="font-playfair font-bold text-lg text-white">WombBot</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chatbot"
                className="text-gray-300 hover:text-red-400 font-bold px-2 text-lg"
              >
                ×
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-2 text-sm bg-transparent custom-scrollbar">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2 ${
                      msg.sender === "bot"
                        ? "bg-indigo-900/40 text-white rounded-bl-none"
                        : "bg-red-600/30 text-white rounded-br-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start mb-2">
                  <div className="bg-indigo-900/30 text-white max-w-[60%] rounded-xl px-4 py-2 animate-pulse">
                    Typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Error Display */}
            {error && (
              <div className="px-4 py-2 text-xs text-red-300 bg-red-900/20 border-t border-red-800/30">
                {error}
              </div>
            )}
            
            {/* Input */}
            <form onSubmit={sendMessage} className="flex border-t border-slate-600 bg-slate-800/80 px-2 py-2 gap-2">
              <input
                className="flex-1 bg-transparent border-none text-white outline-none font-inter px-2 py-1 placeholder:text-gray-400"
                placeholder="Ask me anything about health..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <Button
                size="sm"
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-red-500 text-white font-bold rounded-lg px-4 py-1 hover:from-red-500 hover:to-indigo-600 disabled:opacity-50"
                disabled={loading || !input.trim()}
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      )}
      
      {/* Scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4F46E5;
          border-radius: 4px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4F46E5 #2d2d2d;
        }
      `}</style>
    </>
  );
};

export default Chatbot;
