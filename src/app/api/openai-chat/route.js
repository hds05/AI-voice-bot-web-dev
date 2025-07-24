export async function POST(req) {
  const { messages } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Missing OpenAI API key");
    return new Response("Missing OpenAI API key", { status: 500 });
  }

  try {
    console.log("Sending request to OpenAI with messages:", messages.length);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful, friendly AI voice assistant. Keep responses conversational and natural for voice interaction. Be concise but engaging.'
          },
          ...messages
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    console.log("OpenAI response status:", response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      console.error('Response status:', response.status);
      console.error('Response headers:', Object.fromEntries(response.headers.entries()));
      return new Response(`Failed to get AI response: ${errorData}`, { status: 500 });
    }

    const data = await response.json();
    console.log("OpenAI response data:", data);
    
    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('OpenAI request error:', error);
    return new Response(`Failed to get AI response: ${error.message}`, { status: 500 });
  }
} 