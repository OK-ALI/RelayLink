const { AndroidConfig, withAndroidManifest } = require('expo/config-plugins');

// Keep one router root while React Native handles updated accessibility metrics.
module.exports = function withFontScale(config) {
  return withAndroidManifest(config, (result) => {
    const activity = AndroidConfig.Manifest.getMainActivityOrThrow(result.modResults);
    const changes = new Set((activity.$['android:configChanges'] || '').split('|').filter(Boolean));
    changes.add('fontScale');
    changes.add('density');
    activity.$['android:configChanges'] = [...changes].join('|');
    return result;
  });
};
