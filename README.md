# 🚀 MyPortfolio · Space-Themed

A space-inspired personal portfolio to showcase my work, projects, and skills with a sleek, cosmic design.


## 💡 Overview

This is a frontend portfolio built with modern web tools. It features:

- A “space” aesthetic: dark background, star-like visuals, sleek transitions.
- Responsive design—works well on mobile and desktop.
- Showcase of projects, skills, and contact information.
- Clean architecture using components, utility-first CSS, and TypeScript.


## 🧰 Tech Stack

- **Framework / Build Tool:** Vite  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS (with custom theming)  
- **Bundler / Configs:** Vite + PostCSS  
- **Linting / Type checking:** ESLint + TS configs


## 📁 Structure

Here’s a quick tour of the folder layout:

MyPortfolio-SpaceThemed/
├── public/                # Static assets (images, icons, favicon, etc.)
├── src/                   # Application source code
│   ├── components/        # Reusable UI components
│   ├── views/             # Page-level components (Home, About, Projects, Contact)
│   ├── styles/            # Global styles, Tailwind/theme configuration
│   └── App.tsx            # Main application entry
├── index.html             # Root HTML file
├── tailwind.config.ts     # Tailwind CSS configuration
├── package.json           # Project metadata and dependencies
└── tsconfig.json          # TypeScript configuration


## 📲 How to Run

To get this portfolio running locally:

```bash
git clone https://github.com/humera314/humera_protofolio.git

npm install
npm run dev
```

## 🤖 VAPI AI Integration

This portfolio includes a "Talk with AI" button that integrates with VAPI for voice conversations.

### Setup VAPI:

1. **Get your VAPI credentials:**
   - Sign up at [vapi.ai](https://vapi.ai/)
   - Get your API key from the dashboard
   - Create an AI assistant and note the Assistant ID

2. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_VAPI_API_KEY=your_vapi_api_key_here
   VITE_VAPI_ASSISTANT_ID=your_assistant_id_here
   ```

3. **Test the integration:**
   - Click the "Talk with AI" button
   - Allow microphone permissions when prompted
   - Start a voice conversation with your AI assistant



