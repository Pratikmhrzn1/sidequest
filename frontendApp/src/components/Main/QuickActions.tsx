import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import type { QuickActionCard } from './types';
 
interface Props {
  cards: QuickActionCard[];
  r:     (s: number, m: number, l: number) => number;
}
 
export function QuickActions({ cards, r }: Props) {
  return (
    <View style={[styles.container, { marginTop: r(8, 18, 18) }]}>
      <Text style={[styles.heading, {
        fontSize:     r(18, 20, 24),
        marginBottom: r(12, 18, 18),
        paddingLeft:  r(2, 4, 6),
      }]}>
        Quick Actions
      </Text>
 
      <View style={styles.grid}>
        {cards.map((item, index) => (
          <TouchableOpacity key={index} onPress={item.Navigate} activeOpacity={0.8}>
            <View style={[
              styles.card,
              {
                width:        r(140, 170, 200),
                height:       r(90, 110, 130),
                borderRadius: r(10, 12, 14),
                marginBottom: r(12, 16, 20),
                backgroundColor: item.backgroundColor,
              },
            ]}>
              <Image
                source={{ uri: item.Icon }}
                style={{ width: r(22, 26, 30), height: r(22, 26, 30) }}
              />
              <Text style={[styles.cardText, { fontSize: r(12, 14, 16), marginTop: r(6, 8, 10) }]}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {},
  heading:   { fontWeight: '600' },
  grid:      { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card:      { justifyContent: 'center', alignItems: 'center' },
  cardText:  { color: '#FFF', fontWeight: '600' },
});