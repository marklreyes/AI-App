/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import OpenAI from "openai";

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

export default {
	async fetch(request, env, ctx) {
		// Handle CORS preflight request
		if (request.method === "OPTIONS") {
			return new Response(null, { headers: corsHeaders });
		}

		if (!env.OPENAI_API_KEY) {
			return new Response("The OPENAI_API_KEY environment variable is missing or empty.", { status: 500, headers: corsHeaders });
		}

		// Only process POST requests
		if (request.method !== "POST") {
			return new Response(JSON.stringify({ error: `${request.method} method not allowed.`}), { status: 405, headers: corsHeaders });
		}

		const openai = new OpenAI({
			apiKey: env.OPENAI_API_KEY,
			baseURL: "https://gateway.ai.cloudflare.com/v1/bb2a42f62db10be6f4ca20c32b5d4f52/stock-predictions/openai"
		});

		try {
			const messages = await request.json();
            const chatCompletion = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: messages,
                temperature: 1.1,
                presence_penalty: 0,
                frequency_penalty: 0
            });

			const response = chatCompletion.choices[0].message.content;
			return new Response(JSON.stringify(response), {headers: corsHeaders});
		} catch(e) {
			return new Response(JSON.stringify({error: e.message}), { status: 500, headers: corsHeaders });
		}
	},
};
