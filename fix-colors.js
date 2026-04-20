const fs = require('fs');
const path = require('path');

function walk(dir) {
  let files = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (f === 'node_modules' || f === '.next') continue;
    if (fs.statSync(full).isDirectory()) files.push(...walk(full));
    else if (full.endsWith('.tsx')) files.push(full);
  }
  return files;
}

const srcDir = path.join(__dirname, 'src');
const files = walk(srcDir);
let count = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  
  // text-brand-blue (but NOT text-brand-blue-accent, text-brand-blue-dark, text-brand-blue-light)
  content = content.replace(/text-brand-blue(?!-)/g, 'text-heading');
  // text-brand-blue-accent -> text-brand-green  
  content = content.replace(/text-brand-blue-accent/g, 'text-brand-green');
  // bg-brand-blue-accent -> bg-brand-green
  content = content.replace(/bg-brand-blue-accent/g, 'bg-brand-green');
  // border-brand-blue-accent -> border-brand-green
  content = content.replace(/border-brand-blue-accent/g, 'border-brand-green');
  // ring-brand-blue-accent -> ring-brand-green
  content = content.replace(/ring-brand-blue-accent/g, 'ring-brand-green');
  // focus-visible:ring-brand-blue (not -accent/-dark) -> focus-visible:ring-brand-green
  content = content.replace(/focus-visible:ring-brand-blue(?!-)/g, 'focus-visible:ring-brand-green');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    count++;
    console.log('Updated:', path.relative(srcDir, file));
  }
}
console.log(`\nDone! Updated ${count} files.`);
