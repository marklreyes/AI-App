# AI App
AI App utilizing Cloudflare Workers, OpenAI and Polygon API.

## OpenAI API Worker

A Cloudflare Worker service that handles OpenAI API interactions.

![Front End to Cloudflare Worker to OpenAI API then back to Cloudflare Worker and back to the Front End](https://github.com/marklreyes/AI-App/blob/main/frontend_worker_openai.png?raw=true)


### Setup

1. Install dependencies:
```
    cd openai-api-worker
    npm install
```

2. Development:
```
    cd openai-api-worker    # Change directories
    npm run start           # Start dev server
    npm run deploy          # Deploy again
```

This starts a local development server at http://localhost:8787


### Testing

Tests are written using Vitest and can be run with:
```
npm test
```

### Deployment
```
npm run deploy
```

### View Project
* [Visit](https://openai-api-worker.openai-api-worker-scrimba-mreyes.workers.dev/)
* [Dash](https://dash.cloudflare.com/?to=/:account/workers/services/view/openai-api-worker)


### Project Structure
```
├── openai-api-worker       # Made initially by: npm create cloudflare@latest
│   ├── src                 # Worker code lives here
│       ├── index.js        # Main worker endpoint
│   ├── test                # Test files using Vitest
│   ├── package.json        # All you need to know about what's required
│   ├── wrangler.jsonc      # Cloudflare Workers configuration
└── README.md
```

### Explore Documentation
* [Workers](https://developers.cloudflare.com/workers/)

### Report an Issue
* [Cloudflare's workers-sdk repo](https://github.com/cloudflare/workers-sdk/issues/new/choose)

### Join Cloudflare's Community
* [Discord](https://discord.com/invite/cloudflaredev)



