import { useEffect, useRef, useState } from 'react';
import { FeedbackPreviewGate } from '@relay-link/design-tokens';
import a from '../../../../../packages/design-tokens/assets/chime-a.wav';
import b from '../../../../../packages/design-tokens/assets/chime-b.wav';
import { Button, Toggle } from '../../components/Controls';

export function Feedback() {
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(25);
  const [message, setMessage] = useState('Preview muted');
  const gate = useRef(new FeedbackPreviewGate());
  const player = useRef<HTMLAudioElement | null>(null);
  const cancel = () => {
    gate.current.cancel();
    player.current?.pause();
    player.current = null;
  };
  useEffect(() => {
    const stop = () => {
      if (document.hidden) cancel();
    };
    document.addEventListener('visibilitychange', stop);
    return () => {
      cancel();
      document.removeEventListener('visibilitychange', stop);
    };
  }, []);
  const play = async (source: string) => {
    const token = gate.current.begin('demonstration', muted, volume / 100, performance.now());
    if (token === null) {
      setMessage(muted || volume === 0 ? 'Preview muted' : 'Please wait before another preview');
      return;
    }
    player.current?.pause();
    const audio = new Audio(source);
    player.current = audio;
    audio.volume = volume / 100;
    audio.onended = () => {
      if (gate.current.current(token)) {
        player.current = null;
        setMessage('Demonstration ended');
      }
    };
    try {
      await audio.play();
      if (!gate.current.current(token)) audio.pause();
      else setMessage('Playing demonstration · no connection occurred');
    } catch {
      if (gate.current.current(token)) setMessage('Audio preview unavailable');
    }
  };
  return (
    <div className="feedback-controls">
      <Toggle
        label="Mute demonstration sounds"
        checked={muted}
        onChange={(v) => {
          cancel();
          setMuted(v);
          setMessage(v ? 'Preview muted' : 'Ready for manual demonstration');
        }}
      />
      <label className="range-label">
        Preview volume <output>{volume}%</output>
        <input
          aria-label="Preview volume"
          type="range"
          min="0"
          max="100"
          step="1"
          value={volume}
          onChange={(e) => {
            cancel();
            setVolume(Number(e.target.value));
          }}
        />
      </label>
      <div className="button-row">
        <Button onClick={() => void play(a)}>Demonstrate chime A</Button>
        <Button onClick={() => void play(b)}>Demonstrate chime B</Button>
        <Button
          onClick={() => {
            cancel();
            setMessage('Demonstration stopped');
          }}
        >
          Stop preview
        </Button>
      </div>
      <p role="status" aria-label="Feedback preview status">
        {message}
      </p>
      <p>
        Only manual previews are enabled. No connection sound is wired. System volume applies; media
        playback may remain audible during Do Not Disturb. Desktop haptics are unavailable.
      </p>
    </div>
  );
}
