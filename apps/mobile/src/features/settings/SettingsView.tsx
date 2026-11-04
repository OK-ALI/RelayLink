import { Pressable, StyleSheet, Switch, Text, TextInput, View, type TextStyle } from 'react-native';
import { settings, themes, type Theme, type ThemeId } from '@relay-link/design-tokens';
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
};
export function SettingsView({
  palette: t,
  body,
  heading,
  searchable,
  query,
  setQuery,
  theme,
  setTheme,
  reduced,
  setReduced,
}: Props) {
  const matches = settings.filter((item) =>
    `${item.title} ${item.keywords}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <View>
      {searchable && (
        <TextInput
          accessibilityLabel="Search settings"
          placeholder="Find a setting…"
          placeholderTextColor={t.muted}
          value={query}
          onChangeText={setQuery}
          style={[body, s.search, { backgroundColor: t.surface, borderColor: t.elevated }]}
        />
      )}
      {matches.map((item) => (
        <View key={item.id} style={[s.section, { borderColor: t.elevated }]}>
          <Text accessibilityRole="header" style={[heading, s.h2]}>
            {item.title}
          </Text>
          <Text style={[body, s.note, { color: t.muted }]}>{item.description}</Text>
          {item.id === 'appearance' &&
            Object.entries(themes).map(([id, palette]) => (
              <Pressable
                key={id}
                accessibilityRole="button"
                accessibilityState={{ selected: theme === id }}
                onPress={() => setTheme(id as ThemeId)}
                style={[s.theme, { backgroundColor: theme === id ? t.surface : 'transparent' }]}
              >
                <View style={[s.swatch, { backgroundColor: palette.accent }]} />
                <Text style={[body, s.small]}>{palette.name}</Text>
                <Text style={[body, s.selected, { color: t.accent }]}>
                  {theme === id ? 'Selected' : ''}
                </Text>
              </Pressable>
            ))}
          {item.id === 'motion' && (
            <View style={s.row}>
              <Text style={[body, s.small]}>Reduce motion</Text>
              <Switch
                accessibilityLabel="Reduce motion"
                value={reduced}
                onValueChange={setReduced}
                trackColor={{ true: t.accent }}
              />
            </View>
          )}
          {item.id === 'privacy' && (
            <Text style={[body, s.small, { color: t.accent }]}>
              No control capabilities are granted.
            </Text>
          )}
        </View>
      ))}
      {matches.length === 0 && <Text style={[body, s.note]}>No settings found.</Text>}
      <Text style={[body, s.candidate, { color: t.muted }]}>
        Foundation direction approved. Detailed settings and production artwork remain under review.
      </Text>
    </View>
  );
}
const s = StyleSheet.create({
  search: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 13,
    minHeight: 46,
    marginBottom: 8,
  },
  section: { borderBottomWidth: 1, paddingVertical: 20 },
  h2: { fontSize: 17, letterSpacing: -0.3 },
  note: { fontSize: 12, lineHeight: 21, marginTop: 7, marginBottom: 14 },
  small: { fontSize: 12, lineHeight: 20 },
  row: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  theme: {
    minHeight: 46,
    borderRadius: 7,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  swatch: { width: 14, height: 14, borderRadius: 7 },
  selected: { marginLeft: 'auto', fontSize: 9 },
  candidate: { fontSize: 10, lineHeight: 19, marginTop: 22 },
});
