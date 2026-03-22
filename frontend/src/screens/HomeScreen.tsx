import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { API_URL } from '@env';
import type { RootStackParamList } from '../navigation/Navigator';

import type { Country, FieldKey } from '../components/Home/index';
import { FIELDS,CountryCard,CountryDropdown,getFlagEmoji ,getResponsiveValue} from '../components/Home/index';
import { COLORS } from '../constants/Colors';
const API_BASE_URL = API_URL;

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  console.log(API_BASE_URL)

  // ── State ──────────────────────────────────────────────────────────────────
  const [residence,          setResidence]          = useState('');
  const [destination,        setDestination]        = useState('');
  const [nationality,        setNationality]        = useState('');
  const [nationalityAutoSet, setNationalityAutoSet] = useState(false);
  const [searchText,         setSearchText]         = useState('');
  const [activeField,        setActiveField]        = useState<FieldKey | null>(null);
  const [countries,          setCountries]          = useState<Country[]>([]);
  const [loading,            setLoading]            = useState(true);
  const [submitting,         setSubmitting]         = useState(false);
  const [dimensions,         setDimensions]         = useState(Dimensions.get('window'));

  // ── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) =>
      setDimensions(window),
    );
    return () => sub?.remove();
  }, []);

  useEffect(() => { loadCountries(); }, []);

  // ── Responsive helper ──────────────────────────────────────────────────────
  const r = (s: number, m: number, l: number) =>
    getResponsiveValue(dimensions.width, s, m, l);


  const loadCountries = async () => {
    try {
       console.log('URL being called:', `${API_BASE_URL}/countries`);
      const res = await axios.get(`${API_BASE_URL}/countries`);
      const sorted: Country[] = (res.data.countries || [])
        .filter((c: Country) => c.name && c.cca2)
        .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
      setCountries(sorted);
    } catch {
      Alert.alert('Error', 'Cannot connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!residence || !destination || !nationality) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/submit`, {
        countryOfResidence: residence,
        travelDestination:  destination,
        nationality,
      });
      navigation.navigate('VisaRequirement', { nationality, destination });
    } catch (err: any) {
      Alert.alert('Failed', err.response?.data?.message || 'Network error');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Field helpers ──────────────────────────────────────────────────────────
  const getSelectedValue = (field: FieldKey): string => {
    if (field === 'residence')   return residence;
    if (field === 'destination') return destination;
    return nationality;
  };

  const setSelectedValue = (field: FieldKey, value: string) => {
    if (field === 'residence') {
      setResidence(value);
      if (!nationalityAutoSet || nationality === residence) {
        setNationality(value);
        setNationalityAutoSet(true);
      }
    } else if (field === 'destination') {
      setDestination(value);
    } else {
      setNationality(value);
      setNationalityAutoSet(true);
    }
    setSearchText('');
    setActiveField(null);
  };

  const getFlag = (name: string): string => {
    const c = countries.find(x => x.name === name);
    return c ? getFlagEmoji(c.cca2) : '';
  };

  const iconSize = r(20, 22, 26);

  return (
    <SafeAreaView style={styles.container}>

      {/* ── App Bar ── */}
      <View style={[
        styles.appBar,
        {
          height:     Platform.OS === 'ios' ? r(60, 100, 100) : r(85, 100, 100),
          paddingTop: Platform.OS === 'ios' ? r(45, 20, 80)   : r(15, 20, 25),
          paddingHorizontal: r(20, 30, 40),
        },
      ]}>
        <Text style={[styles.appBarTitle, { fontSize: r(18, 25, 30) }]}>
          Travel Information
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.body,
          { padding: r(16, 22, 28), paddingBottom: r(20, 24, 32) },
        ]}
        keyboardShouldPersistTaps="handled">

        <Text style={[
          styles.paragraph,
          { fontSize: r(14, 16, 18), marginBottom: r(20, 24, 28), lineHeight: r(20, 22, 26) },
        ]}>
          Please select the relevant countries for your travel information
        </Text>

        {FIELDS.map(field => (
          <CountryCard
            key={field.key}
            field={field}
            value={getSelectedValue(field.key)}
            flag={getFlag(getSelectedValue(field.key))}
            isActive={activeField === field.key}
            searchText={searchText}
            countries={countries}
            iconSize={iconSize}
            onPress={() => setActiveField(
              activeField === field.key ? null : field.key,
            )}
            onSearch={setSearchText}
            onSelect={name => setSelectedValue(field.key, name)}
            r={r}
          />
        ))}

        {/* ── Submit Button ── */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              padding:      r(16, 18, 22),
              borderRadius: r(28, 30, 34),
              marginTop:    r(14, 14, 22),
            },
          ]}
          onPress={handleSubmit}
          disabled={submitting}
          activeOpacity={0.85}>
          {submitting
            ? <ActivityIndicator color="#fff" />
            : <Text style={[styles.btnText, { fontSize: r(16, 18, 20) }]}>
                Show Travel Details
              </Text>
          }
        </TouchableOpacity>

        <Text style={[
          styles.footerText,
          { marginTop: r(16, 20, 24), fontSize: r(12, 14, 16), paddingHorizontal: r(10, 0, 0) },
        ]}>
          Make sure all fields are filled up properly before proceeding
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#f5f5f5' },
  appBar: {
    backgroundColor: COLORS.primary,
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  'center',
  },
  appBarTitle:  { color: '#fff', fontWeight: 'bold', marginTop: 5 },
  body:         {},
  paragraph:    { color: '#444', opacity: 0.8 },
  button: {
    backgroundColor: COLORS.primary,
    alignItems:      'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  btnText:      { fontWeight: 'bold', color: '#fff' },
  footerText:   { color: '#666', opacity: 0.8, textAlign: 'center' },
});