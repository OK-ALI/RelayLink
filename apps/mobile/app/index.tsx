import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Manrope_400Regular, Manrope_600SemiBold } from '@expo-google-fonts/manrope';
import { SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold } from '@expo-google-fonts/space-grotesk';
import { themes, type ThemeId } from '@relay-link/design-tokens';
import { LinkMark } from '../src/ui/LinkMark';
import { Overview } from '../src/features/home/Overview';
import { SettingsView } from '../src/features/settings/SettingsView';

export default function Home() {
  const [page, setPage] = useState<'Home' | 'Appearance' | 'Settings'>('Home');
  const [theme, setTheme] = useState<ThemeId>('amber');
  const [query, setQuery] = useState('');
  const [reduced, setReduced] = useState(false);
  const [fonts] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
  });
  const t = themes[theme];
  const body = { fontFamily: fonts ? 'Manrope_400Regular' : undefined, color: t.text };
  const heading = { fontFamily: fonts ? 'SpaceGrotesk_500Medium' : undefined, color: t.text };
  const navigate = (next: typeof page) => {
    setPage(next);
    setQuery('');
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[s.safe, { backgroundColor: t.canvas }]}>
        <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
        <View style={[s.header, { borderColor: t.elevated }]}>
          <View style={s.brandRow}>
            <LinkMark color={t.accent} size={26} />
            <Text style={[heading, s.brand]}>
              Relay <Text style={{ color: t.accent }}>Link</Text>
            </Text>
          </View>
          <Text style={[body, s.development, { color: t.muted }]}>Development · 0.1</Text>
        </View>
        <ScrollView contentContainerStyle={s.content}>
          <View style={s.heading}>
            <Text accessibilityRole="header" style={[heading, s.title]}>
              {page === 'Home' ? 'Overview' : page}
            </Text>
            <Text style={[body, s.subtitle, { color: t.muted }]}>
              {page === 'Home' ? 'No connected PC' : 'Local application preferences'}
            </Text>
          </View>
          {page === 'Home' ? (
            <Overview
              palette={t}
              body={body}
              heading={heading}
              onAppearance={() => navigate('Appearance')}
              onSettings={() => navigate('Settings')}
            />
          ) : (
            <SettingsView
              palette={t}
              body={body}
              heading={heading}
              searchable={page === 'Settings'}
              query={query}
              setQuery={setQuery}
              theme={theme}
              setTheme={setTheme}
              reduced={reduced}
              setReduced={setReduced}
            />
          )}
          <Text style={[body, s.footer, { color: t.muted }]}>Relay Link · Foundation preview</Text>
        </ScrollView>
        <View style={[s.nav, { backgroundColor: t.canvas, borderColor: t.elevated }]}>
          {(['Home', 'Appearance', 'Settings'] as const).map((label) => (
            <Pressable
              key={label}
              accessibilityRole="button"
              accessibilityState={{ selected: page === label }}
              onPress={() => navigate(label)}
              style={s.navItem}
            >
              <Text style={[body, s.navText, { color: page === label ? t.accent : t.muted }]}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const s = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  brandRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  brand: { fontSize: 22, letterSpacing: -0.8 },
  development: { fontSize: 9 },
  content: { padding: 20, paddingBottom: 22, maxWidth: 620, width: '100%', alignSelf: 'center' },
  heading: { marginBottom: 22 },
  title: { fontSize: 27, lineHeight: 34, letterSpacing: -0.8 },
  subtitle: { fontSize: 11, lineHeight: 18, marginTop: 6 },
  footer: { fontSize: 9, marginTop: 26 },
  nav: {
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 8,
    paddingTop: 6,
  },
  navItem: { minHeight: 46, minWidth: 80, justifyContent: 'center', alignItems: 'center' },
  navText: { fontSize: 11 },
});
