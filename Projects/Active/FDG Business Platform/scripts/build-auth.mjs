import { build } from 'esbuild';
import { writeFileSync } from 'node:fs';
// Keep esbuild's native binary read-only in the protected Documents folder.
const result = await build({ entryPoints: ['account/account.js'], bundle: true, format: 'esm', minify: true, write: false });
writeFileSync(process.argv[2] || 'account/account.bundle.js', result.outputFiles[0].contents);
console.log(`Auth bundle built (${result.outputFiles[0].contents.length} bytes).`);
