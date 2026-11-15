import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import { parse } from 'yaml';

// The public address of the site is content, not code: edit "url" in content/site.yml.
const site = parse(fs.readFileSync('./content/site.yml', 'utf8')) ?? {};

export default defineConfig({
  site: site.url || undefined,
  trailingSlash: 'always',
  build: { format: 'directory' },
});
