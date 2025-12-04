import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';

// CHANGE THIS TO YOUR PC'S IP ADDRESS (run ipconfig → IPv4)
const API_BASE_URL = "http://192.168.1.104:5000/api/travel";  // ← CHANGE THIS!

// NEW: Interface for country with flag support
interface Country {
  name: string;
  cca2: string; // 2-letter country code (e.g. "IN", "US"
}

// NEW: Convert country code (cca2) to flag emoji
const getFlagEmoji = (cca2: string): string => {
  if (!cca2 || cca2.length !== 2) return '';
  const codePoints = cca2
    .toUpperCase()
    .split('')
    .map(char => 0x1F1E6 + char.charCodeAt(0) - 65);
  return String.fromCodePoint(...codePoints);
};

export default function Home() {
  const router = useRouter();

  const [residence, setResidence] = useState('');
  const [destination, setDestination] = useState('');
  const [nationality, setNationality] = useState('');

  // CHANGED: Now stores full country objects (with cca2 for flags)
  const [countries, setCountries] = useState<Country[]>([]);

  const [loading, setLoading] = useState(true);

  const avatars = [
    { icon: 'home', name: "Country Of Residence", placeholder: "Select residence", bgColor: '#6200EE' },
    { icon: 'airplane', name: 'Travel Destination', placeholder: "Select destination", bgColor: '#6200EE' },
    { icon: 'globe', name: 'Country Of Nationality', placeholder: "Select nationality", bgColor: '#6200EE' }
  ];

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/countries`);
      // IMPORTANT: Backend must send: { countries: [{ name: "India", cca2: "IN" }, ...] }
      const countryList: Country[] = res.data.countries || [];
      const sorted = countryList
        .filter(c => c.name && c.cca2)
        .sort((a, b) => a.name.localeCompare(b.name));
      setCountries(sorted);
      setLoading(false);
    } catch (err) {
      console.error("API Error:", err);
      Alert.alert("Error", "Cannot connect to server. Check IP & backend.");
      setLoading(false);
    }
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

      Alert.alert("Success!", "Travel details saved!");
      router.push({
      pathname: '/travel-details',
      params: { residence, destination, nationality, }
      }); // Fixed navigation
    } catch (err: any) {
      Alert.alert("Failed", err.response?.data?.message || "Network error");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={{ marginTop: 20, fontSize: 16 }}>Please wait...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* App Bar - UNCHANGED */}
      <View style={styles.appBar}>
        <Ionicons name="menu" size={28} color="white" />
        <Text style={styles.title}>Travel Information</Text>
        <Ionicons name="information-circle" size={28} color="white" />
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.paragraph}>
          Please select the relevant countries for your travel information
        </Text>

        {avatars.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={[styles.avatar, { backgroundColor: item.bgColor }]}>
              <Ionicons name={item.icon as any} size={28} color="#fff" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardText}>{item.name}</Text>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={
                    index === 0 ? residence :
                    index === 1 ? destination :
                    nationality
                  }
                  onValueChange={(value) => {
                    if (index === 0) setResidence(value);
                    else if (index === 1) setDestination(value);
                    else setNationality(value);
                  }}
                  style={styles.picker}
                  dropdownIconColor="#333"
                >
                  <Picker.Item label={item.placeholder} value="" />

                  {/* CHANGED: Now shows flag emoji + country name */}
                  {countries.map((country) => {
                    const flag = getFlagEmoji(country.cca2);
                    return (
                      <Picker.Item
                        key={country.name}
                        label={`${flag} ${country.name}`}
                        value={country.name}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          </View>
        ))}

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
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  appBar: {
    height: Platform.OS === 'ios' ? 110 : 100,
    backgroundColor: '#6200EE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  body: { padding: 22 },
  paragraph: { fontSize: 16, color: '#444', margin: 10, marginBottom: 24, marginTop: 5, lineHeight: 22 },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardText: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  pickerContainer: {
    borderWidth: 0.3,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 60,
    color: '#333',
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