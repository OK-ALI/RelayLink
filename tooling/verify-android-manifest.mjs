import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const manifest = await readFile(
  'apps/mobile/android/app/build/intermediates/merged_manifests/debug/processDebugManifest/AndroidManifest.xml',
  'utf8',
);
const permissions = [...manifest.matchAll(/<uses-permission\b[^>]*android:name="([^"]+)"/g)].map(
  (m) => m[1],
);
for (const forbidden of [
  'RECORD_AUDIO',
  'FOREGROUND_SERVICE',
  'FOREGROUND_SERVICE_MEDIA_PLAYBACK',
  'FOREGROUND_SERVICE_MICROPHONE',
  'READ_MEDIA_IMAGES',
  'READ_MEDIA_VIDEO',
])
  assert(
    !permissions.includes(`android.permission.${forbidden}`),
    `Unexpected Android permission: ${forbidden}`,
  );
assert(
  !/expo\.modules\.audio\.service\.(AudioControlsService|AudioRecordingService)/.test(manifest),
  'Preview must not declare background audio services',
);
assert(permissions.includes('android.permission.VIBRATE'));
assert(
  /android:configChanges="[^"]*\bfontScale\b/.test(manifest),
  'Text scaling must update the existing React Native activity',
);
const apk = await readFile('apps/mobile/android/app/build/outputs/apk/debug/app-debug.apk');
await mkdir('artifacts-local', { recursive: true });
await writeFile(
  'artifacts-local/v25-android-manifest.json',
  JSON.stringify(
    {
      result: 'PASS',
      permissions,
      backgroundAudioServices: 'absent',
      recordingPermission: 'absent',
      apkSha256: createHash('sha256').update(apk).digest('hex'),
      scope: 'Development APK; inherited Expo developer permissions are not release approval',
    },
    null,
    2,
  ) + '\n',
);
console.log(
  'PASS: actual merged APK manifest excludes recording and background audio services/permissions.',
);
