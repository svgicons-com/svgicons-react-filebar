# Third-party notices

## Lucide SVG artwork

The six files in `assets/icons/` and the corresponding geometry in `src/icons.tsx` are Lucide artwork, distributed through SVGicons. They were not created by Axialis. Local JSX adaptation does not change that authorship or remove the upstream licence conditions.

The catalogue describes the family as ISC. The full upstream snapshot in [licenses/lucide-LICENSE.txt](licenses/lucide-LICENSE.txt) also retains MIT notices for Feather-derived icons. Its list includes `download`, `search`, `upload` and `trash-2`, all used here. We retain the complete snapshot for all six files, including `folder` and `file`.

- Lucide notice: Copyright (c) 2026 Lucide Icons and Contributors.
- Feather notice: Copyright (c) 2013-present Cole Bemis.
- Pinned upstream revision: `70562c1ee1c4fdcf736fe97bc893fb8511927934`.
- [Upstream licence at that revision](https://github.com/lucide-icons/lucide/blob/70562c1ee1c4fdcf736fe97bc893fb8511927934/LICENSE).
- Source URLs, hashes and local transformations: [icon-sources.json](icon-sources.json).

Keep the full licence file with redistributions, including distributions of adapted icon geometry. The MIT licence for the original demo code, Copyright (c) 2026 AXIALIS SA, does not replace these terms or claim ownership of the icon artwork.

## Dependencies

Runtime dependencies are React and React DOM. Development tools include Vite, TypeScript, Playwright and React type definitions. Exact versions and transitive dependencies are in `package-lock.json`. Packages retain their own licence files and notices; they are not relicensed by this example. `node_modules/` and compiled bundles are not part of this source publication package.

| Package or group | Licence declared by the locked packages |
|---|---|
| React 19.3.0, React DOM 19.3.0 and scheduler 0.28.0 | MIT |
| Vite 8.3.4, Rolldown 1.2.13, React type definitions and other MIT-labelled build dependencies | MIT; bundled third-party notices also apply |
| TypeScript 7.0.2, Playwright 1.64.0 and detect-libc 2.1.2 | Apache-2.0 |
| Lightning CSS 1.33.0 and its platform packages | MPL-2.0 |
| picocolors 1.1.1 | ISC |
| source-map-js 1.2.2 | BSD-3-Clause |

This source repository references these dependencies through npm; it does not redistribute their package contents. If distributing a built application or a copy of dependencies, retain the relevant package copyright, licence and NOTICE files, including bundled third-party notices. A built application includes React, React DOM and scheduler; the demo's MIT file alone is not their attribution. Check the redistribution requirements for the exact artifacts being shipped.

## Other resources

The three PNG screenshots are unedited captures of this demonstration and include the same third-party icon artwork; the icon notices above still apply. Sample file names and contents are fictional demonstration data. No external photograph, font file, video or additional icon library is bundled. The CSS names locally available fonts and a system fallback without redistributing font software.
