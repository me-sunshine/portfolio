# Maintenance, backup and recovery

## What you own and where it lives

| Thing | Where | Account |
|---|---|---|
| Website code and all content | <https://github.com/me-sunshine/portfolio> | Your GitHub |
| Prototype code | <https://github.com/me-sunshine/ops-assistant> | Your GitHub |
| Public website | Cloudflare, project `rashmi-singh` | Your Cloudflare |
| Content editor | app.pagescms.org, signed in through GitHub | Your GitHub |

No account, password or key belongs to anyone else. There are no secrets stored in either repository.

## Routine maintenance

| How often | What to do |
|---|---|
| When something changes | Update content in the editor: new role, certificate, project or CV |
| Every few months | Open the live site and click through each tab. Check the CV download and the contact links |
| Twice a year | Update the site's software (below) |
| Once a year | Sign in to Cloudflare and GitHub to confirm the accounts are active and the free plans are unchanged |

## How publishing works

1. A change is saved to the `main` branch on GitHub, by the editor or by hand.
2. Cloudflare runs `npm run build`, which turns the content files into web pages in a `dist` folder.
3. Cloudflare publishes that folder. This takes about three minutes.

If a build fails, the previous version of the site stays online. To see why it failed, open the project in the Cloudflare dashboard and look at the latest build log.

## Backup

GitHub already keeps every version of every file. For a copy on your own computer:

1. Open <https://github.com/me-sunshine/portfolio>.
2. Choose **Code**, then **Download ZIP**.
3. Store the ZIP somewhere safe. Repeat after large updates.

Do the same for `ops-assistant`. The ZIP contains everything needed to rebuild the site anywhere.

## Recovery

| Problem | What to do |
|---|---|
| A change looks wrong | Revert it on GitHub. See "Restore a previous version" in the editor manual |
| The site shows an old version | Check the latest build in Cloudflare. If it failed, revert the last change |
| The site is down but Cloudflare reports no problem | Open the Cloudflare project and choose to redeploy the last successful build |
| You lose access to Cloudflare | Create a new account and deploy the repository again. See "Move to another host" |
| You lose access to GitHub | Use GitHub's account recovery. Your ZIP backup lets you start a new repository if needed |

## Updating the site's software

This needs Node.js on your computer and a few commands. It is optional: the site keeps working without updates.

```bash
npm update
```

```bash
npm run build
```

If the build finishes without errors, save the changed `package.json` and `package-lock.json` to GitHub. If it fails, discard the change and leave the versions as they are.

## Move to another content editor

The content is ordinary Markdown and YAML files in the `content` folder. Any editor that works on files in a Git repository can use them.

- **Decap CMS** (MIT licence) is the closest alternative. It needs a configuration file describing the same fields as `.pages.yml`, and a small sign-in service.
- **GitHub's own web editor** needs no setup at all.

Moving editors does not require changing the content files or the website.

## Move to another host

The site is plain static files, so it runs on any static hosting service.

- **GitHub Pages:** in the repository, open Settings, then Pages, and choose GitHub Actions with the Astro workflow GitHub suggests. Change `url` in Site settings to the new address.
- **Netlify or similar:** connect the repository, build command `npm run build`, output folder `dist`.

The file `wrangler.jsonc` is only used by Cloudflare and can be left in place.

## Using your own domain

Optional, and the only part of this project that would cost money (roughly 10 to 15 euros a year for a domain). After buying a domain, add it to the project in the Cloudflare dashboard, then change `url` in Site settings.
