import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
const API_BASE_URL = "http://192.168.18.3:5000/api/travel";
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

export default function VisaRequirementScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { width } = useWindowDimensions();
  
  const getParam = (param: any) => {
    if (typeof param === 'string') return param;
    if (param && typeof param === 'object' && Array.isArray(param)) return param[0] as string;
    if (param && typeof param === 'object') return Object.values(param)[0] as string;
    return '';
  };

  const nationality = getParam(params.nationality);
  const destination = getParam(params.destination);

  // Define types for the visa info structure
  interface VisaDetails {
    text?: string[];
  }

  interface Destination {
    details?: VisaDetails;
  }

  interface Origin {
    country?: string;
    nationality?: string;
    destination?: Destination[];
  }

  interface VisaInfo {
    origin?: Origin[];
  }

  const [visaInfo, setVisaInfo] = useState<VisaInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchVisaInfo = async () => {
      if (!nationality || !destination) {
        setLoading(false);
        setError("Please select both nationality and destination");
        setVisaInfo(null);
        return;
      }

      setVisaInfo(null);
      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams({
          nationality: nationality,
          destination: destination
        });
        
        const res = await fetch(`${API_BASE_URL}/visa?${queryParams}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || `HTTP error! status: ${res.status}`);
        }

        if (data.success) {
          setVisaInfo(data.data);
          // Animate content in
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
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

  const originData = visaInfo?.origin?.[0];
  const destinationInfo = originData?.destination?.[0];

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.loadingText}>Loading visa requirements...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <View style={styles.errorCard}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>Error</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => router.back()}
            >
              <Text style={styles.retryButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  if (!nationality || !destination) {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <View style={styles.errorCard}>
            <Text style={styles.errorIcon}>ℹ️</Text>
            <Text style={styles.errorTitle}>Missing Information</Text>
            <Text style={styles.errorText}>
              Please select both nationality and destination to view visa requirements.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  if (!destinationInfo || !destinationInfo.details) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
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
            <Text style={styles.noInfo}>No specific visa information available for this route yet.</Text>
            <Text style={styles.noInfoSubtext}>
              Please check back later or contact our support team for assistance.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity 
          style={styles.topBar}
          onPress={() => router.push({
            pathname: '/travel-details',
            params: { nationality, destination }
          })}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#6366F1" />
          <Text style={styles.sussy}>Back</Text>
        </TouchableOpacity>

        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.header}>
            {/* <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>Visa Requirements</Text>
            </View> */}
            <Text style={styles.title}>
              The details of {destination} visa for {nationality} citizens is as follows:
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <View style={styles.iconCircle}>
                <Text style={styles.sectionIcon}>ℹ️</Text>
              </View>
              <Text style={styles.sectionTitle}>Visa Information</Text>
            </View>

            <View style={styles.contentWrapper}>
              {destinationInfo.details?.text?.map((item: string, i: number) => {
                const hasContent = item && item.trim().length > 0;
                
                if (!hasContent) return null;

                return (
                  <View key={i} style={styles.htmlContentBlock}>
                    <RenderHTML
                      contentWidth={width - 80}
                      source={{ html: item }}
                      tagsStyles={{
                        h2: { 
                          fontSize: 22, 
                          fontWeight: '700', 
                          marginTop: 20,
                          marginBottom: 12,
                          color: '#1E293B',
                          borderBottomWidth: 2,
                          borderBottomColor: '#E2E8F0',
                          paddingBottom: 8
                        },
                        h3: { 
                          fontSize: 19, 
                          fontWeight: '700', 
                          marginTop: 16,
                          marginBottom: 10,
                          color: '#334155'
                        },
                        h4: { 
                          fontSize: 17, 
                          fontWeight: '600', 
                          marginTop: 14,
                          marginBottom: 8,
                          color: '#475569'
                        },
                        p: { 
                          fontSize: 15, 
                          marginVertical: 8,
                          lineHeight: 26,
                          color: '#475569',
                          textAlign: 'justify'
                        },
                        ul: {
                          marginVertical: 10,
                          paddingLeft: 12,
                          backgroundColor: '#F8FAFC',
                          borderRadius: 8,
                          padding: 12
                        },
                        ol: {
                          marginVertical: 10,
                          paddingLeft: 12,
                          backgroundColor: '#F8FAFC',
                          borderRadius: 8,
                          padding: 12
                        },
                        li: {
                          fontSize: 15,
                          lineHeight: 26,
                          marginVertical: 6,
                          color: '#475569'
                        },
                        strong: {
                          fontWeight: '700',
                          color: '#1E293B'
                        },
                        em: {
                          fontStyle: 'italic',
                          color: '#64748B'
                        },
                        a: {
                          color: '#6366F1',
                          textDecorationLine: 'underline',
                          fontWeight: '500'
                        },
                        blockquote: {
                          borderLeftWidth: 4,
                          borderLeftColor: '#6366F1',
                          paddingLeft: 16,
                          marginVertical: 12,
                          backgroundColor: '#EEF2FF',
                          padding: 12,
                          borderRadius: 8
                        },
                        table: {
                          marginVertical: 12,
                          borderWidth: 1,
                          borderColor: '#E2E8F0',
                          borderRadius: 8
                        },
                        th: {
                          backgroundColor: '#F1F5F9',
                          padding: 10,
                          fontWeight: '700',
                          color: '#1E293B'
                        },
                        td: {
                          padding: 10,
                          borderWidth: 1,
                          borderColor: '#E2E8F0',
                          color: '#475569'
                        }
                      }}
                      defaultTextProps={{
                        selectable: true
                      }}
                      renderersProps={{
                        img: {
                          enableExperimentalPercentWidth: true
                        }
                      }}
                      baseStyle={{
                        fontSize: 15,
                        color: '#475569'
                      }}
                    />
                    {i < (destinationInfo.details?.text?.length ?? 0) - 1 && (
                      <View style={styles.divider} />
                    )}
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.footer}>
            <Ionicons name="information-circle-outline" size={16} color="#6366F1" style={{ textAlign: 'center', marginBottom: 8 }} />
            <Text style={styles.footerText}>
              These data are based on previous reports. Please verify with official sources.
            </Text>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  sussy: {
    color: '#6366F1',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerBadge: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  headerBadgeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#E2E8F0',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sectionIcon: {
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  contentWrapper: {
    marginTop: 8,
  },
  htmlContentBlock: {
    marginVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 20,
    marginHorizontal: 0,
  },
  noInfoIcon: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 16,
  },
  noInfo: {
    fontSize: 18,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 8,
  },
  noInfoSubtext: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 400,
  },
  errorCard: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    maxWidth: 400,
    width: '100%',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 8,
    padding: 16,
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#6366F1',
  },
  footerText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});