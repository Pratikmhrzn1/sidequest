
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
const API_BASE_URL = `http://192.168.18.3:5000/api/travel`;

interface Application {
  id: string;
  travelDestination: string;
  createdAt: string;
  status: 'pending' | 'in-process' | 'approved' | 'rejected';
}

export default function ViewAllApplications() {
  const params = useLocalSearchParams();
  const nationality = (params.nationality as string)?.trim();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!nationality) {
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {
      try {
        // console.log("Searching applications for:", nationality);
        const res = await fetch(`${API_BASE_URL}/my-applications?nationality=${encodeURIComponent(nationality)}`);
        const data = await res.json();
        // console.log("Backend returned:", data);

        if (data.success && Array.isArray(data.applications)) {
          setApplications(data.applications);
        } else {
          setApplications([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [nationality]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'short' });
    const year = date.getFullYear();
    let suffix = 'th';
    if (day % 10 === 1 && day !== 11) suffix = 'st';
    else if (day % 10 === 2 && day !== 12) suffix = 'nd';
    else if (day % 10 === 3 && day !== 13) suffix = 'rd';
    return `${day}${suffix} ${month}, ${year}`;
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  if (!nationality) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <Text>No nationality provided</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ padding: 20, paddingTop: 30 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, }}>
          All Applications
        </Text>
        <Text style={{ color: '#666', marginBottom: 20 }}>
          Showing for citizenship of : {nationality}
        </Text>

        {applications.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <Text style={{ fontSize: 18, color: '#999' }}>No applications found</Text>
            {/* <Text style={{ color: '#666', marginTop: 10 }}>
              Make sure you submitted with nationality: "{nationality}"
            </Text> */}
          </View>
        ) : (
          applications.map((app, i) => {
            const isApproved = app.status === 'approved';
            const statusText = app.status === 'pending' || app.status === 'in-process' ? 'In Process'
                              : app.status === 'approved' ? 'Approved' : 'Rejected';
            const statusStyle = isApproved 
              ? { bg: '#d4edda', color: '#155724' }
              : app.status === 'rejected' 
              ? { bg: '#f8d7da', color: '#721c24' }
              : { bg: '#fef3c7', color: '#b45309' };

            return (
              <View key={app.id || i} style={styles.card}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      backgroundColor: isApproved ? '#04ff29ff' : '#6387feff',
                      padding: 10, borderRadius: 8, width: 50, height: 50,
                      justifyContent: 'center', alignItems: 'center'
                    }}>
                      <Image source={{ uri: 'https://i.imgur.com/W3wKSvN.png' }} style={{ width: 30, height: 20 }} />
                    </View>
                    <View style={{ marginLeft: 12 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{app.travelDestination}</Text>
                      <Text style={{ color: '#666', marginTop: 4 }}>{formatDate(app.createdAt)}</Text>
                    </View>
                  </View>

                  <View style={{ backgroundColor: statusStyle.bg, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20 }}>
                    <Text style={{ color: statusStyle.color, fontWeight: '600' }}>{statusText}</Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  }
});