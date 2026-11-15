# Rashmi Singh: professional portfolio

**Live site: <https://rashmi-singh.rashmissingh97.workers.dev>**

The source of my portfolio website. I am a project and programme manager in Berlin, moving into technology project delivery and the practical use of AI and automation in business operations.

The site presents my professional experience, projects, education and certifications, and an AI & Technology Lab with a working AI implementation case study: the [Intelligent Business Operations Assistant](https://github.com/me-sunshine/ops-assistant).

## How it works

| Part | What it does | Cost |
|---|---|---|
| [Astro](https://astro.build) | Turns the content files into a fast static website | Free, MIT licence |
| `content/` folder | Holds everything I can edit: profile, experience, projects, case studies, articles | Stored in this repository |
| [Pages CMS](https://pagescms.org) | Browser editor for the content, signed in with my GitHub account | Free, MIT licence |
| Cloudflare Workers (static assets) | Hosts the public website and rebuilds it after every change to `main` | Free plan |

No personal information is written into the page code. Every page is generated from the files in `content/` when the site is built, so content can be added, hidden or removed without touching code.

## Editing content

1. Go to <https://app.pagescms.org> and sign in with GitHub.
2. Open this repository and choose what to edit: Profile, Experience, Education, Projects, AI case studies, Certifications, Skills or Articles.
3. Save. The change is committed to this repository and the website rebuilds within a few minutes.

Every entry has a **Published** switch. Switch it off to hide an entry without deleting it.

Content can also be edited directly on GitHub by opening any file under `content/` and choosing the pencil icon. This works even if Pages CMS is unavailable.

## Repository layout

```
content/              all editable content (YAML and Markdown files)
  profile.yml         name, headline, about, links, key figures, languages, awards
  site.yml            site title, public address, home page section order
  skills.yml          skills by category
  certifications.yml  certifications
  experience/         one file per role
  education/          one file per qualification
  projects/           one file per project
  case-studies/       one file per AI case study
  articles/           one file per article or Lab note
public/media/         uploaded images and files (photo, CV, screenshots)
src/                  page templates and styles (rarely needs changing)
.pages.yml            defines the editing screens in Pages CMS
```

## Running it on your own computer

Needs [Node.js](https://nodejs.org) 22 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:4321>. To produce the final site in the `dist` folder:

```bash
npm run build
```

## Licence and reuse

The page templates may be reused. The content, photograph and CV are personal and may not be reused.
