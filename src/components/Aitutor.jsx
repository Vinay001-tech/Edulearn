import React, { useEffect, useRef, useState } from "react";

// AI Tutor React component (single-file).
// - Tailwind CSS classes used for styling (no imports needed here)
// - Replace `/api/ai-tutor` with your real backend endpoint that proxies to an LLM or AI service
// - Uses Web Speech API for simple voice input (falls back gracefully if not available)

export default function AITutor() {
  const [messages, setMessages] = useState([
    { id: 1, role: "system", text: "Hi! I'm your AI tutor. Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentName] = useState("Student"); // replace or load from profile
  const messagesEndRef = useRef(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Auto-scroll the chat when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Basic send handler — posts message to backend and appends AI reply
  async function sendMessage(text) {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    try {
      setLoading(true);

      // Call your backend. Expected: { reply: '...', suggestions: [...] }
      // Replace with streaming logic if you implement SSE / streaming responses in backend.
      const res = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, student: studentName }),
      });

      if (!res.ok) throw new Error("AI service error");
      const data = await res.json();

      const aiMsg = {
        id: Date.now() + 1,
        role: "assistant",
        text: data.reply || "Sorry, I couldn't generate an answer right now.",
        meta: { suggestions: data.suggestions || [] },
      };

      setMessages((m) => [...m, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { id: Date.now() + 2, role: "assistant", text: "There was an error reaching the AI. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Quick action: ask AI to generate a short quiz based on the last topic
  async function generateQuiz() {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const prompt = lastUser
      ? `Create a 3-question short quiz about: ${lastUser.text}`
      : "Create a 3-question short quiz about basic arithmetic.";
    await sendMessage(prompt);
  }

  // Voice input (Web Speech API)
  function startListening() {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SpeechRecognition();
    rec.lang = "en-IN"; // change as needed
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setInput(text);
      setListening(false);
      rec.stop();
    };

    rec.onend = () => setListening(false);
    rec.onerror = (e) => {
      console.error("Speech error", e);
      setListening(false);
      rec.stop();
    };

    recognitionRef.current = rec;
    setListening(true);
    rec.start();
  }

  function stopListening() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  }

  // File upload handler to allow students to upload an image or document for the AI to analyze
  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Basic size check
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large (max 5MB)");
      return;
    }

    // Show a message that file was uploaded
    const placeholder = { id: Date.now(), role: "user", text: `Uploaded file: ${file.name}` };
    setMessages((m) => [...m, placeholder]);

    // Send to backend as FormData (your backend should accept multipart/form-data)
    const fd = new FormData();
    fd.append("file", file);
    fd.append("student", studentName);

    try {
      setLoading(true);
      const res = await fetch("/api/ai-tutor/upload", { method: "POST", body: fd });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, role: "assistant", text: data.reply || "Got your file — here's a summary." },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { id: Date.now() + 2, role: "assistant", text: "Unable to process the file." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex gap-6">
      {/* Left: chat area */}
      <div className="flex-1 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
        <header className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">AI Tutor</h2>
              <p className="text-sm text-gray-500">Personalized help, explanations, quizzes and more</p>
            </div>
            <div className="text-sm text-gray-600">{studentName}</div>
          </div>
        </header>

        <main className="p-6 flex-1 overflow-auto">
          <div className="space-y-4">
            {messages.map((m) => (
              <ChatBubble key={m.id} role={m.role} text={m.text} meta={m.meta} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </main>

        <footer className="p-4 border-t flex items-center gap-3">
          <label className="cursor-pointer">
            <input type="file" className="hidden" onChange={handleFileUpload} />
            <div className="p-2 rounded-md hover:bg-gray-100">📎</div>
          </label>

          <div className="flex-1">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(input); }}
              placeholder="Ask your tutor..."
              className="w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => (listening ? stopListening() : startListening())}
              className="px-3 py-2 rounded-lg hover:bg-gray-100"
              title="Voice input"
            >
              {listening ? "🎙️..." : "🎙️"}
            </button>

            <button
              onClick={() => sendMessage(input)}
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {loading ? "Thinking..." : "Send"}
            </button>
          </div>
        </footer>
      </div>

      {/* Right: panel with quick actions and progress */}
      <aside className="w-80 hidden md:block">
        <div className="sticky top-6 space-y-4">
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold">Quick actions</h3>
            <div className="mt-3 flex flex-col gap-2">
              <button onClick={generateQuiz} className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Generate 3-question quiz</button>
              <button onClick={() => sendMessage("Explain this topic in simple words:") } className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Explain topic simply</button>
              <button onClick={() => sendMessage("Give 3 practice problems with solutions:") } className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Practice + Solutions</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold">Progress</h3>
            <p className="text-sm text-gray-500 mt-2">Weekly exercise completion</p>
            <div className="mt-3">
              <ProgressBar label="Algebra" value={70} />
              <ProgressBar label="Geometry" value={40} />
              <ProgressBar label="Arithmetic" value={90} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold">AI Tips</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              <li>Ask step-by-step questions for better help.</li>
              <li>Upload a photo of your work for targeted feedback.</li>
              <li>Use the quiz generator to practice weak areas.</li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}

// Small presentational components below
function ChatBubble({ role, text, meta }) {
  const isAI = role === "assistant" || role === "system";
  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"}`}>
      <div className={`${isAI ? "bg-gray-100 text-gray-900" : "bg-indigo-600 text-white"} max-w-[70%] px-4 py-3 rounded-xl shadow-sm`}>
        <div className="whitespace-pre-wrap">{text}</div>
        {meta && meta.suggestions && meta.suggestions.length > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            Suggestions: {meta.suggestions.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}

function ProgressBar({ label, value }) {
  return (
    <div className="mt-3">
      <div className="flex justify-between text-sm mb-1">
        <div>{label}</div>
        <div>{value}%</div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="h-2 rounded-full" style={{ width: `${value}%`, background: 'linear-gradient(90deg, #6d28d9, #8b5cf6)' }} />
      </div>
    </div>
  );
}
