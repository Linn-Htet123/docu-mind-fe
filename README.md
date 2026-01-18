# DocuMind - Generative AI Portfolio & RAG Interface

A minimalist, high-performance personal portfolio and AI chatbot interface built with **Next.js 15**.

This project goes beyond a static resume by integrating a **Generative AI Agent**. Users can upload documents (PDF, DOCX) and engage in a context-aware conversation where the AI answers based on the uploaded content and the author's professional background.

## 🧠 How it Works (RAG Architecture)

This frontend interfaces with a backend RAG (Retrieval-Augmented Generation) pipeline designed for high accuracy:

1.  **Ingestion:** Users upload raw documents (PDF/DOCX) which are parsed and transformed into vector embeddings.
2.  **Vector Search:** User queries trigger a semantic search against the vector database.
3.  **Prompt Refinement:** The system uses a **Prompt Rewrite** step to optimize the user's query before sending it to the LLM.
4.  **Streaming Response:** The final answer is streamed back to this client via **Server-Sent Events (SSE)** for real-time token generation.

## 🚀 Features

### AI & Core Functionality
-   **Document Chat (RAG)**: Seamless upload and processing of PDF/DOCX files.
-   **Smart Suggestions**: High-contrast suggestion pills that automatically trigger AI discussions on specific topics.
-   **Markdown Rendering**: Chat messages support full Markdown for code snippets, tables, and formatted text.
-   **Real-time Streaming**: Native Fetch implementation to handle SSE streams without UI blocking.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 16.1.2](https://nextjs.org/) 
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **State Management**: React Context API (`ChatProvider`)
-   **Networking**: Native `fetch` (for Streaming) & [Axios](https://axios-http.com/) (for REST)

## 📦 Getting Started

### Prerequisites
-   Node.js 20.x or higher


### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd docu-mind-fe
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Development

Run the development server:

```bash
npm run dev