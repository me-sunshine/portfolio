# Content editor manual

How to update the website without a developer or an AI assistant. Everything here uses your own GitHub and Cloudflare accounts.

> Status: written from the Pages CMS documentation. Button names may differ slightly from what you see. Screenshots will be added after the first sign-in.

## The short version

You edit content at <https://app.pagescms.org>. Saving creates a change in your GitHub repository. Cloudflare notices the change and republishes the website in about three minutes.

## Log in

1. Go to <https://app.pagescms.org>.
2. Choose **Sign in with GitHub** and sign in as `me-sunshine`.
3. The first time only: install the Pages CMS GitHub App, choose **Only select repositories** and pick `portfolio`.
4. Open the `portfolio` repository.

Only people who can sign in to your GitHub account, or whom you invite, can edit. There is no separate password to remember.

## What each menu entry controls

| Menu entry | What it changes on the site |
|---|---|
| Profile | Name, headline, introduction, photo, email, links, CV, About text, career objectives, key figures, languages, awards, volunteering |
| Site settings | Site title, search description, public address, order of home page sections |
| Skills | Skill categories and the skills in each |
| Certifications | Certifications with issuer, date and credential link |
| Experience | One entry per role |
| Education | One entry per qualification |
| Projects | One entry per project, each with its own page |
| AI case studies | One entry per case study, each with the same thirteen sections |
| Articles and Lab notes | Articles shown in the AI Lab |
| Media | Uploaded images and files |

## Add a new project

1. Open **Projects** and choose **Add an entry**.
2. Fill in the title and short description. These are required.
3. Fill in the problem, your contribution, outcomes and technologies. Leave any field empty to leave that part out of the page.
4. Set **Order**. Lower numbers appear first.
5. Leave **Published** switched on, or switch it off to keep the project as a draft.
6. Save.

## Add a future AI case study

1. Open **AI case studies** and choose **Add an entry**.
2. Work through the numbered fields, 1 to 13. They match the sections of the published page. Empty sections are skipped.
3. Upload a preview image and screenshots if you have them.
4. Switch on **Feature on the home page** if this should replace the current featured case study. Switch it off on the old one.
5. Save.

## Edit professional experience

1. Open **Experience** and select the role.
2. Change the text. Dates use the format `YYYY-MM`, for example `2024-08`. Leave **End** empty for a current role.
3. Save. Roles are always shown newest first, based on the start date.

## Upload images

- In any image field, choose the field and upload from your computer, or pick an image already uploaded.
- In a rich-text field, use the image button in the toolbar.
- Images are stored in `public/media/images`. Keep photos under about 500 KB so pages stay fast.

## Update your CV

1. Open **Profile**.
2. In **CV (PDF)**, upload the new PDF.
3. Save. The "Download CV" links now point to the new file.

To hide the download link, clear the field and save.

The CV itself is produced from `cv-source/rashmi-singh-cv.html`. Edit the text there, open the file in Chrome, choose Print, then Save as PDF (A4, no headers and footers).

## Publish and unpublish

Every entry has a **Published** switch.

- Off: the entry disappears from the website but stays in the editor.
- On: it appears again.

If you unpublish everything in a section, that section, and its tab if it has one, disappears by itself. Nothing breaks.

## Save a draft

Create the entry with **Published** switched off. Edit it over as many sessions as you like, then switch it on.

## Preview a change before it goes public

Pages CMS has no built-in preview. Two ways to check a change first:

- **Draft entry:** keep **Published** off, and ask someone you trust to read the text in the editor.
- **Preview branch:** in Pages CMS, switch from the `main` branch to another branch and edit there. This needs a preview build set up in Cloudflare and has not been tested yet.

For small text changes it is usually simplest to publish and check the live site three minutes later. Any change can be undone, as described below.

## Change the order of sections

- **Home page:** open **Site settings** and drag the entries in **Home page sections**. Remove an entry to hide that section.
- **Projects and case studies:** change the **Order** number.
- **Experience and education:** ordered by date automatically.

## Remove old information

Open the entry and choose **Delete**. Prefer switching **Published** off if you might want it back.

## Restore a previous version

Every save is recorded by GitHub, so nothing is lost.

1. Go to <https://github.com/me-sunshine/portfolio/commits/main>.
2. Find the change you want to undo. Each one is named after the file it changed.
3. Open it, choose the three-dot menu, then **Revert**. Confirm.

The site republishes with the old version in about three minutes.

To recover one deleted file: open the change that deleted it, choose **View file** on the version before, copy the text, and create the entry again.

## If Pages CMS is unavailable

Pages CMS is a free service run by someone else and may change or close. Your content does not depend on it.

- Open <https://github.com/me-sunshine/portfolio/tree/main/content>.
- Select a file, choose the pencil icon, edit, and choose **Commit changes**.

The files are plain text. The part between the two `---` lines holds the fields; the text below it is the description.
