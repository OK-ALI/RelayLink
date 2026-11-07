import type { ComponentRef } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  BackHandler,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  themes,
  typography,
  motionDuration,
  type ThemeId,
  type TypographyId,
  type MotionMode,
} from '@relay-link/design-tokens';
import { fontFamilies, loadTypography } from '../src/ui/typography';
import { Motion } from '../src/ui/Motion';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinkMark } from '../src/ui/LinkMark';
import { Overview } from '../src/features/home/Overview';
import { SettingsView } from '../src/features/settings/SettingsView';

export default function Home() {
  const { fontScale } = useWindowDimensions();
  const [page, setPage] = useState<'Home' | 'Appearance' | 'Settings'>('Home');
  const [theme, setTheme] = useState<ThemeId>('amber');
  const [query, setQuery] = useState('appearance');
  const [reduced, setReduced] = useState(false);
  const [font, setFont] = useState<TypographyId>('baseline');
  const [fonts, setFonts] = useState(false);
  const [fontStatus, setFontStatus] = useState('Loading baseline…');
  const [mode, setMode] = useState<MotionMode>('balanced');
  const [osReduced, setOsReduced] = useState(true);
  const fontRequest = useRef(0);
  const scroll = useRef<ComponentRef<typeof ScrollView>>(null);
  const positions = useRef<Record<string, number>>({});
  const offset = useRef(0);
  const { section } = useLocalSearchParams<{ section?: string }>();
  const router = useRouter();
  const previewFont = async (id: TypographyId) => {
    const token = ++fontRequest.current;
    const start = performance.now();
    setFontStatus('Loading font preview…');
    try {
      await loadTypography(id);
      if (token !== fontRequest.current) return;
      setFont(id);
      setFonts(true);
      setFontStatus(
        `${typography[id].label} ready · ${Math.round(performance.now() - start)} ms load · session only`,
      );
    } catch {
      if (token === fontRequest.current)
        setFontStatus('Font preview unavailable; previous system retained');
    }
  };
  useEffect(() => {
    void previewFont('baseline');
    let live = true;
    void AccessibilityInfo.isReduceMotionEnabled().then((v) => {
      if (live) setOsReduced(v);
    });
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setOsReduced);
    return () => {
      live = false;
      fontRequest.current++;
      sub.remove();
    };
  }, []);
  useEffect(() => {
    if (section && ['appearance', 'motion', 'feedback', 'privacy', 'about'].includes(section)) {
      setPage('Settings');
      setQuery(section);
    }
  }, [section]);
  const t = themes[theme];
  const body = { fontFamily: fonts ? fontFamilies[font][0] : undefined, color: t.text };
  const heading = { fontFamily: fonts ? fontFamilies[font][1] : undefined, color: t.text };
  const navigate = (next: typeof page) => {
    if (section !== undefined) router.setParams({ section: undefined });
    positions.current[`${page}/${query}`] = offset.current;
    setPage(next);
    const nextQuery = next === 'Appearance' ? 'appearance' : query;
    if (next === 'Appearance') setQuery('appearance');
    requestAnimationFrame(() =>
      scroll.current?.scrollTo({
        y: positions.current[`${next}/${nextQuery}`] || 0,
        animated: false,
      }),
    );
  };
  const jump = (id: string) => {
    positions.current[`${page}/${query}`] = offset.current;
    setQuery(id);
    requestAnimationFrame(() =>
      scroll.current?.scrollTo({ y: positions.current[`${page}/${id}`] || 0, animated: false }),
    );
    AccessibilityInfo.announceForAccessibility(`${id} section`);
  };
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (page === 'Home') return false;
      navigate('Home');
      return true;
    });
    return () => sub.remove();
  });
  return (
    <SafeAreaProvider>
      <SafeAreaView key={fontScale} style={[s.safe, { backgroundColor: t.canvas }]}>
        <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
        <View style={[s.header, { borderColor: t.elevated }]}>
          <View style={s.brandRow}>
            <LinkMark color={t.accent} size={26} />
            <Text style={[heading, s.brand]}>
              Relay <Text style={{ color: t.accent }}>Link</Text>
            </Text>
          </View>
          <Text style={[body, s.development, { color: t.muted }]}>Preview</Text>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          ref={scroll}
          onScroll={(e) => {
            offset.current = e.nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={32}
          contentContainerStyle={s.content}
        >
          {font !== 'baseline' && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="End typography preview"
              onPress={() => void previewFont('baseline')}
              style={{
                padding: 12,
                borderLeftWidth: 2,
                borderColor: t.accent,
                backgroundColor: t.surface,
                marginBottom: 18,
              }}
            >
              <Text style={[body, { fontSize: 12, lineHeight: 20 }]}>
                {typography[font].label} · Typography demonstration · End preview
              </Text>
            </Pressable>
          )}
          <Motion
            identity={`${page}/${query}`}
            duration={motionDuration(mode, reduced || osReduced)}
          >
            <View style={s.heading}>
              <Text accessibilityRole="header" style={[heading, s.title]}>
                {page === 'Home' ? 'Overview' : page}
              </Text>
              <Text style={[body, s.subtitle, { color: t.muted }]}>
                {page === 'Home' ? 'No connected PC' : 'Preferences for this device'}
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
                setQuery={jump}
                theme={theme}
                setTheme={setTheme}
                reduced={reduced}
                setReduced={setReduced}
                osReduced={osReduced}
                mode={mode}
                setMode={setMode}
                font={font}
                previewFont={(id) => void previewFont(id)}
                fontStatus={fontStatus}
              />
            )}
            <Text style={[body, s.footer, { color: t.muted }]}>Relay Link · Preview</Text>
          </Motion>
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
  development: { fontSize: 12 },
  content: { padding: 20, paddingBottom: 22, maxWidth: 620, width: '100%', alignSelf: 'center' },
  heading: { marginBottom: 22 },
  title: { fontSize: 27, lineHeight: 34, letterSpacing: -0.8 },
  subtitle: { fontSize: 13, lineHeight: 18, marginTop: 6 },
  footer: { fontSize: 12, marginTop: 26 },
  nav: {
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 8,
    paddingTop: 6,
  },
  navItem: { minHeight: 48, minWidth: 80, justifyContent: 'center', alignItems: 'center' },
  navText: { fontSize: 13 },
});
