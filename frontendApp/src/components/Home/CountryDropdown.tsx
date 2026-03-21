// components/home/CountryDropdown.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import type { Country } from './types';
import { getFlagEmoji } from './constants';

interface Props {
  searchText: string;
  onSearchChange: (text: string) => void;
  countries: Country[];
  onSelect: (name: string) => void;
  placeholder: string;
  r: (s: number, m: number, l: number) => number;
}

export function CountryDropdown({
  searchText,
  onSearchChange,
  countries,
  onSelect,
  placeholder,
  r,
}: Props) {
  const filtered = countries
    .filter(c => c.name.toLowerCase().includes(searchText.toLowerCase()))
    .slice(0, 5);

  return (
    <View style={[styles.container, { marginTop: r(8, 10, 12) }]}>
      <TextInput
        placeholder={placeholder}
        value={searchText}
        onChangeText={onSearchChange}
        style={[
          styles.input,
          {
            padding:      r(12, 14, 16),
            borderRadius: r(10, 12, 14),
            fontSize:     r(14, 16, 18),
          },
        ]}
        autoFocus
      />
      <ScrollView
        style={[
          styles.list,
          {
            maxHeight:    r(180, 200, 250),
            marginTop:    r(6, 8, 10),
            borderRadius: r(10, 12, 14),
          },
        ]}
        nestedScrollEnabled>
        {filtered.length === 0 ? (
          <Text style={styles.emptyText}>No results found</Text>
        ) : (
          filtered.map(c => (
            <TouchableOpacity
              key={c.name}
              style={[styles.item, { padding: r(12, 14, 16) }]}
              onPress={() => onSelect(c.name)}>
              <Text style={{ fontSize: r(14, 16, 18) }}>
                {getFlagEmoji(c.cca2)}  {c.name}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {
    borderWidth:     1,
    borderColor:     '#ddd',
    backgroundColor: '#fff',
  },
  list: {
    backgroundColor: '#fff',
    borderWidth:     1,
    borderColor:     '#eee',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  emptyText: {
    padding:   16,
    color:     '#999',
    textAlign: 'center',
    fontSize:  14,
  },
});