import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { fetchCountries } from '../data/countries.js';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const [residence, setResidence] = useState('');
  const [destination, setDestination] = useState('');
  const [nationality, setNationality] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const avatars = [
    { icon: 'home', name: "Country Of Residence", dropDown: "Select a country", bgColor: '#6200EE' },
    { icon: 'airplane', name: 'Travel Destination', dropDown: "Select a Destination", bgColor: '#4CAF50' },
    { icon: 'globe', name: 'Country Of Nationality', dropDown: "Select a Nationality", bgColor: '#FF5722' }
  ];

  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);
      const countryData = await fetchCountries();
      setCountries(countryData);
      setLoading(false);
    };
    loadCountries();
  }, []);

  const handleSubmit = async () => {
    if (!residence || !destination || !nationality) return alert("Fill all fields");

    try {
      const response = await fetch("http://localhost:5000/api/travel/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          countryOfResidence: residence,
          travelDestination: destination,
          nationality
        })
      });

      const data = await response.json();
      if (!response.ok) return alert(JSON.stringify(data));
      navigation.navigate("SuccessScreen", { data });
    } catch (err) {
      alert("Request failed");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Ionicons name="menu" size={24} style={styles.Icons}/>
        <Text style={styles.title}>Travel Information</Text>
        <TouchableOpacity>
          <Ionicons name="information-circle" size={24} style={styles.Icons} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.paragraph}>Please select the relevant countries for your travel information</Text>

        {avatars.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={[styles.avatars, { backgroundColor: item.bgColor }]}>
              <Ionicons name={item.icon} size={24} color="#fff" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardText}>{item.name}</Text>

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
                mode='dropdown'
                dropdownIconColor="red"  
              >
                <Picker.Item label={item.dropDown} value="" />
                {countries.map((c, idx) => (
                  <Picker.Item key={idx} label={c.name} value={c.name} />
                ))}
              </Picker>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.BtnTxt}>Show Travel Details</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.paragraph}>
            Make sure all fields are filled up properly before proceeding
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <Ionicons name="chatbubble-outline" size={24} style={{ marginEnd: 8,  marginBottom: 20 }} />
          <Text style={[styles.paragraph, { marginEnd: 40 }]}>Chat With Us</Text>
          <Text style={{ fontSize: 20, color: 'black', marginEnd: 50 , marginBottom: 20}}>|</Text>
          <Ionicons name="question" style={{ fontSize: 24, marginEnd: 10 ,  marginBottom: 20}} />
          <Text style={styles.paragraph}>FAQs</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  appBar: {
    height: 80,
    backgroundColor: '#6200EE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 10
  },
  title: { color: '#fff', fontSize: 22 },
  body: { padding: 15 },
  paragraph: { fontSize: 16, marginBottom: 20 },
  avatars: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2
  },
  cardText: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  button: {
    backgroundColor: '#66F917',
    padding: 20,
    marginTop: 40,
    borderRadius: 20,
    alignItems: 'center'
  },
  BtnTxt: { fontSize: 20 },
  picker: { height: 50, width: '100%' , color:'#FFFF'},
  Icons: { color: '#FFFF' }
});
