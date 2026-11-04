import { Pressable, StyleSheet, Text, View, type TextStyle } from 'react-native';
import type { Theme } from '@relay-link/design-tokens';
type Props = {
  palette: Theme;
  body: TextStyle;
  heading: TextStyle;
  onAppearance: () => void;
  onSettings: () => void;
};
export function Overview({ palette: t, body, heading, onAppearance, onSettings }: Props) {
  return (
    <>
      <View style={[s.pc, { backgroundColor: t.surface, borderColor: t.elevated }]}>
        <View style={s.row}>
          <Text style={[heading, s.h2]}>Selected PC</Text>
          <Text style={[body, s.small, { color: t.muted }]}>Not paired</Text>
        </View>
        <Text style={[body, s.note, { color: t.muted }]}>
          No PC selected. Pairing is planned for Phase 1.
        </Text>
        <View style={[s.access, { borderColor: t.elevated }]}>
          <View style={[s.dot, { backgroundColor: t.muted }]} />
          <Text style={[body, s.small]}>Remote access is off</Text>
        </View>
      </View>
      <View style={s.section}>
        <Text accessibilityRole="header" style={[heading, s.h2]}>
          Controls
        </Text>
        <Text style={[body, s.small, { color: t.muted }]}>Not implemented</Text>
      </View>
      {[
        { name: 'PC Controls', detail: 'Pointer and keyboard', phase: 'Phase 3' },
        { name: 'Media', detail: 'Playback and audio', phase: 'Phase 4' },
        { name: 'Relay Decks', detail: 'Configured actions', phase: 'Phase 7' },
        { name: 'Relay Pad', detail: 'Game profiles', phase: 'Phase 8' },
      ].map((item) => (
        <View key={item.name} style={[s.control, { borderColor: t.elevated }]}>
          <View>
            <Text style={[heading, s.controlName]}>{item.name}</Text>
            <Text style={[body, s.small, { color: t.muted }]}>{item.detail}</Text>
          </View>
          <Text style={[body, s.phase, { color: t.muted }]}>Planned · {item.phase}</Text>
        </View>
      ))}
      <Text accessibilityRole="header" style={[heading, s.localTitle]}>
        Application
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Appearance"
        onPress={onAppearance}
        style={[s.action, { borderColor: t.elevated }]}
      >
        <Text style={[body, s.actionText]}>Appearance</Text>
        <Text style={[body, s.small, { color: t.accent }]}>Open →</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Application settings"
        onPress={onSettings}
        style={[s.action, { borderColor: t.elevated }]}
      >
        <Text style={[body, s.actionText]}>Settings</Text>
        <Text style={[body, s.small, { color: t.accent }]}>Open →</Text>
      </Pressable>
    </>
  );
}
const s = StyleSheet.create({
  pc: { padding: 18, borderWidth: 1, borderRadius: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  h2: { fontSize: 17, letterSpacing: -0.3 },
  small: { fontSize: 11, lineHeight: 18 },
  note: { fontSize: 12, lineHeight: 21, marginTop: 10, marginBottom: 18 },
  access: { borderTopWidth: 1, paddingTop: 13, flexDirection: 'row', alignItems: 'center', gap: 9 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  section: {
    marginTop: 28,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  control: {
    borderBottomWidth: 1,
    minHeight: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  controlName: { fontSize: 14, marginBottom: 3 },
  phase: { fontSize: 9, lineHeight: 16 },
  localTitle: { fontSize: 17, marginTop: 28, marginBottom: 8 },
  action: {
    minHeight: 48,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionText: { fontSize: 13 },
});
