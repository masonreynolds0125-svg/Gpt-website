import OpenAI from "openai";

export async function POST(request) {
  try {
    const { messages } = await request.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Missing OPENAI_API_KEY environment variable." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-5.2-chat-latest",
      messages,
      temperature: 0.7,
    });

    const content = completion.choices?.[0]?.message?.content || "No response";

    return Response.json({ text: content });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
