import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { User } from 'lucide-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
  appBarHeight:       number;
  showMenu:           boolean;
  onToggleMenu:       () => void;
  onCloseMenu:        () => void;
  onLoginPress:       () => void;
  r:                  (s: number, m: number, l: number) => number;
}

export function TravelAppBar({
  appBarHeight,
  showMenu,
  onToggleMenu,
  onCloseMenu,
  onLoginPress,
  r,
}: Props) {
  return (
    <>
      {/* App Bar */}
      <View style={[
        styles.appBar,
        {
          height:           appBarHeight,
          paddingHorizontal: r(20, 40, 50),
          paddingTop:       Platform.OS === 'ios' ? r(45, 15, 55) : r(15, 20, 25),
        },
      ]}>
        <Text style={[styles.title, { fontSize: r(22, 30, 36) }]}>
          Travel-Visa
        </Text>
        <TouchableOpacity
          onPress={onToggleMenu}
          style={styles.profileBtn}>
          <User size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Dropdown */}
      {showMenu && (
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.overlay, { top: appBarHeight }]}
          onPress={onCloseMenu}>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={onLoginPress}>
              <FontAwesome name="sign-in" size={16} color="#333" />
              <Text style={styles.menuText}>Login</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: '#013E9A',
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  'space-between',
    position:        'absolute',
    top: 0, left: 0, right: 0,
    zIndex:    5,
    elevation: 5,
  },
  title:      { color: '#fff', fontWeight: 'bold' },
  profileBtn: { borderRadius: 20, borderColor: 'white', padding: 8 },
  overlay:    { position: 'absolute', right: 0, zIndex: 10 },
  menu:       { backgroundColor: '#fff', borderRadius: 8, width: 150, elevation: 6 },
  menuItem:   { flexDirection: 'row', alignItems: 'center', padding: 12 },
  menuText:   { marginLeft: 10, fontSize: 15, color: '#333' },
});