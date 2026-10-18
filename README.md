# Dhanyatha D: Developer Portfolio

A responsive, single-page portfolio built with **React 18 + Vite 5**. It has no backend, database, authentication or paid APIs. Everything is static and deploys for free.

Sections: Hero (with an interactive leak-detector demo), About, Experience, Projects, Skills, Achievements and activities, Contact.

## 1. Setup

You need [Node.js](https://nodejs.org) 18 or newer (check with `node -v`).

```bash
unzip dhanyatha-portfolio.zip
cd dhanyatha-portfolio
npm install
```

## 2. Run locally

```bash
npm run dev
```

Open the address printed in the terminal (usually http://localhost:5173). The page reloads as you edit files.

## 3. Build for production

```bash
npm run build      # creates the optimized site in dist/
npm run preview    # serves dist/ locally so you can check it
```

## 4. Edit your content

All text lives in **`src/data.js`**: contact details, experience, projects, skills and achievements. Change it there and the page updates.

- Resume file: replace `public/Resume_Dhanyatha_D.pdf` (keep the same name, or update `resume` in `src/data.js`).
- Project links: the "See my GitHub" links point to your GitHub profile. To link a specific repository, add a `link` field to a project in `src/data.js` and use it in `src/App.jsx` (`Projects` component).
- Colors: the variables at the top of `src/styles.css`.
- Fonts load from Google Fonts (see `index.html`). If they cannot load, the page falls back to system fonts.

## 5. Upload to GitHub

1. Create an empty repository on https://github.com/new (for example `portfolio`). Do not add a README there.
2. In the project folder run:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/Dhanyatha555/portfolio.git
git push -u origin main
```

Replace the URL with your own repository URL if the name differs. `node_modules` and `dist` are ignored by `.gitignore`.

## 6. Deploy on Vercel (free)

**Option A: from GitHub (recommended)**

1. Sign in at https://vercel.com with your GitHub account.
2. Click **Add New, then Project**, and import your portfolio repository.
3. Vercel detects Vite automatically. Confirm these values:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy**. Every later `git push` redeploys the site.

**Option B: Vercel CLI**

```bash
npm install -g vercel
vercel          # follow the prompts, accept the detected Vite settings
vercel --prod   # publish to production
```

## Project structure

```
index.html            page shell, meta tags, fonts
public/               favicon and resume PDF (served as-is)
src/main.jsx          React entry
src/App.jsx           page sections
src/LeakDemo.jsx      interactive hero demo
src/data.js           all your content
src/styles.css        design tokens and styles
```

## Notes

- The contact form opens the visitor's email app with the message filled in (a `mailto:` link), so no server is needed.
- Animations are turned off for visitors who set "reduce motion" in their system.
