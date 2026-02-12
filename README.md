# TrekBuddy - Premium Puducherry Tourism Companion

TrekBuddy is an intelligent, AI-powered tourism companion designed for exploring Puducherry (The French Riviera of the East). It features a premium glassmorphic UI, real-time transit information, and a local AI guide powered by Ollama.

## 🚀 Features

- **Premium UI/UX**: Glassmorphism, smooth animations (Framer Motion), and responsive design.
- **AI Guide (Local)**: Integrated with **Ollama (Llama 3.2)** for private, offline-capable travel assistance.
- **Trip Planner**: Interactive drag-and-drop itinerary builder.
- **Transit Info**: Real-time guide for local bus, train, and rental options.
- **Authentication**: Secure login/signup via Firebase Auth.
- **Database**: User profiles and saved places on Firestore.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, Shadcn UI
- **AI**: Ollama (running locally)
- **Backend**: Firebase (Auth, Firestore)
- **State Management**: React Context + Hooks

## 🏃‍♂️ Getting Started

### Prerequisites

1.  **Node.js** (v18+)
2.  **Ollama** installed and running (`ollama serve`).
    - Pull the model: `ollama pull llama3.2`
3.  **Firebase Project** setup with Auth and Firestore.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Vishnujayakumar-04/TrekBuddy-pondicherry.git
    cd TrekBuddy-pondicherry
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables in `.env.local`:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    # ... other firebase configs
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
