import { readFile, writeFile, mkdir } from 'node:fs/promises';
import Ajv from 'ajv';
import standaloneCode from 'ajv/dist/standalone/index.js';
const schema = JSON.parse(
  await readFile(new URL('../schema/foundation-state.schema.json', import.meta.url), 'utf8'),
);
const ajv = new Ajv({ strict: true, allErrors: true, code: { source: true, esm: true } });
const validate = ajv.compile(schema);
const directory = new URL('../src/generated/', import.meta.url);
await mkdir(directory, { recursive: true });
await writeFile(
  new URL('validate-foundation.js', directory),
  '// Generated from the canonical schema. Do not edit.\n' + standaloneCode(ajv, validate) + '\n',
);
await writeFile(
  new URL('validate-foundation.d.ts', directory),
  "// Generated from the canonical schema. Do not edit.\nimport type { FoundationState } from './foundation-state';\ndeclare const validate: (value: unknown) => value is FoundationState;\nexport default validate;\n",
);
