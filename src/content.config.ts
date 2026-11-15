// Content model. Every collection reads plain files from /content, which is what the CMS edits.
// Fields are deliberately forgiving: an empty or missing optional field never breaks the build.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.preprocess((v) => (v == null ? '' : v instanceof Date ? v.toISOString().slice(0, 10) : String(v)), z.string());
const list = z.preprocess((v) => (Array.isArray(v) ? v.filter((x) => x != null && x !== '') : []), z.array(z.string()));
const flag = z.preprocess((v) => v !== false && v !== 'false', z.boolean()); // published unless switched off
const order = z.preprocess((v) => (v == null || v === '' ? 100 : Number(v)), z.number());
const links = z.preprocess(
  (v) => (Array.isArray(v) ? v.filter((x) => x && x.url) : []),
  z.array(z.object({ label: text, url: text })),
);
const md = (dir: string) => glob({ pattern: '**/*.md', base: `./content/${dir}` });

export const collections = {
  experience: defineCollection({
    loader: md('experience'),
    schema: z.object({
      title: text, employer: text, employer_short: text, industry: text, location: text,
      start: text, end: text, summary: text, achievements: list, skills: list, published: flag,
    }),
  }),
  education: defineCollection({
    loader: md('education'),
    schema: z.object({ institution: text, qualification: text, location: text, start: text, end: text, coursework: list, published: flag }),
  }),
  projects: defineCollection({
    loader: md('projects'),
    schema: z.object({
      title: text, summary: text, period: text, role: text, problem: text, contribution: text,
      technologies: list, outcomes: list, image: text, links, order, published: flag,
    }),
  }),
  caseStudies: defineCollection({
    loader: md('case-studies'),
    schema: z.object({
      title: text, summary: text, date: text, status_note: text, image: text, image_alt: text, featured: z.preprocess((v) => v === true, z.boolean()),
      overview: text, problem: text, why_it_matters: text, solution: text, requirements: text, architecture: text,
      architecture_diagram: text, workflow: text, tools: text, methodology: text, oversight: text, testing: text,
      results: text, lessons: text, future: text,
      screenshots: z.preprocess(
        (v) => (Array.isArray(v) ? v.filter((x) => x && x.image) : []),
        z.array(z.object({ image: text, caption: text })),
      ),
      links, order, published: flag,
    }),
  }),
  articles: defineCollection({
    loader: md('articles'),
    schema: z.object({ title: text, date: text, summary: text, tags: list, image: text, published: flag }),
  }),
};
