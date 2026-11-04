import { invoke } from '@tauri-apps/api/core';
import { parseFoundationState } from '@relay-link/protocol-schema';

export type BoundaryResult = 'checking' | 'verified' | 'failed' | 'browser';
export async function verifyNativeBoundary(): Promise<BoundaryResult> {
  if (!('__TAURI_INTERNALS__' in window)) return 'browser';
  try {
    const state = parseFoundationState(await invoke('foundation_status'));
    if (state.controlEnabled) return 'failed';
    for (const command of ['boundary_probe', 'windows_control']) {
      try {
        await invoke(command);
        return 'failed';
      } catch {
        /* Both enrolled-ungranted and nonexistent commands must reject. */
      }
    }
    return 'verified';
  } catch {
    return 'failed';
  }
}
