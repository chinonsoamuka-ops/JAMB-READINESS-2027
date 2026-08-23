import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "JAMB Prep CBT API" });
});

// Explain a specific question or concept
app.post("/api/ai/explain", async (req, res) => {
  try {
    const { subject, question, options, correctAnswer, selectedAnswer, context } = req.body;

    const prompt = `You are an expert Nigerian JAMB UTME exam tutor and subject specialist for ${subject || "general JAMB"}.
Please provide a clear, encouraging, and pedagogically sound breakdown for this past JAMB question:

Question: ${question}
Options:
${options ? Object.entries(options).map(([k, v]) => `${k}: ${v}`).join("\n") : "N/A"}
Correct Answer: Option ${correctAnswer}
Student's Selected Answer: Option ${selectedAnswer || "None"}
${context ? `Additional Context: ${context}` : ""}

Please structure your response with:
1. **Core Concept / Rule / Formula**: Explain the foundational theory concisely.
2. **Step-by-Step Solution / Detailed Analysis**: Walk through why Option ${correctAnswer} is mathematically or grammatically correct.
3. **Common Pitfall / Why Distractors Fail**: Explain why students mistakenly pick options like ${selectedAnswer && selectedAnswer !== correctAnswer ? selectedAnswer : "other distractors"}.
4. **JAMB Exam Tip / Mnemonic**: A high-yield memory trick or shortcut to solve this fast in under 45 seconds during the real exam.

Keep the tone encouraging, clear, formatted in Markdown, and geared specifically toward high performance in the Nigerian JAMB UTME examination.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are 'JAMB Master AI', an inspiring, patient, and knowledgeable Nigerian UTME tutor. You excel at breaking down Mathematics, English, Physics, Chemistry, Biology, and Commercial/Arts subjects simply.",
      },
    });

    res.json({ explanation: response.text || "No explanation generated." });
  } catch (error: any) {
    console.error("AI explanation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate explanation" });
  }
});

// Ask AI general questions or study questions
app.post("/api/ai/tutor", async (req, res) => {
  try {
    const { message, subject, history } = req.body;

    const formattedHistory = Array.isArray(history) 
      ? history.map((h: { role: string; content: string }) => `${h.role === "user" ? "Student" : "Tutor"}: ${h.content}`).join("\n")
      : "";

    const prompt = `You are JAMB Buddy, an elite Nigerian JAMB examination tutor. 
Subject context: ${subject || "General JAMB UTME Strategy & Prep"}.

Previous conversation:
${formattedHistory}

Student says:
${message}

Provide a helpful, precise, and motivating response. If the student asks for calculations, show steps. If they ask about literature or English, give examples. Include exam strategies and tips where relevant.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
    });

    res.json({ reply: response.text || "I am here to help you ace your JAMB exam!" });
  } catch (error: any) {
    console.error("AI tutor error:", error);
    res.status(500).json({ error: error.message || "Failed to connect to AI Tutor" });
  }
});

// Generate practice questions on any topic
app.post("/api/ai/generate-questions", async (req, res) => {
  try {
    const { subject, topic, count = 3 } = req.body;

    const prompt = `Generate ${count} authentic JAMB UTME style past-question format multiple choice questions for Subject: "${subject}", specifically focusing on Topic: "${topic}".
Each question MUST follow strict JAMB CBT 4-option (A, B, C, D) format with clear explanations.

Return valid JSON in this exact structure:
[
  {
    "id": "gen-1",
    "question": "Question text here",
    "options": {
      "A": "Option A text",
      "B": "Option B text",
      "C": "Option C text",
      "D": "Option D text"
    },
    "correctAnswer": "A",
    "explanation": "Detailed step by step solution and reason.",
    "topic": "${topic}",
    "year": "Predicted 2025/2026 Style"
  }
]`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "[]");
    res.json({ questions: parsed });
  } catch (error: any) {
    console.error("AI question generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate questions" });
  }
});

// Setup Vite / Static Server
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`JAMB Prep Server running on port ${PORT}`);
  });
}

start();
