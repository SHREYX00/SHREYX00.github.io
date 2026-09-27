# Shreyash Kshirsagar — Cloud Engineering Portfolio

A modern, minimalist personal portfolio website tailored for an **entry-level Cloud Engineer / MCA student**, featuring an **interactive 3D Three.js cloud network mesh**, subtle 3D card tilt physics, and a **fresh, happy cloudy sky** aesthetic.

---

## 1. Project Structure

```text
Antigravity projects/
├── index.html            # Main semantic HTML5 document (All sections & placeholders)
├── css/
│   └── style.css         # Modern, fresh cloudy design system (CSS variables, layout, responsive)
├── js/
│   ├── three.min.js      # Three.js library (bundled locally for instant offline loading)
│   ├── scene3d.js        # Interactive 3D Cloud Network Mesh & 3D Card Tilt physics
│   └── main.js           # Navigation, category filtering, copy-to-clipboard, contact form
├── assets/
│   ├── resume.pdf        # Your resume file (replace this with your actual PDF)
│   └── favicon.svg       # Custom Cloud & Terminal SVG favicon
└── README.md             # Complete documentation and deployment guide
```

---

## 2. How to Run Locally

You can run this project locally without any complex build steps:

### Option A: VS Code Live Server (Easiest)
1. Open this folder in **VS Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click [`index.html`](file:///d:/MINI%20Project/Antigravity%20projects/index.html) and select **"Open with Live Server"**.

### Option B: Python Local Server
Run in your terminal inside the project directory:
```bash
python -m http.server 3000
```
Then open your browser and navigate to `http://localhost:3000`.

### Option C: Double-click
You can also double-click [`index.html`](file:///d:/MINI%20Project/Antigravity%20projects/index.html) to open it directly in Google Chrome, Edge, or Firefox.

---

## 3. Where to Add Your Resume

1. Save your real resume as a PDF file named `resume.pdf`.
2. Place it in the `assets/` folder:
   ```text
   assets/resume.pdf
   ```
3. The portfolio already has all download buttons pre-configured to point directly to `assets/resume.pdf`.

---

## 4. Where to Add Your GitHub and LinkedIn Profiles

Open [`index.html`](file:///d:/MINI%20Project/Antigravity%20projects/index.html) and search for the following links to insert your URLs:

### GitHub Link
Configured with your personal GitHub URL: `https://github.com/SHREYX00`
- In the **Hero section**
- In the **Projects section** cards
- In the **Contact section**

### LinkedIn Link
Configured with your personal LinkedIn profile URL: `https://www.linkedin.com/in/shreyash-kshirsagar-292452295`
- In the **Hero section**
- In the **Contact section**

### Naukri.com Link
Configured with your Naukri profile URL: `https://www.naukri.com/mnjuser/profile?id=&altresid`
- In the **Hero section**
- In the **Contact section**

### Email Address
Configured with your email: `kshirsagarshreyas89@gmail.com`
- In the **Contact section**
- In [`js/main.js`](file:///d:/MINI%20Project/Antigravity%20projects/js/main.js) to direct the contact form to your inbox.

---

## 5. How to Add New Projects Later

All projects are organized as clean HTML blocks inside [`index.html`](file:///d:/MINI%20Project/Antigravity%20projects/index.html) under the `<div class="projects-grid">` section.

To add a new project, simply copy and paste this template:

```html
<div class="project-card" data-category="cloud" data-tilt-3d>
  <div class="project-top">
    <span class="project-badge">AWS</span>
  </div>
  <h3 class="project-title">Your Project Name</h3>
  <p class="project-desc">
    Brief 2-3 sentence description explaining what problem this solves, architectural decisions, and key outcomes.
  </p>
  <div class="project-tech">
    <span>AWS EC2</span>
    <span>Docker</span>
    <span>Linux</span>
  </div>
  <div class="project-links">
    <a href="https://github.com/your-username/your-repo" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary">
      GitHub
    </a>
    <a href="https://your-live-demo.com" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
      Demo
    </a>
  </div>
</div>
```

> **Categories for filtering:** Set `data-category="cloud"`, `data-category="devops"`, or `data-category="systems"`.

---

## 6. How to Deploy

### Method 1: GitHub Pages (Free & Recommended)
1. Create a new public repository on GitHub (e.g. `shreyash-portfolio` or `shreyash-kshirsagar.github.io`).
2. Initialize Git in this directory:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings** > **Pages**.
4. Under **Source**, select `Deploy from a branch` and choose branch `main` and folder `/ (root)`.
5. Click **Save**. Within 1–2 minutes, your website will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.

### Method 2: Vercel / Netlify (1-Click Deployment)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. Click **"New Project"** and select your GitHub repository.
4. Leave all build settings at default (it is static HTML/CSS/JS).
5. Click **Deploy**. Your site will be live instantly with global CDN and SSL.
