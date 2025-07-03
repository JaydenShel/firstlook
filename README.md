# FirstLook

FirstLook is a simple app I built to help people get quick feedback on their resumes or personal bios. You paste in your text, pick a role (like "software engineer" or "product manager"), and it gives you a short breakdown with scores and whether you're hireable.

It uses OpenAI under the hood to do the analysis and returns structured feedback like:
- A summary of strengths/weaknesses  
- Scores out of 10 for clarity, experience, and impact  
- A final verdict: Yes, No, or Maybe  

---

## Tech Stack

- **Frontend**: React (with Vite) + Tailwind CSS  
- **Backend**: Node.js + Express  
- **AI**: OpenAI GPT-3.5  
- **Hosting**: Planning to use Heroku (free tier)  

---

## How to Run It Locally

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/firstlook.git
cd firstlook
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Set up the backend
```bash
cd server
npm install
```

Then make a `.env` file inside the `server/` folder and add your OpenAI key:
```ini
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Start both servers

Frontend:
```bash
npm run dev
```

Backend (in `/server`):
```bash
node index.js
```

---

## Future Plans

Here's what I'd like to add next:
* 💾 **Save Multiple Resumes** – Let users store, edit, and switch between multiple versions.
* 🔁 **Iterate Feedback** – Ability to ask for a rewrite or refinement based on previous suggestions.
* ✍️ **Cover Letter Mode** – Tailor feedback for cover letters with separate scoring.
* 📊 **Profile Dashboard** – Display past scores and trends for frequent users.
* 📤 **Export to PDF** – Download feedback summaries in a printable format.
* 🔐 **User Accounts** – Optional login to save history and preferences securely.
