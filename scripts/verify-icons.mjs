import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const manifest = JSON.parse(readFileSync('icon-sources.json', 'utf8'));
const sha = file => createHash('sha256').update(readFileSync(file)).digest('hex');
assert.equal(manifest.collectionExportPerformed, false);
assert.equal(manifest.icons.length, 6);
assert.equal(new Set(manifest.icons.map(i => i.name)).size, 6);
for (const icon of manifest.icons) {
  assert.equal(sha(icon.file), icon.sha256, icon.name);
  assert.equal(icon.family, 'Lucide');
  assert.match(icon.pageUrl, /^https:\/\/svgicons.com\/icon\/\d+\//);
  const text = readFileSync(icon.file, 'utf8');
  assert.match(text, /viewBox="0 0 24 24"/);
  assert.match(text, /stroke="currentColor"/);
  assert.doesNotMatch(text, /<script|<foreignObject|\bon\w+=|href=|url\(/i);
}
assert.equal(sha(manifest.licenseSnapshot.file), manifest.licenseSnapshot.sha256);
assert.equal(sha(manifest.reactWrapper.file), manifest.reactWrapper.sha256);
const license = readFileSync(manifest.licenseSnapshot.file, 'utf8');
assert.match(license, /ISC License/); assert.match(license, /MIT License/);
console.log('PASS: 6 public SVG hashes, family, viewBoxes, paints, safe markup, license and React wrapper integrity.');
