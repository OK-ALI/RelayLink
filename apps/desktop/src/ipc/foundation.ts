import { invoke } from '@tauri-apps/api/core';
import { parseFoundationState } from '@relay-link/protocol-schema';

export type BoundaryResult = 'checking' | 'verified' | 'failed' | 'browser';
export function isExpectedBoundaryDenial(command: string, error: unknown): boolean {
  const detail = String(error);
  if (command === 'boundary_probe') {
    return detail.includes('boundary_probe not allowed') && detail.includes('allow-boundary-probe');
  }
  return (
    command === 'windows_control' &&
    detail.includes('windows_control') &&
    detail.includes('Command not found')
  );
}

export async function verifyNativeBoundary(): Promise<BoundaryResult> {
  if (!('__TAURI_INTERNALS__' in window)) return 'browser';
  try {
    const state = parseFoundationState(await invoke('foundation_status'));
    if (state.controlEnabled) return 'failed';
    for (const command of ['boundary_probe', 'windows_control']) {
      try {
        await invoke(command);
        return 'failed';
      } catch (error) {
        if (!isExpectedBoundaryDenial(command, error)) return 'failed';
      }
    }
    return 'verified';
  } catch {
    return 'failed';
  }
}
