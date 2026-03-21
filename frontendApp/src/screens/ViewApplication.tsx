import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ChevronLeft } from 'lucide-react-native';
import { API_URL } from '@env';
import type { RootStackParamList } from '../navigation/Navigator';
import { COLORS } from '../constants/Colors';

const API_BASE_URL = API_URL;

interface Application {
  id: string;
  travelDestination: string;
  createdAt: string;
  status: 'pending' | 'in-process' | 'approved' | 'rejected';
}

type ViewAllRouteProp = RouteProp<RootStackParamList, 'ViewAllApplications'>;

const formatDate = (dateString: string): string => {
  const date   = new Date(dateString);
  const day    = date.getDate();
  const month  = date.toLocaleString('en-GB', { month: 'short' });
  const year   = date.getFullYear();
  const suffix =
    day % 10 === 1 && day !== 11 ? 'st'
    : day % 10 === 2 && day !== 12 ? 'nd'
    : day % 10 === 3 && day !== 13 ? 'rd'
    : 'th';
  return `${day}${suffix} ${month}, ${year}`;
};

const getStatusStyle = (status: Application['status']) => {
  switch (status) {
    case 'approved': return { bg: '#d4edda', color: '#155724', label: 'Approved'   };
    case 'rejected': return { bg: '#f8d7da', color: '#721c24', label: 'Rejected'   };
    default:         return { bg: '#fef3c7', color: '#b45309', label: 'In Process' };
  }
};

export default function ViewAllApplicationsScreen() {
  const navigation = useNavigation();
  const route      = useRoute<ViewAllRouteProp>();
  const nationality = route.params?.nationality?.trim() ?? '';

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    if (!nationality) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const res  = await fetch(
          `${API_BASE_URL}/my-applications?nationality=${encodeURIComponent(nationality)}`,
        );
        const data = await res.json();
        setApplications(data.success && Array.isArray(data.applications)
          ? data.applications
          : []);
      } catch (err) {
        console.error('Fetch error:', err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [nationality]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#013E9A" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={10}
            style={styles.backButton}>
            <ChevronLeft color='#fff' size={22}/>
          </Pressable>
          <Text style={styles.headerTitle}>All Applications</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Showing for citizenship of {nationality}
        </Text>
      </View>

      {/* List */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}>

        {applications.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No applications found</Text>
          </View>
        ) : (
          applications.map((app, i) => {
            const st         = getStatusStyle(app.status);
            const isApproved = app.status === 'approved';

            return (
              <View key={app.id ?? i} style={styles.card}>
                <View style={styles.cardRow}>
                  {/* Left — icon + destination + date */}
                  <View style={styles.cardLeft}>
                    <View style={[
                      styles.iconBox,
                      { backgroundColor: isApproved ? '#04ff29' : '#6387fe' },
                    ]}>
                      <Image
                        source={{ uri: 'https://i.imgur.com/W3wKSvN.png' }}
                        style={styles.flagImg}
                      />
                    </View>
                    <View style={styles.cardInfo}>
                      <Text style={styles.destination}>{app.travelDestination}</Text>
                      <Text style={styles.date}>{formatDate(app.createdAt)}</Text>
                    </View>
                  </View>

                  {/* Right — status badge */}
                  <View style={[styles.badge, { backgroundColor: st.bg }]}>
                    <Text style={[styles.badgeText, { color: st.color }]}>
                      {st.label}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safe:        { flex: 1, backgroundColor: '#f5f5f5' },
  center:      { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  loadingText: { marginTop: 10, color: '#666' },


  header: {
    backgroundColor: COLORS.primary,
    paddingTop:    Platform.OS === 'ios' ? 16 : 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerContent:  { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  backButton:     { marginRight: 8, padding: 4 },
  headerTitle:    { fontSize: 24, fontWeight: '700', color: '#fff', marginLeft: 12 },
  headerSubtitle: { fontSize: 14, color: '#BFDBFE', marginLeft: 44 },


  scroll:       { flex: 1 },
  listContent:  { padding: 20, paddingTop: 24 },


  card: {
    backgroundColor: '#fff',
    padding:      16,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardLeft:   { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconBox: {
    width: 48, height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagImg:     { width: 28, height: 18 },
  cardInfo:    { marginLeft: 12, flex: 1 },
  destination: { fontWeight: '700', fontSize: 16, color: '#222' },
  date:        { color: '#888', marginTop: 4, fontSize: 13 },

  badge: {
    paddingHorizontal: 12,
    paddingVertical:   6,
    borderRadius: 20,
    marginLeft: 8,
  },
  badgeText: { fontWeight: '600', fontSize: 13 },

  emptyState: { alignItems: 'center', marginTop: 80, gap: 12 },
  emptyText:  { fontSize: 16, color: '#999' },
});