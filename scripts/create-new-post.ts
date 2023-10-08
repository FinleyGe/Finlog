import fs from 'fs';
import path from 'path';

let args = process.argv.slice(2);
// arg: post/[lang]/title.md

let filePath = path.join(process.cwd(), 'docs', args[0]);
let title = args[0].split('/').pop().split('.').shift().split('-').join(' ');

let fileContent =
  `---
post: true
title: ${title}
date: ${new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()}
tags:
  - tag
abstract: abstract
---
`

fs.writeFileSync(filePath, fileContent);
