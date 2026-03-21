import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { COLORS } from '../../constants/Colors';
 
interface Props {
  message:  string;
  onGoBack: () => void;
}
 
export function ErrorView({ message, onGoBack }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.wrapper}>
        <View style={styles.card}>
          <Text style={styles.icon}>⚠️</Text>
          <Text style={styles.title}>Error</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onGoBack}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcf8f8' },
  wrapper:   { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: {
    backgroundColor: COLORS.white,
    padding:         32,
    borderRadius:    20,
    alignItems:      'center',
    elevation:       3,
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 2 },
    shadowOpacity:   0.08,
    shadowRadius:    12,
    borderWidth:     1,
    borderColor:     '#FEE2E2',
    maxWidth:        400,
    width:           '100%',
  },
  icon:        { fontSize: 48, marginBottom: 16 },
  title:       { fontSize: 22, fontWeight: '700', color: '#DC2626', marginBottom: 12 },
  message:     { fontSize: 16, color: '#64748B', textAlign: 'center', lineHeight: 24, marginBottom: 20 },
  button:      { backgroundColor: COLORS.purple, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8, marginTop: 8 },
  buttonText:  { color: COLORS.white, fontSize: 16, fontWeight: '600' },
});