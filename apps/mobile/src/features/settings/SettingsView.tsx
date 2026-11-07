import type { ComponentRef } from 'react';
import { useRef, useState } from 'react';
import {
  Modal,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextStyle,
} from 'react-native';
import {
  settings,
  themes,
  typography,
  type Theme,
  type ThemeId,
  type TypographyId,
  type MotionMode,
} from '@relay-link/design-tokens';
import { Button, PrecisionSlider, Toggle } from '../../ui/Controls';
import { Feedback } from './Feedback';

type Props = {
  palette: Theme;
  body: TextStyle;
  heading: TextStyle;
  searchable: boolean;
  query: string;
  setQuery: (value: string) => void;
  theme: ThemeId;
  setTheme: (value: ThemeId) => void;
  reduced: boolean;
  setReduced: (value: boolean) => void;
  osReduced: boolean;
  mode: MotionMode;
  setMode: (value: MotionMode) => void;
  font: TypographyId;
  previewFont: (id: TypographyId) => void;
  fontStatus: string;
};
export function SettingsView(p: Props) {
  const { palette: t, body, heading } = p;
  const [picker, setPicker] = useState(false);
  const [study, setStudy] = useState(false);
  const [studyPrecision, setStudyPrecision] = useState(40);
  const [filter, setFilter] = useState('');
  const [previous, setPrevious] = useState<string[]>([]);
  const trigger = useRef<ComponentRef<typeof View>>(null);
  const item = settings.find((s) => s.id === p.query) ?? settings[0];
  const matches = settings.filter((s) =>
    `${s.title} ${s.keywords}`.toLowerCase().includes(filter.toLowerCase()),
  );
  const closePicker = () => {
    Keyboard.dismiss();
    setPicker(false);
    trigger.current?.focus();
  };
  const select = (id: string) => {
    if (id !== item.id) setPrevious((v) => [...v, item.id]);
    p.setQuery(id);
    closePicker();
  };
  const buttonProps = { palette: t, body };
  return (
    <View>
      {p.searchable && (
        <Pressable
          ref={trigger}
          accessibilityRole="button"
          accessibilityLabel="Jump to Section"
          accessibilityHint={`Current section: ${item.title}`}
          onPress={() => {
            setFilter('');
            setPicker(true);
          }}
          style={[s.jump, { backgroundColor: t.surface, borderColor: t.muted }]}
        >
          <Text style={[body, s.small]}>Jump to Section</Text>
          <Text style={[body, s.small, { color: t.accent }]}>⌄</Text>
        </Pressable>
      )}
      <View style={s.sectionHeader}>
        <Text style={[body, s.caption, { color: t.muted }]}>
          ON THIS PHONE · {String(settings.indexOf(item) + 1).padStart(2, '0')} / 05
        </Text>
      </View>
      {previous.length > 0 && (
        <Button
          label="Back to previous section"
          {...buttonProps}
          onPress={() => {
            p.setQuery(previous.at(-1)!);
            setPrevious((v) => v.slice(0, -1));
          }}
        />
      )}
      <Text accessibilityRole="header" style={[heading, s.h2]}>
        {item.title}
      </Text>
      <Text style={[body, s.note, { color: t.muted }]}>{item.description}</Text>
      {item.id === 'appearance' && (
        <>
          <Text style={[heading, s.h3]}>Color theme</Text>
          {Object.entries(themes).map(([id, palette]) => (
            <Pressable
              key={id}
              accessibilityRole="button"
              accessibilityLabel={palette.name}
              accessibilityState={{ selected: p.theme === id }}
              onPress={() => p.setTheme(id as ThemeId)}
              style={({ pressed }) => [
                s.theme,
                {
                  borderColor: p.theme === id ? t.accent : t.elevated,
                  backgroundColor: p.theme === id ? t.surface : 'transparent',
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View style={[s.swatch, { backgroundColor: palette.accent }]} />
              <Text style={[body, s.small, { flex: 1 }]}>{palette.name}</Text>
              <Text style={[body, s.caption, { color: t.accent }]}>
                {p.theme === id ? '✓' : ''}
              </Text>
            </Pressable>
          ))}
          <View style={[s.divider, { borderColor: t.elevated }]} />
          <Text style={[heading, s.h3]}>Typography comparison</Text>
          <Text style={[body, s.note, { color: t.muted }]}>
            Session-only review. A remains the default. No candidate is permanently adopted.
          </Text>
          {Object.entries(typography).map(([id, type]) => (
            <Button
              key={id}
              label={`${type.label} · ${type.detail}`}
              selected={p.font === id}
              onPress={() => p.previewFont(id as TypographyId)}
              {...buttonProps}
            />
          ))}
          <Text
            accessibilityLiveRegion="polite"
            testID="font-status"
            style={[body, s.note, { color: t.muted }]}
          >
            {p.fontStatus}
          </Text>
          <Text style={[body, s.small]}>Relay Link · Il1 O0 · 0123456789 · 4%</Text>
        </>
      )}
      {item.id === 'motion' && (
        <>
          <Toggle
            label="Reduce motion"
            checked={p.reduced}
            onChange={p.setReduced}
            {...buttonProps}
          />
          <Text style={[body, s.note, { color: t.muted }]}>
            System Reduced Motion: {p.osReduced ? 'On' : 'Off'}. System preference always takes
            priority.
          </Text>
          <Text style={[heading, s.h3]}>Animation quality</Text>
          {(['performance', 'balanced', 'enhanced'] as const).map((m) => (
            <Button
              key={m}
              label={m}
              selected={p.mode === m}
              onPress={() => p.setMode(m)}
              {...buttonProps}
            />
          ))}
          <Text style={[body, s.note, { color: t.muted }]}>
            Performance removes movement. Balanced uses brief transitions. Enhanced adds settling
            time. Actions respond immediately.
          </Text>
        </>
      )}
      {item.id === 'feedback' && <Feedback {...buttonProps} />}
      {item.id === 'privacy' && (
        <>
          <Text style={[body, s.small, { color: t.accent }]}>
            No devices have permission to control this PC.
          </Text>
          {[
            ['Remote access', 'Off'],
            ['Authorized devices', '0'],
            ['Windows control', 'Unavailable'],
          ].map(([label, value]) => (
            <View key={label} style={[s.row, { borderColor: t.elevated }]}>
              <Text style={[body, s.small, { color: t.muted }]}>{label}</Text>
              <Text style={[body, s.small]}>{value}</Text>
            </View>
          ))}
          <Text style={[body, s.note, { color: t.muted }]}>
            Pairing and control are unavailable. Demonstrations do not enable access.
          </Text>
        </>
      )}
      {item.id === 'about' && (
        <>
          <Text style={[body, s.small]}>0.1 · Foundation · Phase 0 complete · 4%</Text>
          <Text style={[body, s.note, { color: t.muted }]}>
            Linked Path is the approved symbol direction. Production artwork, typography and
            signature sound remain under review.
          </Text>
          <Button label="Open component study" onPress={() => setStudy(true)} {...buttonProps} />
        </>
      )}
      <Text style={[body, s.note, { color: t.muted }]}>Preferences last for this session.</Text>
      <Modal visible={picker} transparent animationType="none" onRequestClose={closePicker}>
        <KeyboardAvoidingView
          style={s.backdrop}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View
            accessibilityViewIsModal
            style={[s.sheet, { backgroundColor: t.canvas, borderColor: t.muted }]}
          >
            <Text accessibilityRole="header" style={[heading, s.h2]}>
              Jump to Section
            </Text>
            <TextInput
              underlineColorAndroid="transparent"
              cursorColor={t.accent}
              selectionColor={`${t.accent}40`}
              accessibilityLabel="Search settings"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Find a section or keyword"
              placeholderTextColor={t.muted}
              value={filter}
              onChangeText={setFilter}
              style={[body, s.search, { borderColor: t.muted }]}
            />
            <ScrollView keyboardShouldPersistTaps="handled">
              {matches.map((entry) => (
                <Button
                  key={entry.id}
                  label={entry.title}
                  selected={entry.id === item.id}
                  onPress={() => select(entry.id)}
                  {...buttonProps}
                />
              ))}
              {!matches.length && (
                <Text accessibilityLiveRegion="polite" style={[body, s.note]}>
                  No settings found.
                </Text>
              )}
            </ScrollView>
            <Button label="Close section picker" onPress={closePicker} {...buttonProps} />
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Modal
        visible={study}
        transparent
        animationType="none"
        onRequestClose={() => setStudy(false)}
      >
        <KeyboardAvoidingView
          style={s.backdrop}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View
            accessibilityViewIsModal
            style={[s.sheet, { backgroundColor: t.canvas, borderColor: t.muted }]}
          >
            <ScrollView keyboardShouldPersistTaps="handled">
              <Text accessibilityRole="header" style={[heading, s.h2]}>
                Component study
              </Text>
              <Text style={[body, s.note, { color: t.muted }]}>
                Local demonstrations. No device or control actions.
              </Text>
              <Button label="Primary action" primary onPress={() => {}} {...buttonProps} />
              <Button label="Secondary action" onPress={() => {}} {...buttonProps} />
              <Button label="Unavailable" disabled onPress={() => {}} {...buttonProps} />
              <Button label="Loading… · state study" onPress={() => {}} {...buttonProps} />
              <Button
                label="Pressed · state study"
                studyState="pressed"
                onPress={() => {}}
                {...buttonProps}
              />
              <Button
                label="Focus · state study"
                studyState="focus"
                onPress={() => {}}
                {...buttonProps}
              />
              <TextInput
                underlineColorAndroid="transparent"
                cursorColor={t.accent}
                selectionColor={`${t.accent}40`}
                accessibilityLabel="Study device label"
                defaultValue="This PC"
                style={[body, s.search, { borderColor: t.muted }]}
              />
              <TextInput
                underlineColorAndroid="transparent"
                cursorColor={t.accent}
                selectionColor={`${t.accent}40`}
                accessibilityLabel="Invalid label · error demonstration"
                style={[body, s.search, { borderColor: t.accent, borderWidth: 2 }]}
              />
              <Text style={[body, s.note, { color: t.accent }]}>
                Enter a label. Error state demonstration.
              </Text>
              <Toggle
                label="Study switch"
                checked={p.reduced}
                onChange={p.setReduced}
                {...buttonProps}
              />
              <Text style={[body, s.small]}>Precision slider · {studyPrecision}%</Text>
              <PrecisionSlider
                label="Study precision slider"
                value={studyPrecision}
                onChange={setStudyPrecision}
                palette={t}
              />
              <View style={[s.row, { borderColor: t.elevated }]}>
                <Text style={[body, s.small]}>This PC</Text>
                <Text style={[body, s.small, { color: t.muted }]}>Remote access off</Text>
              </View>
            </ScrollView>
            <Button label="Close study" onPress={() => setStudy(false)} {...buttonProps} />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
const s = StyleSheet.create({
  jump: {
    minHeight: 52,
    padding: 14,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  sectionHeader: { marginTop: 24, marginBottom: 12 },
  caption: { fontSize: 12, lineHeight: 20, letterSpacing: 0.4 },
  h2: { fontSize: 23, lineHeight: 30 },
  h3: { fontSize: 17, lineHeight: 25, marginBottom: 12 },
  small: { fontSize: 14, lineHeight: 22 },
  note: { fontSize: 13, lineHeight: 22, marginTop: 8, marginBottom: 20 },
  theme: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  swatch: { width: 16, height: 16, borderRadius: 8 },
  divider: { borderTopWidth: 1, marginVertical: 24 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 48,
    borderBottomWidth: 1,
    gap: 12,
  },
  search: {
    minHeight: 52,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 12,
    fontSize: 14,
  },
  backdrop: { flex: 1, backgroundColor: '#0009', justifyContent: 'flex-end', paddingTop: 64 },
  sheet: {
    maxHeight: '90%',
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 32,
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
  },
});
