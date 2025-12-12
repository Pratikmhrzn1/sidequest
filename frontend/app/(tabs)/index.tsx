import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';

const API_BASE_URL = "http://192.168.18.3:5000/api/travel";
//#c178e8
interface Country {
  name: string;
  cca2: string;
}

const getFlagEmoji = (cca2: string): string => {
  if (!cca2 || cca2.length !== 2) return '';
  const codePoints = cca2.toUpperCase().split('').map(char => 0x1F1E6 + char.charCodeAt(0) - 65);
  return String.fromCodePoint(...codePoints);
};

export default function Home() {
  const router = useRouter();

  const [residence, setResidence] = useState('');
  const [destination, setDestination] = useState('');
  const [nationality, setNationality] = useState('');

  const [searchText, setSearchText] = useState('');
  const [activeField, setActiveField] = useState<'residence' | 'destination' | 'nationality' | null>(null);

  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/countries`);
      const sorted = (res.data.countries || [])
        .filter((c: Country) => c.name && c.cca2)
        .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
      setCountries(sorted);
      setLoading(false);
    } catch (err) {
      Alert.alert("Error", "Cannot connect to server.");
      setLoading(false);
    }
  };

  const getSelectedValue = (field: 'residence' | 'destination' | 'nationality') => {
    if (field === 'residence') return residence;
    if (field === 'destination') return destination;
    return nationality;
  };

  const setSelectedValue = (field: 'residence' | 'destination' | 'nationality', value: string) => {
    if (field === 'residence') setResidence(value);
    else if (field === 'destination') setDestination(value);
    else setNationality(value);
    setSearchText('');
    setActiveField(null);
  };

  const getFlag = (value: string) => {
    const country = countries.find(c => c.name === value);
    return country ? getFlagEmoji(country.cca2) : '';
  };

  const handleSubmit = async () => {
    if (!residence || !destination || !nationality) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/submit`, {
        countryOfResidence: residence,
        travelDestination: destination,
        nationality
      });

      router.push({
        pathname: '/travel-details',
        params: { residence, destination, nationality }
      });
    } catch (err: any) {
      Alert.alert("Failed", err.response?.data?.message || "Network error");
    }
  };

  const fields = [
    { key: 'residence', icon: 'home', label: 'Country Of Residence' },
    { key: 'destination', icon: 'airplane', label: 'Travel Destination' },
    { key: 'nationality', icon: 'globe', label: 'Country Of Nationality' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        {/* <Ionicons name="menu" size={28} color="white" /> */}
        <Text style={styles.title}>Travel Information</Text>
        {/* <Ionicons name="information-circle" size={28} color="white" /> */}
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.paragraph}>
          Please select the relevant countries for your travel information
        </Text>

        {fields.map((field) => {
          const value = getSelectedValue(field.key as any);
          const flag = getFlag(value);

          return (
            <View key={field.key} style={styles.card}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 11 }}>
                <View style={[styles.avatar, { backgroundColor: '#2f0cdbff' }]}>
                  <Ionicons name={field.icon as any} size={26} color="#fff" />
                </View>
                <Text style={styles.cardText}>{field.label}</Text>
              </View>

              {/* Selected Country Box */}
              <TouchableOpacity
                style={styles.selectedBox}
                onPress={() => setActiveField(field.key as any)}
              >
                <Text style={styles.selectedText}>
                  {flag} {value || `Select ${field.label.toLowerCase()}`}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#666" />
              </TouchableOpacity>

              {/* Search + Suggestions (Only when active) */}
              {activeField === field.key && (
                <View style={styles.searchContainer}>
                  <TextInput
                    placeholder={`Search ${field.label.toLowerCase()}...`}
                    value={searchText}
                    onChangeText={setSearchText}
                    style={styles.searchInput}
                    autoFocus
                  />

                  <ScrollView style={styles.suggestions} nestedScrollEnabled>
                    {countries
                      .filter(c => c.name.toLowerCase().includes(searchText.toLowerCase()))
                      .slice(0,20)
                      .map(c => (
                        <TouchableOpacity
                          key={c.name}
                          style={styles.suggestionItem}
                          onPress={() => {
                            setSelectedValue(field.key as any, c.name);
                          }}
                        >
                          <Text style={{ fontSize: 16 }}>
                            {getFlagEmoji(c.cca2)} {c.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </ScrollView>
                </View>
              )}
            </View>
          );
        })}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.BtnTxt}>Show Travel Details</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Make sure all fields are filled up properly before proceeding
        </Text>

        {/* <View style={styles.footerLinks}>
          <Ionicons name="chatbubble-outline" size={24} color="#6200EE" />
          <Text style={styles.linkText}>Chat With Us</Text>
          <Text style={{ marginHorizontal: 20, fontSize: 30, color: '#6200EE' }}>|</Text>
          <Ionicons name="help-circle-outline" size={24} color="#6200EE" />
          <Text style={styles.linkText}>FAQs</Text>
        </View> */}
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  appBar: {
    height: Platform.OS === 'ios' ? 110 : 95,
    backgroundColor: '#15046dff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  body: { padding: 22 },
  paragraph: { fontSize: 16, color: '#444', marginBottom: 24, lineHeight: 22 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: { fontSize: 16, fontWeight: 'bold', color: '#333', marginLeft: 12 },
  selectedBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee'
  },
  selectedText: { fontSize: 17, color: '#333' },
  searchContainer: { marginTop: 10 },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 16
  },
  suggestions: {
    maxHeight: 200,
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee'
  },
  suggestionItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  button: {
    backgroundColor: '#66F917',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    elevation: 6,
  },
  BtnTxt: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  footerText: { marginTop: 20, fontSize: 14, color: '#666', textAlign: 'center' },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  linkText: { fontSize: 16, color: '#6200EE', marginHorizontal: 10, fontWeight: '600' },
});