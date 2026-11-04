import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import Ajv from 'ajv';
import standaloneValidate from '../src/generated/validate-foundation.js';
const schema = JSON.parse(
  readFileSync(new URL('../schema/foundation-state.schema.json', import.meta.url)),
);
const cases = JSON.parse(readFileSync(new URL('../fixtures/cases.json', import.meta.url)));
const validate = new Ajv({ strict: true }).compile(schema);
for (const fixture of cases)
  test(fixture.name, () => {
    assert.equal(validate(fixture.value), fixture.valid);
    assert.equal(standaloneValidate(fixture.value), fixture.valid);
  });
