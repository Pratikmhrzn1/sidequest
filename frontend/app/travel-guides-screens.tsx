import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
const TravelUpdates = () => {
  const router = useRouter();

  const updates = [
    {
      title: 'Flight Ban Lifted',
      description: 'Flights to Europe are now operational.',
      icon: 'airplane',
      color: '#10B981',
      type: 'Good News',
      date: '2 hours ago',
    },
    {
      title: 'New Visa Rules',
      description: 'Tourist visa duration extended by 3 months.',
      icon: 'document-text',
      color: '#3B82F6',
      type: 'Policy Update',
      date: '5 hours ago',
    },
    {
      title: 'COVID-19 Guidelines',
      description: 'Mask mandate lifted in most countries.',
      icon: 'shield-checkmark',
      color: '#8B5CF6',
      type: 'Health & Safety',
      date: '1 day ago',
    },
  ];

  const importantAlerts = [
    {
      text: 'Travel advisory issued for Southeast Asia due to weather conditions',
      severity: 'warning',
    },
    {
      text: 'New biometric requirements for US visa applications starting next month',
      severity: 'info',
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

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {/* Back Button (ONLY ADDITION) */}
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
          </Pressable>

          <Ionicons name="notifications" size={32} color="#FFFFFF" />
          <Text style={styles.headerTitle}>Travel Updates</Text>
        </View>

        <Text style={styles.headerSubtitle}>
          Stay informed with latest travel news
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Live Badge */}
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Live Updates</Text>
        </View>

        {/* Important Alerts */}
        <View style={styles.alertsSection}>
          <View style={styles.alertsHeader}>
            <Ionicons name="warning" size={20} color="#F59E0B" />
            <Text style={styles.alertsTitle}>Important Alerts</Text>
          </View>

          {importantAlerts.map((alert, idx) => (
            <View
              key={idx}
              style={[
                styles.alertItem,
                {
                  borderLeftColor:
                    alert.severity === 'warning' ? '#F59E0B' : '#3B82F6',
                },
              ]}
            >
              <Ionicons
                name={
                  alert.severity === 'warning'
                    ? 'alert-circle'
                    : 'information-circle'
                }
                size={18}
                color={
                  alert.severity === 'warning' ? '#F59E0B' : '#3B82F6'
                }
              />
              <Text style={styles.alertText}>{alert.text}</Text>
            </View>
          ))}
        </View>

        {/* Updates Cards */}
        <View style={styles.updatesSection}>
          <Text style={styles.sectionTitle}>Recent Updates</Text>

          {updates.map((item, index) => (
            <View
              key={index}
              style={[styles.card, { borderLeftColor: item.color }]}
            >
              <View
                style={[styles.iconCircle, { backgroundColor: item.color }]}
              >
                <Ionicons name={item.icon as any} size={24} color="#FFFFFF" />
              </View>

              <View style={styles.cardContent}>
                <View style={styles.metaRow}>
                  <View
                    style={[
                      styles.typeBadge,
                      { backgroundColor: `${item.color}15` },
                    ]}
                  >
                    <Text style={[styles.typeText, { color: item.color }]}>
                      {item.type}
                    </Text>
                  </View>
                  <View style={styles.timeContainer}>
                    <Ionicons
                      name="time-outline"
                      size={12}
                      color="#94A3B8"
                    />
                    <Text style={styles.timeText}>{item.date}</Text>
                  </View>
                </View>

                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>

                <View style={styles.readMoreContainer}>
                  <Text
                    style={[
                      styles.readMoreText,
                      { color: item.color },
                    ]}
                  >
                    Read more
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={item.color}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Footer Note */}
        <View style={styles.footerNote}>
          <Ionicons
            name="information-circle-outline"
            size={16}
            color="#64748B"
          />
          <Text style={styles.footerText}>
            Updates are verified from official sources. Last updated: Today at
            3:45 PM
          </Text>
        </View>
      </ScrollView>
    </View>
    </>
    
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#013E9A',
    paddingTop: Platform.OS === 'ios' ? 30 : 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButton: {
    marginRight: 8,
    padding: 4,
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
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#991B1B',
  },
  alertsSection: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  alertsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginLeft: 8,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
  },
  alertText: {
    flex: 1,
    fontSize: 13,
    color: '#475569',
    marginLeft: 10,
    lineHeight: 18,
  },
  updatesSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    borderLeftWidth: 4,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11,
    color: '#94A3B8',
    marginLeft: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 13,
    fontWeight: '600',
    marginRight: 4,
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    padding: 16,
    borderRadius: 12,
  },
  footerText: {
    flex: 1,
    fontSize: 12,
    color: '#64748B',
    marginLeft: 8,
  },
});

export default TravelUpdates;
