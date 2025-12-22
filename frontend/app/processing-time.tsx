import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, StatusBar,Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
const ProcessingTime = () => {
  const router = useRouter();
  const processingTimes = [
    { 
      type: 'Tourist Visa', 
      duration: '5-10 Business Days',
      icon: 'airplane',
      color: '#10B981',
      gradient: ['#D1FAE5', '#A7F3D0']
    },
    { 
      type: 'Business Visa', 
      duration: '7-14 Business Days',
      icon: 'briefcase',
      color: '#3B82F6',
      gradient: ['#DBEAFE', '#BFDBFE']
    },
    { 
      type: 'Student Visa', 
      duration: '2-4 Weeks',
      icon: 'school',
      color: '#8B5CF6',
      gradient: ['#EDE9FE', '#DDD6FE']
    },
    { 
      type: 'Work Visa', 
      duration: '3-6 Weeks',
      icon: 'briefcase-outline',
      color: '#F59E0B',
      gradient: ['#FEF3C7', '#FDE68A']
    },
  ];

  return (
    <>
    <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#013E9A" />
      {/* Processing Time Estimated visa processing durations  */}
      {/* Header */}
      {/* Header */}
<View style={styles.header}>
  <View style={styles.headerContent}>
    {/* Back Button */}
    <Pressable
      onPress={() => router.canGoBack() && router.back()}
      hitSlop={10}
      style={styles.backButton}
    >
      <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
    </Pressable>

    {/* Existing Icon */}
    <Ionicons name="notifications" size={32} color="#FFFFFF" />

    {/* Existing Title */}
    <Text style={styles.headerTitle}>Processing Time</Text>
  </View>

  {/* Existing Subtitle */}
  <Text style={styles.headerSubtitle}>
    Estimated visa processing duration.
  </Text>
</View>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {processingTimes.map((item, index) => (
          <View 
            key={index} 
            style={[
              styles.card,
              { 
                borderLeftColor: item.color,
                backgroundColor: '#FFFFFF'
              }
            ]}
          >
            {/* Icon Circle */}
            <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon as any} size={28} color="#FFFFFF" />
            </View>

            {/* Content */}
            <View style={styles.cardContent}>
              <Text style={styles.visaType}>{item.type}</Text>
              
              <View style={styles.durationContainer}>
                <Ionicons name="hourglass-outline" size={16} color={item.color} />
                <Text style={[styles.duration, { color: item.color }]}>
                  {item.duration}
                </Text>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressBarBg}>
                <View 
                  style={[
                    styles.progressBar, 
                    { 
                      backgroundColor: item.color,
                      width: `${(index + 1) * 20}%` 
                    }
                  ]} 
                />
              </View>
            </View>

            {/* Status Badge */}
            <View style={[styles.badge, { backgroundColor: `${item.color}15` }]}>
              <Text style={[styles.badgeText, { color: item.color }]}>
                Standard
              </Text>
            </View>
          </View>
        ))}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle" size={24} color="#3B82F6" />
            <Text style={styles.infoTitle}>Important Note</Text>
          </View>
          <Text style={styles.infoText}>
            Processing times are estimates and may vary based on individual circumstances, 
            application completeness, and current processing volumes. Rush processing may 
            be available for certain visa types.
          </Text>
        </View>

        {/* Quick Facts */}
        <View style={styles.factsContainer}>
          <Text style={styles.factsTitle}>Quick Facts</Text>
          
          <View style={styles.factItem}>
            <View style={styles.factIconCircle}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            </View>
            <Text style={styles.factText}>
              Applications are processed in order of submission
            </Text>
          </View>

          <View style={styles.factItem}>
            <View style={styles.factIconCircle}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            </View>
            <Text style={styles.factText}>
              Complete applications process faster
            </Text>
          </View>

          <View style={styles.factItem}>
            <View style={styles.factIconCircle}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            </View>
            <Text style={styles.factText}>
              Track your application status online 24/7
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
    </>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#013E9A',
    paddingTop: Platform.OS === 'ios' ? 30 : 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  backButton: {
  marginRight: 8,
  padding: 4,
},
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#BFDBFE',
    marginLeft: 44,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  visaType: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  duration: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 6,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
  },
  factsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  factsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  factItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  factIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  factText: {
    flex: 1,
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
});

export default ProcessingTime;