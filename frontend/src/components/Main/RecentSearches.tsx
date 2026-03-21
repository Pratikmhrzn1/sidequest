import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import type { RecentApplication } from './types';
 
interface Props {
  items:       RecentApplication[];
  onViewAll:   () => void;
  r:           (s: number, m: number, l: number) => number;
}
 
export function RecentSearches({ items, onViewAll, r }: Props) {
  return (
    <View>
      {/* Section header */}
      <View style={[styles.header, {
        marginLeft:   r(2, 4, 6),
        marginTop:    r(4, 5, 6),
        marginBottom: r(8, 10, 12),
      }]}>
        <Text style={[styles.heading, { fontSize: r(16, 18, 22) }]}>
          Recent Search
        </Text>
        <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
          <Text style={[styles.viewAll, { fontSize: r(14, 16, 18) }]}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
 
      {/* Cards */}
      {items.length === 0 ? (
        <Text style={[styles.empty, { marginTop: r(16, 20, 24), fontSize: r(14, 16, 18) }]}>
          No applications yet
        </Text>
      ) : (
        items.slice(0, 2).map((item, index) => (
          <RecentCard key={index} item={item} r={r} />
        ))
      )}
    </View>
  );
}
 
// ── Inner card ────────────────────────────────────────────────────────────────
function RecentCard({
  item,
  r,
}: {
  item: RecentApplication;
  r: (s: number, m: number, l: number) => number;
}) {
  return (
    <View style={[styles.card, {
      padding:      r(16, 20, 24),
      borderRadius: r(10, 12, 14),
      marginBottom: r(16, 20, 24),
    }]}>
      <View style={styles.cardRow}>
        {/* Icon + destination + date */}
        <View style={styles.cardLeft}>
          <View style={[
            styles.iconBox,
            {
              backgroundColor: item.iconBackground,
              padding:      r(8, 10, 12),
              borderRadius: r(6, 6, 6),
              width:        r(44, 50, 56),
              height:       r(44, 50, 56),
            },
          ]}>
            <Image
              source={{ uri: item.icon }}
              style={{ width: r(26, 30, 34), height: r(18, 20, 22) }}
            />
          </View>
 
          <View style={[styles.cardInfo, { marginLeft: r(8, 10, 12) }]}>
            <Text style={[styles.destination, { fontSize: r(14, 16, 18) }]}>
              {item.title}
            </Text>
            <View style={[styles.dateRow, { marginTop: r(4, 6, 8) }]}>
              <Image
                source={{ uri: 'https://i.imgur.com/2J1vXbK.png' }}
                style={{
                  width:       r(18, 20, 22),
                  height:      r(18, 20, 22),
                  marginRight: r(4, 6, 8),
                }}
              />
              <Text style={[styles.date, { fontSize: r(12, 14, 16) }]}>
                {item.date}
              </Text>
            </View>
          </View>
        </View>
 
        {/* Status badge */}
        <View style={[
          styles.badge,
          { backgroundColor: item.statusBackground },
        ]}>
          <Text style={[styles.badgeText, { color: item.statusTextColor }]}>
            {item.statusLabel}
          </Text>
        </View>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  header:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heading:     { fontWeight: '600' },
  viewAll:     { color: '#00d0ff' },
  empty:       { textAlign: 'center', color: '#999' },
  card: {
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardLeft:    { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconBox:     { justifyContent: 'center', alignItems: 'center' },
  cardInfo:    { flex: 1 },
  destination: { fontWeight: 'bold', color: '#333' },
  dateRow:     { flexDirection: 'row', alignItems: 'center' },
  date:        { color: '#666' },
  badge:       { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginLeft: 8 },
  badgeText:   { fontWeight: '600', fontSize: 13 },
});