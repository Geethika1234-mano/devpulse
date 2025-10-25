# DevPulse

DevPulse is a modern, AI-powered GitHub dashboard for developers. It combines real-time repository analytics, PR review automation, and a beautiful UI to help you manage your GitHub workflow efficiently.

## 🚀 Features

- **🔐 GitHub Login via Firebase Auth**
  - Secure OAuth login with GitHub.
  - Persistent authentication using Firebase.

- **📦 Real-time Repository Dashboard**
  - Fetches and displays your public and private repositories.
  - Shows stars, forks, privacy status, and live PRs for each repo.

- **🧩 Repository Detail View**
  - View detailed analytics and pull requests for any repository.
  - See PR titles, authors, update times, and direct GitHub links.

- **🤖 AI-Powered PR Review**
  - Generate PR review suggestions using OpenAI.
  - Summarize changes and get improvement tips for your PRs.

- **📈 Analytics & Insights**
  - Visualize PR activity, review patterns, and contributor stats with charts.

- **👥 User Profile**
  - View your GitHub avatar, bio, stats, pinned repos, organizations, and recent activity.

- **🎨 Modern UI**
  - Responsive, dark-themed layout built with Tailwind CSS.
  - Includes Navbar, Sidebar, Dashboard, and Profile page.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend/API:** Vercel Serverless Functions
- **Auth:** Firebase + GitHub OAuth
- **Charts:** Recharts
- **AI:** OpenAI GPT-4o (via secure backend API)

## ⚡ Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/devpulse.git
   cd devpulse
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root:
     ```
     VITE_FIREBASE_API_KEY=your_firebase_key
     VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
     VITE_FIREBASE_APP_ID=your_firebase_app_id
     ```
   - **For OpenAI (in Vercel):**
     - Add `OPENAI_API_KEY` in your Vercel project settings (do NOT expose this in `.env` for frontend).

4. **Run locally with Vercel CLI:**
   ```bash
   vercel dev
   ```

5. **Deploy to Vercel:**
   - Push your code to GitHub.
   - Import your repo in Vercel and set environment variables.
   - Deploy!

## 🧑‍💻 Usage

- **Login:** Sign in with your GitHub account.
- **Dashboard:** View and search your repositories, see live PRs.
- **Repo Details:** Click a repo to view PRs and analytics.
- **AI Review:** Click "AI Review Suggestion" on a PR for instant feedback.
- **Profile:** View your GitHub profile, stats, organizations, and activity.

## 📝 Security Notes

- **Never expose your OpenAI API key in frontend code.**
- All OpenAI requests are handled securely via Vercel serverless functions.

## 📄 License

MIT

---

**DevPulse** — Your AI-powered GitHub dashboard!
