// scripts/generate_dom_json.js
// Generates a JSON representation of the rendered DOM for each built page using Puppeteer.
// Output written to project root as dom_panel.json.

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [
  { name: 'index', file: path.resolve(__dirname, '..', 'dist', 'index.html') },
  { name: 'solar-calculator', file: path.resolve(__dirname, '..', 'dist', 'solar-calculator.html') },
  { name: 'residential-solar', file: path.resolve(__dirname, '..', 'dist', 'residential-solar.html') },
  { name: 'commercial-solar', file: path.resolve(__dirname, '..', 'dist', 'commercial-solar.html') },
  { name: 'industrial-solar', file: path.resolve(__dirname, '..', 'dist', 'industrial-solar.html') },
  { name: 'pm-surya-ghar-yojana', file: path.resolve(__dirname, '..', 'dist', 'pm-surya-ghar-yojana.html') },
  { name: 'solar-amc', file: path.resolve(__dirname, '..', 'dist', 'solar-amc.html') },
  { name: 'privacy-policy', file: path.resolve(__dirname, '..', 'dist', 'privacy-policy.html') },
  { name: 'terms', file: path.resolve(__dirname, '..', 'dist', 'terms.html') }
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const result = {};

  for (const p of pages) {
    if (!fs.existsSync(p.file)) {
      console.warn(`File not found: ${p.file}`);
      continue;
    }

    const page = await browser.newPage();
    await page.goto('file://' + p.file);
    await new Promise(res => setTimeout(res, 500));

    const dom = await page.evaluate(() => {
      // Serialize a DOM node recursively inside browser context
      function serialize(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const obj = { tag: node.tagName.toLowerCase() };
          const attrs = {};
          for (const a of node.attributes) attrs[a.name] = a.value;
          if (Object.keys(attrs).length) obj.attributes = attrs;
          const children = [];
          for (const child of node.childNodes) {
            const childObj = serialize(child);
            if (childObj !== null) children.push(childObj);
          }
          if (children.length) obj.children = children;
          return obj;
        } else if (node.nodeType === Node.TEXT_NODE) {
          const txt = node.textContent.trim();
          return txt ? { text: txt } : null;
        } else if (node.nodeType === Node.COMMENT_NODE) {
          const cmt = node.textContent.trim();
          return cmt ? { comment: cmt } : null;
        }
        return null;
      }

      return serialize(document.body);
    });

    result[p.name] = dom;
    await page.close();
  }

  await browser.close();
  const outPath = path.resolve(__dirname, '..', 'dom_panel.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log('DOM JSON written to', outPath);
})();
