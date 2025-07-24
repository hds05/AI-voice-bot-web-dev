export async function GET() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return new Response("Missing API key", { status: 500 });
  }

  try {
    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs voices API error:", errorText);
      return new Response("Failed to fetch voices", { status: 500 });
    }

    const voices = await response.json();
    return new Response(JSON.stringify(voices), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('ElevenLabs voices request error:', error);
    return new Response("Failed to fetch voices", { status: 500 });
  }
} 