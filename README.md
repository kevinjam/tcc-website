# Trinity Christian Church

A modern, responsive website for Trinity Christian Church built with React, Vite, TypeScript, and Tailwind CSS.

## Features

- Responsive design with Tailwind CSS
- Dynamic sections for events, branches, media, and more
- CMS panel for content management
- API integration with Express backend
- Support for Google Gemini AI features

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start at `http://localhost:5173` with the Express server handling API routes.

### Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Production

```bash
npm start
```

## Environment Variables

Create a `.env` file based on `.env.example`:

- `GEMINI_API_KEY` - (Optional) Google Gemini API key for AI features
- `PORT` - (Optional) Server port (defaults to 5173)

## Deployment

### Vercel

This project is optimized for deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard (if using Gemini features)
4. Vercel will automatically build and deploy

The `vercel.json` and `.nvmrc` files ensure proper configuration.

## Project Structure

```
src/
├── components/        # React components
├── App.tsx           # Main app component
├── types.ts          # TypeScript type definitions
├── index.css         # Global styles
└── main.tsx          # Entry point

server.ts            # Express server
vite.config.ts       # Vite configuration
tsconfig.json        # TypeScript configuration
```

## Technologies

- React 19
- Vite
- TypeScript
- Tailwind CSS
- Express.js
- Lucide React (icons)
- Google Generative AI

## License

All rights reserved © Trinity Christian Church

