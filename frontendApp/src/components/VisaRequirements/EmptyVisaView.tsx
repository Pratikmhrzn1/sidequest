import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/Colors';
 
interface Props {
  nationality: string;
  destination: string;
}
 
export function EmptyVisaView({ nationality, destination }: Props) {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>
          {nationality} → {destination}
        </Text>
      </View>
 
      <View style={styles.card}>
        <Text style={styles.icon}>📋</Text>
        <Text style={styles.noInfo}>
          No specific visa information available for this route yet.
        </Text>
        <Text style={styles.subtext}>
          Please check back later or contact our support team for assistance.
        </Text>
      </View>
    </>
  );
}
 
const styles = StyleSheet.create({
  header:  { marginBottom: 20, alignItems: 'center' },
  title:   { fontSize: 16, fontWeight: '600', color: '#1E293B', textAlign: 'center', lineHeight: 24, paddingHorizontal: 16 },
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
    alignItems:      'center',
  },
  icon:    { fontSize: 48, textAlign: 'center', marginBottom: 16 },
  noInfo:  { fontSize: 18, color: '#64748B', textAlign: 'center', fontWeight: '600', marginBottom: 8 },
  subtext: { fontSize: 14, color: '#94A3B8', textAlign: 'center', marginTop: 8, lineHeight: 20 },
});