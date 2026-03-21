
import React from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import type { VisaDestination } from './types';
import { normaliseVisaText } from './helpers';

interface Props {
  nationality:     string;
  destination:     string;
  destinationInfo: VisaDestination;
  fadeAnim:        Animated.Value;
  contentWidth:    number;
  r:               (s: number, m: number, l: number) => number;
}

export function VisaContent({
  nationality,
  destination,
  destinationInfo,
  fadeAnim,
  contentWidth,
  r,
}: Props) {
  const textItems = normaliseVisaText(destinationInfo.details?.text);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>
          The details of {destination} visa for {nationality} citizens is as follows:
        </Text>
      </View>

      {/* Info card */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <View style={styles.iconCircle}>
            <Text style={styles.sectionIcon}>ℹ️</Text>
          </View>
          <Text style={styles.sectionTitle}>Visa Information</Text>
        </View>

        <View style={styles.contentWrapper}>
          {textItems.map((item, i) => {
            if (!item || item.trim().length === 0) return null;
            return (
              <View key={i} style={styles.htmlBlock}>
                <RenderHTML
                  contentWidth={contentWidth}
                  source={{ html: item }}
                  tagsStyles={buildTagStyles(r)}
                  defaultTextProps={{ selectable: true }}
                  renderersProps={{ img: { enableExperimentalPercentWidth: true } }}
                  baseStyle={{ fontSize: r(13, 15, 17), color: '#475569' }}
                />
                {i < textItems.length - 1 && <View style={styles.divider} />}
              </View>
            );
          })}
        </View>
      </View>

      {/* Footer note */}
      <View style={styles.footer}>
        <Ionicons name="information-circle-outline" size={16} color={COLORS.purple} />
        <Text style={styles.footerText}>
          These data are based on previous reports. Please verify with official sources.
        </Text>
      </View>
    </Animated.View>
  );
}

// ── HTML tag styles extracted so JSX stays clean ──────────────────────────────
const buildTagStyles = (r: (s: number, m: number, l: number) => number) => ({
  h2:         { fontSize: r(20, 22, 24), fontWeight: '700' as const, marginTop: 20, marginBottom: 12, color: '#1E293B', borderBottomWidth: 2, borderBottomColor: '#E2E8F0', paddingBottom: 8 },
  h3:         { fontSize: r(17, 19, 21), fontWeight: '700' as const, marginTop: 16, marginBottom: 10, color: '#334155' },
  h4:         { fontSize: r(15, 17, 19), fontWeight: '600' as const, marginTop: 14, marginBottom: 8,  color: '#475569' },
  p:          { fontSize: r(13, 15, 17), marginVertical: 8, lineHeight: r(22, 26, 30), color: '#475569', textAlign: 'justify' as const },
  ul:         { marginVertical: 10, paddingLeft: 12, backgroundColor: '#F8FAFC', borderRadius: 8, padding: 12 },
  ol:         { marginVertical: 10, paddingLeft: 12, backgroundColor: '#F8FAFC', borderRadius: 8, padding: 12 },
  li:         { fontSize: r(13, 15, 17), lineHeight: r(22, 26, 30), marginVertical: 6, color: '#475569' },
  strong:     { fontWeight: '700' as const, color: '#1E293B' },
  em:         { fontStyle: 'italic' as const, color: '#64748B' },
  a:          { color: '#6366F1', textDecorationLine: 'underline' as const, fontWeight: '500' as const },
  blockquote: { borderLeftWidth: 4, borderLeftColor: '#6366F1', paddingLeft: 16, marginVertical: 12, backgroundColor: '#EEF2FF', padding: 12, borderRadius: 8 },
  table:      { marginVertical: 12, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8 },
  th:         { backgroundColor: '#F1F5F9', padding: 10, fontWeight: '700' as const, color: '#1E293B' },
  td:         { padding: 10, borderWidth: 1, borderColor: '#E2E8F0', color: '#475569' },
});

const styles = StyleSheet.create({
  header:         { marginBottom: 20, alignItems: 'center' },
  title:          { fontSize: 16, fontWeight: '600', color: '#1E293B', textAlign: 'center', lineHeight: 24, paddingHorizontal: 16 },
  card: {
    backgroundColor: COLORS.white,
    padding:         20,
    borderRadius:    16,
    marginBottom:    16,
    elevation:       3,
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 2 },
    shadowOpacity:   0.08,
    shadowRadius:    12,
    borderWidth:     1,
    borderColor:     '#E2E8F0',
  },
  sectionHeader:  { flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingBottom: 16, borderBottomWidth: 2, borderBottomColor: '#E2E8F0' },
  iconCircle:     { width: 48, height: 48, borderRadius: 24, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  sectionIcon:    { fontSize: 24 },
  sectionTitle:   { fontSize: 22, fontWeight: '700', color: '#1E293B', flex: 1 },
  contentWrapper: { marginTop: 8 },
  htmlBlock:      { marginVertical: 4 },
  divider:        { height: 1, backgroundColor: '#E2E8F0', marginVertical: 20 },
  footer: {
    marginTop:       8,
    padding:         16,
    backgroundColor: '#EEF2FF',
    borderRadius:    12,
    borderLeftWidth: 3,
    borderLeftColor: '#6366F1',
    flexDirection:   'row',
    alignItems:      'flex-start',
    gap:             8,
  },
  footerText: { fontSize: 13, color: '#64748B', fontStyle: 'italic', lineHeight: 20, flex: 1 },
});