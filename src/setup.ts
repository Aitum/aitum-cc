/*
 * WARNING: This is only meant to be run a single time.
 * If it's ran more than once, you may overwrite settings and have to set things up from scratch.
 */

import { existsSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { hostname } from 'os';

console.log('AitumCC Wrapper: Setup');

const targetPath = resolve(__dirname, '..', 'settings.env');

// Already exists check
const alreadyExists = existsSync(targetPath);

if (alreadyExists) {
  console.log('===================== ERROR =====================');
  console.log('You already have an existing settings.env file.');
  console.log('Exiting...');
  process.exit(0);
}

// Generate a new settings file
const blankConfig = `AITUM_CC_ID=${uuidv4()}
AITUM_CC_HOST=Custom Code Wrapper: ${hostname()} 
API_KEY=`;

writeFileSync(targetPath, blankConfig);

console.log('===================== INFO =====================');
console.log('A settings file has been generated at the root of this project called settings.env.');
console.log('You still need to enter your API Key, which can be found within Aitum\'s Settings in app.');
process.exit(0);