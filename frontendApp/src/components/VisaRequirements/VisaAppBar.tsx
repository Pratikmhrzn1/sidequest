import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { COLORS } from '../../constants/Colors';

interface Props {
  appBarHeight: number;
  onBack:       () => void;
  showBack?:    boolean;
  r:            (s: number, m: number, l: number) => number;
}

export function VisaAppBar({ appBarHeight, onBack, showBack = true, r }: Props) {
  return (
    <View style={[
      styles.topBar,
      {
        height:            appBarHeight,
        paddingHorizontal: r(20, 10, 20),
        paddingTop:        Platform.OS === 'ios' ? r(45, 20, 55) : r(15, 20, 25),
      },
    ]}>
      {/* Back button */}
      {showBack ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}>
          <ChevronLeft size={25} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={[styles.title, { fontSize: r(18, 25, 24) }]}>
        Visa Requirements
      </Text>

      {/* Right spacer keeps title centred */}
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: COLORS.primary,
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  'space-between',
    position:        'absolute',
    top: 0, left: 0, right: 0,
    zIndex:    1,
    elevation: 5,
  },
  backButton:  { flexDirection: 'row', alignItems: 'center', minWidth: 80, left: 10 },
  backText:    { color: '#fff', fontWeight: '600', marginLeft: 8 },
  title:       { color: '#fff', fontWeight: 'bold', flex: 1, textAlign: 'center' },
  placeholder: { minWidth: 80 },
});