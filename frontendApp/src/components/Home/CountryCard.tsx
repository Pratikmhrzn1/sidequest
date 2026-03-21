// components/home/CountryCard.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { FieldIcon } from './FieldIcon';
import { CountryDropdown } from './CountryDropdown';
import type { Country, Field, FieldKey } from './types';

interface Props {
  field:       Field;
  value:       string;
  flag:        string;
  isActive:    boolean;
  searchText:  string;
  countries:   Country[];
  iconSize:    number;
  onPress:     () => void;
  onSearch:    (text: string) => void;
  onSelect:    (name: string) => void;
  r:           (s: number, m: number, l: number) => number;
}

export function CountryCard({
  field,
  value,
  flag,
  isActive,
  searchText,
  countries,
  iconSize,
  onPress,
  onSearch,
  onSelect,
  r,
}: Props) {
  return (
    <View style={[
      styles.card,
      {
        padding:      r(12, 14, 20),
        borderRadius: r(14, 16, 20),
        marginBottom: r(12, 16, 20),
      },
    ]}>
      {/* ── Header ── */}
      <View style={[styles.cardHeader, { marginBottom: r(9, 11, 13) }]}>
        <View style={[
          styles.avatar,
          {
            width:        r(44, 45, 56),
            height:       r(44, 45, 56),
            borderRadius: r(44, 50, 56),
            backgroundColor: field.backgroundColor,
          },
        ]}>
          <FieldIcon fieldKey={field.key} size={iconSize} />
        </View>
        <Text style={[styles.cardLabel, { fontSize: r(14, 15, 18), marginLeft: r(10, 12, 14) }]}>
          {field.label}
        </Text>
      </View>

      {/* ── Selector box ── */}
      <TouchableOpacity
        style={[
          styles.selectorBox,
          {
            padding:      r(12, 15, 20),
            borderRadius: r(10, 12, 14),
            minHeight:    r(48, 52, 56),
          },
        ]}
        onPress={onPress}
        activeOpacity={0.7}>
        <Text style={[styles.selectorText, { fontSize: r(14, 16, 19) }]}>
          {flag ? `${flag}  ` : ''}{value || `Select ${field.label.toLowerCase()}`}
        </Text>
        <ChevronDown size={20} color="#555" />
      </TouchableOpacity>

      {/* ── Dropdown (only when active) ── */}
      {isActive && (
        <CountryDropdown
          searchText={searchText}
          onSearchChange={onSearch}
          countries={countries}
          onSelect={onSelect}
          placeholder={`Search ${field.label.toLowerCase()}...`}
          r={r}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems:   'center',
  },
  avatar: {
    justifyContent: 'center',
    alignItems:     'center',
  },
  cardLabel: {
    fontWeight: 'bold',
    color:      '#333',
  },
  selectorBox: {
    flexDirection:   'row',
    justifyContent:  'space-between',
    alignItems:      'center',
    backgroundColor: '#f8f9fa',
    borderWidth:     0.8,
    borderColor:     '#eee',
    opacity:         0.85,
  },
  selectorText: {
    color: '#333',
    flex:  1,
    flexWrap: 'wrap',
  },
});