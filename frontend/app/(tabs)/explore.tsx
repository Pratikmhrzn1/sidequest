import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
const API_BASE_URL = "http://192.168.18.3:5000/api/travel";

export default function VisaRequirementScreen() {
  const router = useRouter();

  const params = useLocalSearchParams();

  const getParam = (param: any) => {
    if (typeof param === 'string') return param;
    if (param && typeof param === 'object' && Array.isArray(param)) return param[0] as string;
    if (param && typeof param === 'object') return Object.values(param)[0] as string;
    return '';
  };

  const nationality = getParam(params.nationality);
  const destination = getParam(params.destination);

  const [visaInfo, setVisaInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisaInfo = async () => {
      if (!nationality || !destination) {
        setLoading(false);
        setError("Please select both nationality and destination");
        setVisaInfo(null); // Reset visa info when params are missing
        return;
      }

      // Reset state when params change to prevent showing old data
      setVisaInfo(null);
      setLoading(true);
      setError(null);

      try {
        // Send nationality and destination as query parameters
        const queryParams = new URLSearchParams({
          nationality: nationality,
          destination: destination
        });
        
        const res = await fetch(`${API_BASE_URL}/visa?${queryParams}`);
        const data = await res.json();
        
        // console.log("Visa Info Response:", JSON.stringify(data, null, 2)); // Debug

        if (!res.ok) {
          throw new Error(data.message || `HTTP error! status: ${res.status}`);
        }

        if (data.success) {
          setVisaInfo(data.data);
          // console.log("Visa Data Set:", JSON.stringify(data.data, null, 2));
        } else {
          setError(data.message || "Failed to fetch visa information");
        }
      } catch (err: any) {
        console.error("Failed to fetch visa info:", err);
        setError(err.message || "Failed to load visa requirements. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchVisaInfo();
  }, [nationality, destination]);

  // When backend filters, it returns: { origin: [{ country, nationality, destination: [destData] }] }
  // So we can access it directly
  const originData = visaInfo?.origin?.[0];
  const destinationInfo = originData?.destination?.[0];

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text style={styles.loadingText}>Loading visa requirements...</Text>
      </View>
    );
  }

  if (error) {
    return (

      <ScrollView style={styles.container} contentContainerStyle={styles.errorContainer}>
        
        <View style={styles.errorCard}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Error</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </ScrollView>
    );
  }

  if (!nationality || !destination) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.errorContainer}>
        
        <View style={styles.errorCard}>
          <Text style={styles.errorIcon}>ℹ️</Text>
          <Text style={styles.errorTitle}>Missing Information</Text>
          <Text style={styles.errorText}>Please select both nationality and destination to view visa requirements.</Text>
        </View>
      </ScrollView>
    );
  }

  if (!destinationInfo || !destinationInfo.details) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>Visa Requirements</Text>
          </View>
          <Text style={styles.title}>
            {nationality} → {destination}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.noInfoIcon}>📋</Text>
          <Text style={styles.noInfo}>
            No specific visa information available for this route yet.
          </Text>
          <Text style={styles.noInfoSubtext}>
            Please check back later or contact our support team for assistance.
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topBar}>
  <Ionicons
    name="arrow-back"
    size={30}
    color="#373333ff"
    onPress={() =>
      router.push({
        pathname: '/travel-details',
        params: { nationality, destination }
      })
    }
  />
</View>

      <View style={styles.header}>
        {/* <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>Visa Requirements</Text>
        </View> */}
        <Text style={styles.title}>
          The details of {destination} visa for {nationality} citizens is as follows:
        </Text>
        {/* <View style={styles.routeIndicator}>
          <View style={styles.routeDot} />
          <View style={styles.routeLine} />
          <View style={styles.routeDot} />
        </View> */}
      </View>

      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>ℹ️</Text>
          <Text style={styles.sectionTitle}>Visa Information</Text>
        </View>

        {destinationInfo.details?.type === 'string' ? (
          <View style={styles.textContainer}>
            <Text style={styles.paragraph}>
              {destinationInfo.details.text}
            </Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {destinationInfo.details?.text?.map((item: string, i: number) => (
              <View style={styles.bulletItem} key={i}>
                <View style={styles.bulletPoint} />
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          These data are based on previous reports. Please verify with official sources.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8FAFC',
    padding: 20
  },
  topBar: {
    display:"flex",
    gap:5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sussy:{
      color:'blue',
      fontSize:20,
      fontWeight:'bold'
  },
  
  contentContainer: { 
    padding: 20,
    paddingBottom: 40
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500'
  },
  header: { 
    marginBottom: 12, 
    alignItems: 'center' 
  },
  headerBadge: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12
  },
  headerBadgeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase'
  },
  title: { 
    fontSize: 16, 
    fontWeight: '500', 
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 12
  },
  // routeIndicator: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginTop: 8
  // },
  // routeDot: {
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  //   backgroundColor: '#6366F1'
  // },
  // routeLine: {
  //   width: 60,
  //   height: 2,
  //   backgroundColor: '#CBD5E1',
  //   marginHorizontal: 8
  // },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#F1F5F9'
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 12
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#1E293B' 
  },
  textContainer: {
    marginTop: 8
  },
  paragraph: { 
    fontSize: 16, 
    lineHeight: 10, 
    color: '#475569',
    textAlign: 'justify'
  },
  listContainer: {
    marginTop: 8
  },
  bulletItem: { 
    flexDirection: 'row', 
    marginVertical: 10,
    alignItems: 'flex-start'
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6366F1',
    marginTop: 8,
    marginRight: 16,
    marginLeft: 4
  },
  bulletText: { 
    fontSize: 15, 
    flex: 1, 
    color: '#475569',
    lineHeight: 24
  },
  noInfoIcon: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 16
  },
  noInfo: { 
    fontSize: 18, 
    color: '#64748B', 
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 8
  },
  noInfoSubtext: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 400
  },
  errorCard: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    maxWidth: 400
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 12
  },
  errorText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24
  },
  footer: {
    marginTop: 8,
    padding: 16,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    // borderLeftWidth: 2,
    // borderLeftColor: '#6366F1'
  },
  footerText: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 18
  }
});