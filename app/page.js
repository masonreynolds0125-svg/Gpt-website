"use client";

import { useState } from "react";

const starterMessages = [
  { role: "assistant", content: "Hi! I’m your GPT 5.2 chat assistant. Ask me anything." },
];

export default function Home() {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${error.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="shell">
      <div className="chat-card">
        <header className="topbar">
          <div>
            <p className="eyebrow">AI Assistant</p>
            <h1>GPT 5.2 Chat</h1>
          </div>
        </header>

        <section className="chat-window">
          {messages.map((msg, index) => (
            <div key={`${msg.role}-${index}`} className={`bubble ${msg.role}`}>
              <span>{msg.content}</span>
            </div>
          ))}
          {loading && (
            <div className="bubble assistant loading">
              <span>Thinking…</span>
            </div>
          )}
        </section>

        <form onSubmit={handleSubmit} className="composer">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            placeholder="Type your message..."
            aria-label="Message input"
          />
          <button type="submit" disabled={loading || !input.trim()}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </main>
  );
}
