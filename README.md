# DeCredit - Global On-Chain Credit Scoring

DeCredit is a decentralized credit scoring application that leverages on-chain data to provide a comprehensive credit score. It analyzes transaction history, reputation, and verified identity to generate a credit profile for users in the decentralized ecosystem.

## Features

- **On-Chain Credit Score:** Displays a credit score calculated from various on-chain metrics.
- **Detailed Credit Factors:** Provides a breakdown of the factors contributing to the score, including:
  - Transaction Volume
  - Transaction Frequency
  - DAO Participation
  - DeFi Protocol Usage
  - Verified Identity
- **AI-Powered Simulator:** A credit score simulator that allows users to understand how changes in their on-chain behavior can impact their credit score. This feature is powered by Genkit.
- **Developer API:** Information on how to integrate the DeCredit scoring system into other applications.

## Tech Stack

This project is built with a modern web stack:

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **UI Library:** [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit)

## Getting Started

To run the project locally, follow these steps:

1.  **Install Dependencies:**
    The project dependencies are listed in the `package.json` file. They will be automatically installed.

2.  **Run the Development Server:**
    You can start the development server with the following command:

    ```bash
    npm run dev
    ```

    This will start the app, typically on `http://localhost:9002`.

3.  **Explore the App:**
    Open your browser and navigate to the local URL to see the application in action. Start by exploring the main page at `src/app/page.tsx`.
