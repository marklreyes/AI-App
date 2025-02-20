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

export default {
	async fetch(request, env, ctx) {
		const openai = new OpenAI({
			apiKey: env.OPENAI_API_KEY,
		});

		try {
            const chatCompletion = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [{role: "user", content: "Should I trust stock predictions from Dodgy Dave?"}],
                temperature: 1.1,
                presence_penalty: 0,
                frequency_penalty: 0
            });

			const response = chatCompletion.choices[0].message.content;
			return new Response(JSON.stringify(response));
		} catch(e) {
			return new Response(e.message, { status: 500 });
		}
	},
};
