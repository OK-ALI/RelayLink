/* eslint-disable @typescript-eslint/no-require-imports -- Metro requires static asset references for bundled fonts/audio. */
import { useEffect, useRef, useState } from 'react';
import { AppState, Platform, Text, View, type TextStyle } from 'react-native';
import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import { FeedbackPreviewGate, type Theme } from '@relay-link/design-tokens';
import { Button, PrecisionSlider, Toggle } from '../../ui/Controls';

const sources = [
  require('../../../../../packages/design-tokens/assets/chime-a.wav'),
  require('../../../../../packages/design-tokens/assets/chime-b.wav'),
];
export function Feedback({ palette: t, body }: { palette: Theme; body: TextStyle }) {
  const [muted, setMuted] = useState(true);
  const [haptics, setHaptics] = useState(false);
  const [volume, setVolume] = useState(25);
  const [message, setMessage] = useState('Preview muted');
  const gate = useRef(new FeedbackPreviewGate());
  const hapticGate = useRef(new FeedbackPreviewGate());
  const player = useRef<AudioPlayer | null>(null);
  const listener = useRef<{ remove(): void } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const disposePlayer = () => {
    listener.current?.remove();
    listener.current = null;
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    player.current?.remove();
    player.current = null;
  };
  const cancel = () => {
    gate.current.cancel();
    hapticGate.current.cancel();
    disposePlayer();
  };
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state !== 'active') cancel();
    });
    return () => {
      sub.remove();
      cancel();
    };
  }, []);
  const play = async (index: number) => {
    const token = gate.current.begin('demonstration', muted, volume / 100, performance.now());
    if (token === null) {
      setMessage(muted || volume === 0 ? 'Preview muted' : 'Please wait before another preview');
      return;
    }
    try {
      await setAudioModeAsync({
        playsInSilentMode: false,
        shouldPlayInBackground: false,
        interruptionMode: 'mixWithOthers',
        allowsRecording: false,
      });
      if (!gate.current.current(token)) return;
      disposePlayer();
      player.current = createAudioPlayer(sources[index], { updateInterval: 100 });
      listener.current = player.current.addListener('playbackStatusUpdate', (status) => {
        if (!gate.current.current(token)) return;
        if (status.playing) setMessage('Playing demonstration · no connection occurred');
        if (status.didJustFinish) {
          cancel();
          setMessage('Demonstration ended');
        } else if (status.playbackState === 'error') {
          cancel();
          setMessage('Audio preview unavailable');
        }
      });
      player.current.volume = volume / 100;
      player.current.play();
      setMessage('Demonstration requested · no connection occurred');
      timer.current = setTimeout(() => {
        if (gate.current.current(token)) {
          cancel();
          setMessage('Demonstration timed out');
        }
      }, 10000);
    } catch {
      if (gate.current.current(token)) {
        cancel();
        setMessage('Audio preview unavailable');
      }
    }
  };
  return (
    <View>
      <Toggle
        label="Mute demonstration sounds"
        checked={muted}
        onChange={(v) => {
          cancel();
          setMuted(v);
          setMessage(v ? 'Preview muted' : 'Ready for manual demonstration');
        }}
        palette={t}
        body={body}
      />
      <Text style={[body, { fontSize: 14 }]}>Preview volume · {volume}%</Text>
      <PrecisionSlider
        label="Preview volume"
        value={volume}
        onChange={(v) => {
          cancel();
          setVolume(v);
        }}
        palette={t}
      />
      {sources.map((_, i) => (
        <Button
          key={i}
          label={`Demonstrate chime ${i === 0 ? 'A' : 'B'}`}
          onPress={() => void play(i)}
          palette={t}
          body={body}
        />
      ))}
      <Button
        label="Stop preview"
        onPress={() => {
          cancel();
          setMessage('Demonstration stopped');
        }}
        palette={t}
        body={body}
      />
      <Toggle
        label="Enable haptic demonstration"
        checked={haptics}
        onChange={(enabled) => {
          hapticGate.current.cancel();
          setHaptics(enabled);
        }}
        palette={t}
        body={body}
      />
      <Button
        label="Demonstrate selection haptic"
        disabled={!haptics}
        palette={t}
        body={body}
        onPress={() => {
          if (Platform.OS !== 'android') {
            setMessage('Haptic preview requires Android');
            return;
          }
          const token = hapticGate.current.begin('demonstration', !haptics, 1, performance.now());
          if (token === null) return;
          void Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Segment_Tick).then(
            () => {
              if (hapticGate.current.current(token))
                setMessage('Haptic request sent · sensation requires a physical device');
            },
            () => {
              if (hapticGate.current.current(token)) setMessage('Haptic preview unavailable');
            },
          );
        }}
      />
      <Text
        accessibilityLiveRegion="polite"
        style={[body, { fontSize: 13, lineHeight: 22, color: t.muted }]}
      >
        {message}
      </Text>
      <Text style={[body, { fontSize: 13, lineHeight: 22, color: t.muted }]}>
        Manual demonstrations only. System volume and device haptic settings apply. Media playback
        may remain audible during Do Not Disturb.
      </Text>
    </View>
  );
}
