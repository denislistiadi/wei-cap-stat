import { type NextRequest, NextResponse } from 'next/server';

import { apiKey, generateEndpoint, modelId } from '@/config/config';

const fetchOpenRouter = async (text: string) => {
  if (!apiKey) {
    throw new Error('API key is not set');
  }

  const resp = await fetch(generateEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: modelId,
      messages: [
        {
          role: 'user',
          content: text,
        },
      ],
    }),
  });
  if (!resp.ok) {
    throw new Error(`HTTP error! status: ${resp.status}`);
  }
  const data = await resp.json();
  console.log('Response from OpenRouter:', data);
  return data;
};

const extractCaptions = (text: string) => {
  const rawParts = text.split(/\n\d+\.\s/).slice(1);

  return rawParts.map((part) => {
    const caption = part.split('*')[0].trim();
    return caption.replace(/\*\*/g, '').trim();
  });
};

export async function POST(req: NextRequest) {
  const body = await req.json();

  const prompt = `Buatlah 5 caption Instagram yang menarik, elegan, dan unik dalam bahasa Indonesia. Caption-caption ini harus relevan dengan konteks berikut: ${body.text}. Gunakan gaya bahasa yang kreatif, menyentuh emosi, dan sesuai untuk audiens modern di media sosial. Buat dalam bentuk list dengan format 1. Caption pertama, 2. Caption kedua, dst. Pastikan setiap caption tidak lebih dari 100 karakter dan hindari penggunaan tanda baca yang berlebihan. Gunakan gaya bahasa yang sesuai dengan tren saat ini dan mudah dipahami oleh pembaca.`;

  try {
    const resp = await fetchOpenRouter(prompt);
    const data = extractCaptions(resp.choices[0].message.content);
    console.table(resp.choices[0].message.content);
    return NextResponse.json({ data });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
