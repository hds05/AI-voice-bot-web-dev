// src/app/api/elevenlabs-tts/route.js
export async function POST(req) {
  const { text, voice = "IKne3meq5aSn9XLyUdCD" } = await req.json(); // Use voice ID instead of name

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return new Response("Missing API key", { status: 500 });
  }

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_monolingual_v1",
      voice_settings: { stability: 0.5, similarity_boost: 0.75 }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("ElevenLabs API error:", errorText);
    return new Response("Failed to fetch TTS", { status: 500 });
  }

  // ElevenLabs returns audio as a stream
  const audioBuffer = await response.arrayBuffer();
  return new Response(audioBuffer, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg"
    }
  });
}
