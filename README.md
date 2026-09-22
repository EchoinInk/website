<p align="center">
  <img src="https://echoin.ink/github-banner.png" alt="Echo in Ink Banner" width="100%">
</p>

<h1 align="center">Echo in Ink</h1>

<p align="center">
  <strong>Designing the worlds your work lives in.</strong>
</p>

<p align="center">
  Founder-led creative technology studio • Strategy • Design • Development
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white" />
</p>

Echo in Ink is a founder-led creative technology studio combining strategy, design and development.

This repository contains the source code for the official **Echo in Ink** website, showcasing the studio's services, portfolio, and philosophy.

---

## 📚 Table of Contents

- About
- Why Echo in Ink?
- Services
- Tech Stack
- Features
- Project Structure
- Getting Started
- Philosophy
- Website
- Connect
- License

---

## 🌌 Why Echo in Ink?

Echo in Ink was created with the belief that technology should feel human.

Rather than producing generic websites or applications, the studio focuses on building digital experiences that combine thoughtful design, strong engineering, and meaningful storytelling.

---

## ✨ About

Echo in Ink exists at the intersection of creativity and technology.

Echo works with founders, creators and businesses across four connected capabilities:

- Brand & Identity
- Websites & Digital Experiences
- Products & Apps
- Systems & Automation

Engagements take three forms: Strategy Sessions, Digital Reset and Full Projects. Technologies support those capabilities; they are not separate service products.

Every project combines thoughtful design, clean engineering, accessibility, and performance to create products that people genuinely enjoy using.

---

## 🚀 Services

- Brand & Identity
- Websites & Digital Experiences
- Products & Apps
- Systems & Automation

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS, Framer Motion |
| Routing | React Router |
| Tooling | npm, ESLint, Prettier |
| Deployment | Cloudflare Pages |

---

## ✨ Features

- Responsive design
- Accessible user experience
- Fast performance
- Reusable component architecture
- Smooth animations
- SEO-friendly structure
- Optimized for desktop and mobile

---

## 📂 Project Structure

```text
src/
├── assets/
├── components/
├── hooks/
├── layouts/
├── lib/
├── pages/
├── styles/
└── utils/
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/EchoinInk/website.git
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

---

## 💭 Philosophy

Technology should support ideas—not distract from them.

At Echo in Ink, every project is approached with a focus on:

- Clarity
- Storytelling
- Thoughtful design
- Accessibility
- Performance
- Maintainable engineering

The goal isn't simply to build software—it's to create digital experiences that communicate, inspire, and endure.

---

## 🌍 Website

**https://echoin.ink**

## Deployment

Echo in Ink is hosted with Cloudflare Pages. The production build command is `npm run build` and the build output directory is `dist`. The repository's default branch is `main`; confirm that the Cloudflare Pages production-branch setting also uses `main`.

`functions/api/contact.ts` owns `/api/contact` through Pages file-based routing and forwards requests to the shared contact handler. Other application routes continue to use Cloudflare Pages' automatic SPA fallback, so no `_redirects`, `_routes.json`, Worker entry point, or Wrangler configuration is required in this repository.

Configure these bindings for every Cloudflare Pages environment that needs working form delivery:

- `RESEND_API_KEY` as an encrypted secret
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

The `CONTACT_FROM_EMAIL` sender domain must be verified with Resend before live form delivery can succeed. Local Vite preview serves only the built SPA and does not execute Pages Functions.

---

## 📫 Connect

- **Website:** https://echoin.ink
- **GitHub:** https://github.com/EchoinInk

Have a project in mind? We'd love to hear from you.

---

## 📄 License

No standalone licence file is currently included in this repository.

---

<p align="center">
Designed & developed by <strong>Echo in Ink</strong><br>
https://echoin.ink
</p>
