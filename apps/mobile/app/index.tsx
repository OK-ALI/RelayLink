import { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Manrope_400Regular, Manrope_600SemiBold } from '@expo-google-fonts/manrope';
import { SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold } from '@expo-google-fonts/space-grotesk';
import { themes, settings, type ThemeId } from '@relay-link/design-tokens';
import { LinkMark } from '../src/ui/LinkMark';

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
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[s.safe, { backgroundColor: t.canvas }]}>
        <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
        <View style={s.header}>
          <Text style={[heading, s.brand]}>
            Relay <Text style={{ color: t.accent }}>Link</Text>
          </Text>
          <View style={[s.badge, { borderColor: t.elevated }]}>
            <Text style={[body, s.tiny]}>FOUNDATION</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={s.content}>
          <Text style={[body, s.eyebrow, { color: t.accent }]}>YOUR PC. IN YOUR HANDS.</Text>
          <Text accessibilityRole="header" style={[heading, s.title]}>
            {page === 'Home' ? 'Closer,\nwherever you sit.' : page}
          </Text>
          <Text style={[body, s.intro, { color: t.muted }]}>
            {page === 'Home'
              ? 'A familiar connection. A new kind of control.'
              : 'A little more you. On both screens.'}
          </Text>
          {page === 'Home' ? (
            <>
              <View style={[s.panel, { backgroundColor: t.surface, borderColor: t.elevated }]}>
                <View style={s.row}>
                  <Text style={[body, s.eyebrow, { color: t.muted }]}>YOUR CONNECTION</Text>
                  <Text style={[body, s.tiny, { color: t.muted }]}>Not paired</Text>
                </View>
                <View style={s.connection}>
                  <Text style={[heading, s.device, { color: t.muted }]}>▱</Text>
                  <View style={[s.line, { backgroundColor: t.elevated }]} />
                  <LinkMark color={t.accent} />
                  <View style={[s.line, { backgroundColor: t.elevated }]} />
                  <Text style={[heading, s.device, { color: t.muted }]}>▯</Text>
                </View>
                <Text style={[heading, s.h2]}>Good things work together.</Text>
                <Text style={[body, s.paragraph, { color: t.muted }]}>
                  Pairing comes in Phase 1. Your PC stays private while we build the foundations.
                </Text>
                <View style={[s.access, { borderColor: t.elevated }]}>
                  <Text style={[body, s.small]}>Remote access is off</Text>
                  <Text style={[body, s.tiny, { color: t.muted }]}>
                    No control capabilities granted
                  </Text>
                </View>
              </View>
              <View style={s.section}>
                <Text style={[heading, s.h2]}>Made for your everyday.</Text>
                <Text style={[body, s.small, { color: t.muted }]}>Built in thoughtful steps.</Text>
              </View>
              <View style={s.grid}>
                {[
                  { name: 'PC Controls', phase: 'Phase 3', symbol: '⌘' },
                  { name: 'Media', phase: 'Phase 4', symbol: '▷' },
                  { name: 'Relay Decks', phase: 'Phase 7', symbol: '▦' },
                  { name: 'Relay Pad', phase: 'Phase 8', symbol: '◇' },
                ].map((item) => (
                  <View
                    key={item.name}
                    style={[s.tile, { backgroundColor: t.surface, borderColor: t.elevated }]}
                  >
                    <Text style={[heading, s.symbol, { color: t.accent }]}>{item.symbol}</Text>
                    <Text style={[heading, s.tileTitle]}>{item.name}</Text>
                    <Text style={[body, s.tiny, { color: t.muted }]}>{item.phase} · Planned</Text>
                  </View>
                ))}
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Explore appearance"
                onPress={() => setPage('Appearance')}
                style={[s.appearance, { borderColor: t.elevated }]}
              >
                <View>
                  <Text style={[heading, s.h2]}>Your expression.</Text>
                  <Text style={[body, s.small, { color: t.muted }]}>
                    Four candidate themes. One family.
                  </Text>
                </View>
                <Text style={[heading, s.arrow, { color: t.accent }]}>↗</Text>
              </Pressable>
            </>
          ) : (
            <View style={[s.panel, { backgroundColor: t.surface, borderColor: t.elevated }]}>
              {page === 'Settings' && (
                <TextInput
                  accessibilityLabel="Search settings"
                  placeholder="Find a setting…"
                  placeholderTextColor={t.muted}
                  value={query}
                  onChangeText={setQuery}
                  style={[body, s.search, { borderColor: t.elevated }]}
                />
              )}
              {settings
                .filter((item) =>
                  `${item.title} ${item.keywords}`.toLowerCase().includes(query.toLowerCase()),
                )
                .map((item) => (
                  <View key={item.id} style={[s.setting, { borderColor: t.elevated }]}>
                    <Text accessibilityRole="header" style={[heading, s.h2]}>
                      {item.title}
                    </Text>
                    <Text style={[body, s.paragraph, { color: t.muted }]}>{item.description}</Text>
                    {item.id === 'appearance' && (
                      <View style={s.themeList}>
                        {Object.entries(themes).map(([id, p]) => (
                          <Pressable
                            key={id}
                            accessibilityRole="button"
                            accessibilityState={{ selected: theme === id }}
                            onPress={() => setTheme(id as ThemeId)}
                            style={[s.theme, { borderColor: theme === id ? t.accent : t.elevated }]}
                          >
                            <View style={[s.swatch, { backgroundColor: p.accent }]} />
                            <Text style={[body, s.small]}>{p.name}</Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
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
              {!settings.some((item) =>
                `${item.title} ${item.keywords}`.toLowerCase().includes(query.toLowerCase()),
              ) && <Text style={[body, s.paragraph]}>No settings found.</Text>}
              <Text style={[body, s.small, { color: t.muted }]}>
                Design candidates await owner review.{' '}
                {Platform.OS === 'web'
                  ? 'Browser preview; native validation is separate.'
                  : 'Android foundation.'}
              </Text>
            </View>
          )}
          <Text style={[body, s.footer, { color: t.muted }]}>CONTROL · CONNECT · PLAY</Text>
        </ScrollView>
        <View style={[s.nav, { backgroundColor: t.canvas, borderColor: t.elevated }]}>
          {(['Home', 'Appearance', 'Settings'] as const).map((label) => (
            <Pressable
              key={label}
              accessibilityRole="button"
              accessibilityState={{ selected: page === label }}
              onPress={() => setPage(label)}
              style={s.navItem}
            >
              <Text style={[body, s.small, { color: page === label ? t.accent : t.muted }]}>
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
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { fontSize: 24, letterSpacing: -1 },
  badge: { borderWidth: 1, borderRadius: 30, paddingHorizontal: 10, paddingVertical: 7 },
  content: { padding: 24, paddingBottom: 28, maxWidth: 600, width: '100%', alignSelf: 'center' },
  eyebrow: { fontSize: 9, letterSpacing: 1.8 },
  tiny: { fontSize: 9 },
  small: { fontSize: 11, lineHeight: 20 },
  title: { fontSize: 38, lineHeight: 44, letterSpacing: -1.6, marginTop: 16 },
  intro: { fontSize: 12, lineHeight: 22, marginTop: 12, marginBottom: 28 },
  panel: { padding: 22, borderWidth: 1, borderRadius: 20 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  connection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 25,
  },
  device: { fontSize: 58 },
  link: { fontSize: 38 },
  line: { height: 1, width: 24 },
  h2: { fontSize: 18, letterSpacing: -0.5 },
  paragraph: { fontSize: 12, lineHeight: 22, marginTop: 8, marginBottom: 18 },
  access: { borderTopWidth: 1, paddingTop: 14, gap: 4 },
  section: { marginTop: 28, marginBottom: 16, gap: 5 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tile: { width: '47.5%', flexGrow: 1, borderWidth: 1, borderRadius: 14, padding: 18 },
  symbol: { fontSize: 27, marginBottom: 20 },
  tileTitle: { fontSize: 15, marginBottom: 8 },
  appearance: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 18,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrow: { fontSize: 25 },
  footer: { fontSize: 8, letterSpacing: 2, textAlign: 'center', marginTop: 30 },
  nav: {
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 12,
    paddingTop: 8,
  },
  navItem: { minHeight: 44, minWidth: 80, justifyContent: 'center', alignItems: 'center' },
  search: { borderWidth: 1, borderRadius: 10, padding: 12, fontSize: 13, marginBottom: 10 },
  setting: { borderBottomWidth: 1, paddingVertical: 18 },
  themeList: { gap: 10 },
  theme: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    minHeight: 44,
  },
  swatch: { width: 16, height: 16, borderRadius: 8 },
});
