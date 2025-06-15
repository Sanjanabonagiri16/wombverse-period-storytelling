
import React, { useState, useRef } from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    {
      sender: "bot",
      text: "Hi! I'm WombBot. Ask me anything about WombVerse, periods, stories, or community resources!"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Send user message and fetch AI response
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

      const res = await fetch(
        `https://zxcczifkldwuelhibbwm.functions.supabase.co/chatbot`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: chatHistory }),
        }
      );

      const data = await res.json();
      if (data.answer) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.answer }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Sorry, I couldn't find an answer. Please try again later." }
        ]);
        if (data.error) setError(data.error);
      }
    } catch (err: any) {
      setError("Something went wrong connecting to the AI.");
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "There was a problem connecting to the AI. Please try again later."
        }
      ]);
    }
    setLoading(false);
  };

  // Scroll to the bottom on new messages
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  return (
    <>
      {/* Floating Chatbot Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          size="icon"
          className={`bg-gradient-to-tr from-womb-crimson via-womb-plum to-red-600 shadow-xl text-white rounded-full p-0 w-14 h-14 border-4 border-white ${
            isOpen ? "ring-4 ring-womb-crimson" : ""
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
          <div className="bg-gradient-to-br from-slate-900 via-womb-plum/70 to-womb-crimson/80 rounded-xl border border-womb-plum flex flex-col h-96 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-womb-plum bg-slate-900/70">
              <div className="flex items-center gap-2">
                <Bot className="text-womb-crimson w-6 h-6" />
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
                        ? "bg-womb-plum/30 text-womb-softwhite rounded-bl-none"
                        : "bg-red-500/30 text-white rounded-br-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start mb-2">
                  <div className="bg-womb-plum/20 text-womb-softwhite max-w-[60%] rounded-xl px-4 py-2 animate-pulse">
                    Typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* Error */}
            {error && (
              <div className="px-4 py-2 text-xs text-red-400 bg-red-900/30">
                {error}
              </div>
            )}
            {/* Input */}
            <form onSubmit={sendMessage} className="flex border-t border-womb-plum bg-slate-800/80 px-2 py-2 gap-2">
              <input
                className="flex-1 bg-transparent border-none text-white outline-none font-inter px-2 py-1 placeholder:text-gray-400"
                placeholder="Ask me anytime…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <Button
                size="sm"
                type="submit"
                className="bg-gradient-to-r from-womb-plum to-red-500 text-white font-bold rounded-lg px-4 py-1 hover:from-red-500 hover:to-womb-plum disabled:opacity-50"
                disabled={loading || !input.trim()}
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      )}
      {/* Add scrollbar styles for nice appearance */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #7D5BA6;
          border-radius: 4px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #7D5BA6 #2d2d2d;
        }
      `}</style>
    </>
  );
};

export default Chatbot;
