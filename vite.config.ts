import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';

function geminiIcebreakerPlugin(): Plugin {
  return {
    name: 'gemini-icebreaker-plugin',
    configureServer(server) {
      server.middlewares.use('/api/generate-icebreakers', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const { userA, userB, tone = 'witty and charming' } = data;

            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
              const fallbackResult = getFallbackIcebreakers(userA, userB, tone);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(fallbackResult));
              return;
            }

            const ai = new GoogleGenAI({});
            const prompt = `You are HerVibe's AI Matchmaker and Wingman for a modern, safe dating app in India (popular in cities like Ahmedabad, Surat, Mumbai).
Analyze two matched users and suggest 4 high-quality, personalized icebreaker conversation starters to eliminate awkwardness.
Focus on common ground, quirks, food/travel, or bio prompts.

Sender (User A):
- Name: ${userA?.name || 'Aarav'}
- City: ${userA?.city || 'Ahmedabad'}
- Interests: ${(userA?.interests || ['Tech', 'Coffee', 'Music']).join(', ')}

Match (User B):
- Name: ${userB?.name || 'Ananya'}
- Age: ${userB?.age || 23}
- City: ${userB?.city || 'Ahmedabad'}
- Profession: ${userB?.profession || 'Designer'}
- Bio: "${userB?.bio || ''}"
- Interests: ${(userB?.interests || []).join(', ')}
- Prompts: ${JSON.stringify(userB?.prompts || [])}

Requested Tone: "${tone}"

Return ONLY valid JSON with this exact structure:
{
  "commonGround": "A short 1-sentence observation of what connects them (e.g. shared love for artisanal coffee or Gujarat riverfront drives)",
  "icebreakers": [
    {
      "category": "Witty & Playful",
      "text": "An engaging, witty opening line"
    },
    {
      "category": "Shared Passion",
      "text": "A line referencing common interest or music/food"
    },
    {
      "category": "Curious & Thoughtful",
      "text": "A thoughtful question about one of their bio prompts"
    },
    {
      "category": "Local Vibe",
      "text": "A fun regional or local hangout invitation question"
    }
  ]
}`;

            const response = await ai.models.generateContent({
              model: 'gemini-3.8-flash',
              contents: prompt,
              config: {
                responseMimeType: 'application/json',
              },
            });

            const text = response.text || '';
            const parsed = JSON.parse(text);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ...parsed, isAiGenerated: true }));
          } catch (err: any) {
            console.error('Error in /api/generate-icebreakers:', err);
            const fallbackResult = getFallbackIcebreakers(undefined, undefined, 'friendly');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ...fallbackResult, error: err?.message }));
          }
        });
      });

      server.middlewares.use('/api/gemini-coach', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const { message, persona = 'wingman', userGender = 'woman', history = [] } = data;

            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                reply: "Hey! I'm Aria, your HerVibe AI wingman. Always keep your first date at a buzzing cafe like The Project Cafe, be genuinely curious about their passions, and let your authentic vibe shine!",
                spokenText: "Hey! I'm Aria, your HerVibe AI wingman. Always keep your first date at a buzzing cafe, be curious, and let your authentic vibe shine!",
              }));
              return;
            }

            const ai = new GoogleGenAI({});
            const systemInstruction = `You are Aria, HerVibe's charismatic voice dating wingman and safety matchmaker.
HerVibe is India's premium dating app where women choose first and safety is paramount.
Keep replies conversational, snappy, encouraging, and natural for text-to-speech voice playback (max 2-3 spoken sentences).
Offer modern dating advice, clever Gujarati/Indian context if relevant, witty comeback tips, and safety assurance.
User gender: ${userGender}. Mode: ${persona}.`;

            const prompt = `${systemInstruction}\nUser said: "${message}"\nProvide a warm, charming voice response.`;

            const response = await ai.models.generateContent({
              model: 'gemini-3.8-flash',
              contents: prompt,
            });

            const reply = response.text || 'You got this! Radiate confidence and keep things lighthearted.';
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ reply, spokenText: reply }));
          } catch (err: any) {
            console.error('Error in /api/gemini-coach:', err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              reply: "Confidence is key! Ask open-ended questions about their favorite memories and listen with genuine interest.",
              spokenText: "Confidence is key! Ask open-ended questions and listen with genuine interest."
            }));
          }
        });
      });
    },
  };
}

function getFallbackIcebreakers(userA?: any, userB?: any, _tone: string = 'warm') {
  const matchName = userB?.name || 'there';
  const matchCity = userB?.city || 'Gujarat';
  const interests = userB?.interests || ['Coffee', 'Indie Music'];
  const firstInterest = interests[0] || 'Coffee';
  const secondInterest = interests[1] || 'Music';

  return {
    commonGround: `Both of you appreciate vibrant experiences and share interest in ${firstInterest} & ${secondInterest} in ${matchCity}!`,
    icebreakers: [
      {
        category: 'Witty & Playful',
        text: `Hey ${matchName}! On a scale of 1 to 10, how controversial is your favorite ${firstInterest} spot in ${matchCity}? 😉`,
      },
      {
        category: 'Shared Passion',
        text: `Saw you're into ${firstInterest}! What's your go-to ritual when you need to completely unwind?`,
      },
      {
        category: 'Curious & Thoughtful',
        text: `Your bio caught my attention! What's the most memorable recent adventure you've had in ${matchCity}?`,
      },
      {
        category: 'Local Vibe',
        text: `If we had an hour to grab the best coffee or street bites in ${matchCity}, where are you taking me? ☕`,
      },
    ],
    isAiGenerated: false,
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiIcebreakerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
