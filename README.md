# TechPath.ai

Your tech career guide for Pakistan. Pick a field, plan your semesters, choose a final-year project, find universities and scholarships, and prepare to study abroad.

Built for the **Hacktoberfest Hack Day Lahore** competition, in two categories:
- **Best Use of Gemma 4.** Gemma 4 reads text and result-card images, and helps students learn, plan and build. It runs through the Gemini API and through Ollama.
- **Best Open-Source AI Project.** The source code is public under the MIT license. The AI guidance is packaged as an agent skill that follows the Agent Skill open format (`skills/techpath-advisor/SKILL.md`), and it works with an open-weight model run locally through Ollama.

## Features

- **Home:** search across fields, courses, universities, scholarships and countries
- **Roadmaps:** six tech fields, stage by stage, with skills, projects, job roles and a text download
- **Courses:** about 40 tech courses across programming, web, data, AI, cloud, security, mobile, game development and interview prep, with official documentation links
- **Compare:** two fields side by side
- **FYP:** a checklist with progress, AI project ideas and AI proposal feedback
- **Universities:** starter list across Pakistan, filtered by province, type and city
- **Scholarships:** official starting points
- **Study abroad:** checklists for Canada, the UK, Germany and Malaysia
- **AI Advisor:** questions, a personal six-month plan, and a choice of **Gemma 4 (Gemini API)** or **Ollama (local Gemma)**
- **Result card reader:** upload a matric or intermediate card and get field suggestions

## Run it

No install is needed for the page itself.

1. Open this folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **Open with Live Server**, or click **Go Live**.

You can also double-click `index.html`. The page works, but Live Server is more reliable.

## Set up the AI

**Gemma 4 through the Gemini API (cloud)**
1. Get a free key from Google AI Studio.
2. Open the **AI Advisor** tab, choose **Gemma 4 (Gemini API)**, open **AI setup**, paste the key and confirm the model ID.

**Ollama (Gemma on your computer)**
1. Install Ollama from ollama.com.
2. Download a Gemma model: `ollama pull gemma3`
3. Start Ollama and allow the browser to connect. Windows PowerShell: `$env:OLLAMA_ORIGINS="*"; ollama serve`. macOS or Linux: `OLLAMA_ORIGINS="*" ollama serve`
4. In the **AI Advisor** tab, choose **Ollama (local Gemma)**. The default address is `http://localhost:11434`.

Your Gemini key is kept only in the page. It is never saved or sent anywhere except Google's API.

## Publish a free live link (GitHub Pages)

1. Create a public GitHub repository named `TechPath.ai`.
2. Upload every file in this folder, or push with git.
3. Go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
4. The site will be live at `https://<your-username>.github.io/TechPath.ai/`.

Add the `hacktoberfest` topic to the repository for the Hacktoberfest contribution period.

## Update the content

Edit `js/data.js`. Universities and scholarships start as "needs verification". Mark an entry as verified and add the date only after you have checked the official source.

## Files

```
index.html                       The page
js/data.js                       All content: roadmaps, courses, universities, scholarships, checklists
js/app.js                        Page logic, Gemma and Ollama calls
skills/techpath-advisor/SKILL.md Agent skill that guides the AI
LICENSE                          MIT license
```

## Contribute

Anyone can help. Good first contributions:
- verify a university or scholarship against its official site
- add a course or a country checklist to `js/data.js`
- improve a roadmap stage

## Disclaimer

TechPath.ai is a starting point, not official advice. Confirm fees, deadlines, eligibility and visa rules on official websites.

## License

MIT. See `LICENSE`.
