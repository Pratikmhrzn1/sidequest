import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Alert,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';

const API_BASE_URL = "http://192.168.18.3:5000/api/travel";
//#c178e8

// Responsive helper function
const getResponsiveValue = (width: number, small: number, medium: number, large: number) => {
  if (width < 375) return small; // Small devices (iPhone SE, small Android phones)
  if (width < 768) return medium; // Medium devices (Standard phones)
  return large; // Large devices (Tablets, large phones)
};

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
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  // Responsive helper using dynamic dimensions
  const r = (small: number, medium: number, large: number) => 
    getResponsiveValue(dimensions.width, small, medium, large);

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

  // Create responsive styles based on current dimensions
  const responsiveStyles = StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: '#f5f5f5' 
    },
    appBar: {
      height: Platform.OS === 'ios' 
        ? r(100, 80, 120) 
      : r(85, 95, 105),
      backgroundColor: '#013E9A',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: r(20, 30, 40),
      paddingTop: Platform.OS === 'ios' 
        ? r(45, 20, 55) 
        : r(15, 20, 25),
    },
    title: { 
      color: '#fff', 
      fontSize: r(18, 22, 26), 
      fontWeight: 'bold' 
    },
    body: { 
      padding: r(16, 22, 28),
      paddingBottom: r(20, 24, 32)
    },
    paragraph: { 
      fontSize: r(14, 16, 18), 
      color: '#444', 
      marginBottom: r(20, 24, 28), 
      lineHeight: r(20, 22, 26) 
    },
    card: {
      backgroundColor: '#fff',
      padding: r(12, 14, 20),
      borderRadius: r(14, 16, 20),
      marginBottom: r(12, 16, 20),
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    cardHeader: {
      flexDirection: 'row', 
      alignItems: 'center', 
      marginBottom: r(9, 11, 13)
    },
    avatar: {
      width: r(44, 50, 56),
      height: r(44, 50, 56),
      borderRadius: r(44, 50, 56),
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardText: { 
      fontSize: r(14, 16, 18), 
      fontWeight: 'bold', 
      color: '#333', 
      marginLeft: r(10, 12, 14) 
    },
    selectedBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: r(12, 16, 20),
      borderRadius: r(10, 12, 14),
      borderWidth: 1,
      borderColor: '#eee',
      minHeight: r(48, 52, 56)
    },
    selectedText: { 
      fontSize: r(15, 17, 19), 
      color: '#333',
      flex: 1,
      flexWrap: 'wrap'
    },
    searchContainer: { 
      marginTop: r(8, 10, 12) 
    },
    searchInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: r(12, 14, 16),
      borderRadius: r(10, 12, 14),
      backgroundColor: '#fff',
      fontSize: r(14, 16, 18)
    },
    suggestions: {
      maxHeight: r(180, 200, 250),
      marginTop: r(6, 8, 10),
      borderRadius: r(10, 12, 14),
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#eee'
    },
    suggestionItem: {
      padding: r(12, 14, 16),
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0'
    },
    suggestionText: {
      fontSize: r(14, 16, 18)
    },
    button: {
      backgroundColor: '#6366F1',
      padding: r(16, 18, 22),
      borderRadius: r(28, 30, 34),
      alignItems: 'center',
      marginTop: r(16, 20, 24),
      elevation: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
    BtnTxt: { 
      fontSize: r(16, 18, 20), 
      fontWeight: 'bold', 
      color: '#fff' 
    },
    footerText: { 
      marginTop: r(16, 20, 24), 
      fontSize: r(12, 14, 16), 
      color: '#666', 
      textAlign: 'center',
      paddingHorizontal: r(10, 0, 0)
    },
    footerLinks: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: r(12, 16, 20),
      marginBottom: r(16, 20, 24),
    },
    linkText: { 
      fontSize: r(14, 16, 18), 
      color: '#6200EE', 
      marginHorizontal: r(8, 10, 12), 
      fontWeight: '600' 
    },
  });

  const styles = responsiveStyles;

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
              <View style={styles.cardHeader}>
                <View style={[styles.avatar, { backgroundColor: '#013E9A' }]}>
                  <Ionicons 
                    name={field.icon as any} 
                    size={r(22, 26, 30)} 
                    color="#fff" 
                  />
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
                <Ionicons 
                  name="chevron-down" 
                  size={r(18, 20, 24)} 
                  color="#666" 
                />
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
                          <Text style={styles.suggestionText}>
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