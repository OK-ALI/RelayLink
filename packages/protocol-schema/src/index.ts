import validate from './generated/validate-foundation.js';
import type { FoundationState } from './generated/foundation-state';
export type { FoundationState };
export function parseFoundationState(value: unknown): FoundationState {
  if (!validate(value)) throw new Error('Invalid or unsafe foundation state');
  return value;
}
export const localFoundation = parseFoundationState({
  application: 'relay-link',
  protocolVersion: 1,
  phase: 0,
  controlEnabled: false,
  capabilities: [],
});
