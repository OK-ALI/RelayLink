import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, Switch, type TextStyle } from 'react-native';
import Slider from '@react-native-community/slider';
import type { Theme } from '@relay-link/design-tokens';

export function Button({
  label,
  onPress,
  palette: t,
  body,
  selected = false,
  disabled = false,
  primary = false,
  studyState,
}: {
  label: string;
  onPress: () => void;
  palette: Theme;
  body: TextStyle;
  selected?: boolean;
  disabled?: boolean;
  primary?: boolean;
  studyState?: 'pressed' | 'focus';
}) {
  const [focused, setFocused] = useState(false);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={({ pressed }) => [
        s.button,
        {
          borderColor: selected || focused || studyState === 'focus' ? t.accent : t.muted,
          borderWidth: focused || studyState === 'focus' ? 2 : 1,
          backgroundColor: primary
            ? t.accent
            : pressed || studyState === 'pressed'
              ? t.elevated
              : selected
                ? t.surface
                : 'transparent',
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <Text style={[body, s.text, { color: primary ? t.onAccent : t.text }]}>{label}</Text>
    </Pressable>
  );
}
export function Toggle({
  label,
  checked,
  onChange,
  palette: t,
  body,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  palette: Theme;
  body: TextStyle;
}) {
  return (
    <View style={s.row}>
      <Text style={[body, s.text, { flex: 1 }]}>{label}</Text>
      <Switch
        accessibilityLabel={label}
        value={checked}
        onValueChange={onChange}
        trackColor={{ true: t.accent }}
        style={{ minHeight: 48, minWidth: 56 }}
      />
    </View>
  );
}
/** Native drag with a full-row touch and adjustable accessibility target. */
export function PrecisionSlider({
  label,
  value,
  onChange,
  palette: t,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  palette: Theme;
}) {
  const [width, setWidth] = useState(0);
  const update = (next: number) => {
    if (Number.isFinite(next)) onChange(Math.max(0, Math.min(100, Math.round(next))));
  };
  if (Platform.OS === 'web')
    return (
      <input
        aria-label={label}
        aria-valuetext={`${value}%`}
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(event) => update(Number(event.currentTarget.value))}
        style={{ width: '100%', height: 48, margin: 0, accentColor: t.accent }}
      />
    );
  const slider = (
    <Slider
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      style={{ height: 48, width: '100%' }}
      minimumValue={0}
      maximumValue={100}
      step={1}
      value={value}
      onValueChange={update}
      minimumTrackTintColor={t.accent}
      maximumTrackTintColor={t.muted}
      thumbTintColor={t.accent}
    />
  );
  return (
    <Pressable
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: value, text: `${value}%` }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={({ nativeEvent }) => {
        if (nativeEvent.actionName === 'increment') update(value + 1);
        if (nativeEvent.actionName === 'decrement') update(value - 1);
      }}
      onLayout={({ nativeEvent }) => setWidth(nativeEvent.layout.width)}
      onPress={({ nativeEvent }) => {
        if (width > 32) update(((nativeEvent.locationX - 16) / (width - 32)) * 100);
      }}
      style={{ minHeight: 48, justifyContent: 'center' }}
    >
      {slider}
    </Pressable>
  );
}
const s = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 9,
    borderWidth: 1,
    justifyContent: 'center',
    marginVertical: 4,
  },
  text: { fontSize: 14, lineHeight: 22 },
  row: { minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 12 },
});
