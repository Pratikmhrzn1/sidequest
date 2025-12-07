import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const API_BASE_URL = "http://192.168.18.3:5000/api/travel";

export default function VisaRequirementScreen() {
  const params = useLocalSearchParams();
  const nationality = params.nationality as string;
  const destination = params.destination as string;

  const [visaInfo, setVisaInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!nationality || !destination) {
      setLoading(false);
      return;
    }

    const fetchVisaInfo = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/information`);
        const data = await res.json();

        if (data.success) {
          setVisaInfo(data.data);
        }
      } catch (err) {
        console.log("Failed to load visa info");
      } finally {
        setLoading(false);
      }
    };

    fetchVisaInfo();
  }, [nationality, destination]);


  const originData = visaInfo?.origin?.find((o: any) => o.country === nationality);
  const destinationInfo = originData?.destination?.find((d: any) => d.country === destination);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={{ marginTop: 10 }}>Loading visa requirements...</Text>
      </View>
    );
  }

  if (!nationality || !destination) {
    return (
      <View style={styles.center}>
        <Text>Please select nationality and destination first</Text>
      </View>
    );
  }

  if (!destinationInfo) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Visa Requirements from {nationality} to {destination}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.noInfo}>
            No specific visa information available for this route yet.
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Visa Requirements</Text>
        <Text style={styles.subtitle}>
          From {nationality} to {destination}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Visa Information</Text>

        {destinationInfo.details.type === 'string' ? (
          <Text style={styles.paragraph}>
            {destinationInfo.details.text}
          </Text>
        ) : (
          destinationInfo.details.text.map((item: string, i: number) => (
            <View style={styles.bulletItem} key={i}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { marginBottom: 20, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', fontFamily:'mono',color: '#333', padding:20 },
  subtitle: { fontSize: 18, color: '#6200EE', marginTop: 8 },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  paragraph: { fontSize: 16, lineHeight: 24, color: '#444' },
  bulletItem: { flexDirection: 'row', marginVertical: 6 },
  bullet: { fontSize: 20, marginRight: 10, color: '#6200EE' },
  bulletText: { fontSize: 16, flex: 1, color: '#444' },
  noInfo: { fontSize: 16, color: '#999', fontStyle: 'italic', textAlign: 'center' }
});