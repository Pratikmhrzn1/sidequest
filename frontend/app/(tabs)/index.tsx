import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

const API_BASE_URL = "http://192.168.18.3:5000/api/travel";

// Responsive helper function
const getResponsiveValue = (width: number, small: number, medium: number, large: number) => {
  if (width < 375) return small;
  if (width < 768) return medium;
  return large;
};

interface Application {
  id: string;
  travelDestination: string;
  createdAt: string;
  status: 'pending' | 'in-process' | 'approved' | 'rejected';
  adminNote?: string | null;
}

export default function TravelDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [hasCompletedCycle, setHasCompletedCycle] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const journeyTexts = [
    "Where your journey begins!",
    "Explore the world with ease!",
    "Your adventure starts here!",
    "Discover new destinations!",
    "Travel made simple!"
  ];
  useEffect(() => {
    if (hasCompletedCycle) return;
    const timer = setInterval(() => {
      setCurrentTextIndex(prev => {
        const next = prev + 1;
        if (next >= journeyTexts.length) {
          setHasCompletedCycle(true);
          return prev;
        }
        setAnimationKey(k => k + 1);
        return next;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [hasCompletedCycle]);

  const getParam = (param: any) => {
    if (typeof param === 'string') return param;
    if (param && typeof param === 'object') return Object.values(param)[0] as string;
    return 'Not selected';
  };

  const residence = getParam(params.residence);
  const destination = getParam(params.destination);
  const nationality = getParam(params.nationality);

  const [applications, setApplications] = useState<Application[]>([]);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!nationality || nationality === 'Not selected') return;
      try {
        const res = await fetch(`${API_BASE_URL}/my-applications?nationality=${nationality}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.applications)) {
          setApplications(data.applications);
        }
      } catch (err) {
        console.log("Backend not ready");
      }
    };
    fetchApplications();
  }, [nationality]);

  const r = (small: number, medium: number, large: number) =>
    getResponsiveValue(dimensions.width, small, medium, large);

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

  const RecentApplications = applications.length > 0
    ? applications.map(app => {
        const isApproved = app.status === 'approved';
        const isRejected = app.status === 'rejected';
        const isInProcess = app.status === 'pending' || app.status === 'in-process';
        return {
          iconBackground: isApproved ? '#04ff29ff' : '#6387feff',
          icon: 'https://i.imgur.com/W3wKSvN.png',
          title: app.travelDestination,
          date: formatDate(app.createdAt),
          status: isInProcess ? 'In Process' : isApproved ? 'Approved' : 'Rejected',
          statusBackground: isApproved ? '#d4edda' : isRejected ? '#f8d7da' : '#fef3c7',
          statusTextColor: isApproved ? '#155724' : isRejected ? '#721c24' : '#b45309',
        };
      })
    : [
        {
          iconBackground: '#6387feff',
          icon: 'https://i.imgur.com/W3wKSvN.png',
          title: destination,
          date: formatDate(new Date().toISOString()),
          status: 'In Process',
          statusBackground: '#fef3c7',
          statusTextColor: '#b45309',
        }
      ];

  const cards = [
    { backgroundColor: '#033374ff', Icon: 'https://i.imgur.com/gOIAiz1.png', title: 'Check Requirements', Navigate: () => router.push({
        pathname: '/explore',
        params: { nationality, destination }
      })
    },
    { backgroundColor: '#033374ff', Icon: 'https://i.imgur.com/flwi3pS.png', title: 'Travel Guides', Navigate: () => router.push('/travel-guides-screens') },
  ];

  const appBarHeight = Platform.OS === 'ios' ? r(100, 80, 120) : r(85, 95, 105);

  const style = StyleSheet.create({
    appBar: {
      height: appBarHeight,
      backgroundColor: '#013E9A',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: r(20, 40, 50),
      paddingTop: Platform.OS === 'ios' ? r(45, 15, 55) : r(15, 20, 25),
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 5,
      elevation: 5,
    },
    title: {
      color: '#fff',
      fontSize: r(22, 30, 36),
      fontWeight: 'bold'
    },
    body: {
      marginTop: appBarHeight + r(8, 10, 12),
      padding: r(16, 20, 24),
    },
    featureCard: {
      width: r(140, 170, 200),
      borderRadius: r(10, 12, 14),
      marginBottom: r(12, 16, 20),
      height: r(90, 110, 130),
      justifyContent: 'center',
      alignItems: 'center',
    },
    featureCardText: { 
      color: '#FFF', 
      fontWeight: '600', 
      marginTop: r(6, 8, 10),
      fontSize: r(12, 14, 16)
    },
    featureCardIcon: { 
      width: r(22, 26, 30), 
      height: r(22, 26, 30) 
    },
    RecentCards: {
      backgroundColor: "#fff",
      padding: r(16, 20, 24),
      borderRadius: r(10, 12, 14),
      elevation: 1,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      marginBottom: r(16, 20, 24),
    },
  });

  const dropdownStyles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: appBarHeight,
      right:0,
      zIndex: 10,
    },
    menu: {
      backgroundColor: '#fff',
      borderRadius: 8,
      width: 150,
      elevation: 6,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
    },
    text: {
      marginLeft: 10,
      fontSize: 15,
      color: '#333',
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* APP BAR */}
      <View style={style.appBar}>
        <Text style={style.title}>Travel-Visa</Text>
        <TouchableOpacity onPress={() => setShowProfileMenu(p => !p)}>
          <FontAwesome name="user-circle-o" size={r(24, 28, 32)} color="white" />
        </TouchableOpacity>
      </View>

      {/* PROFILE DROPDOWN */}
      {showProfileMenu && (
        <TouchableOpacity
          activeOpacity={1}
          style={dropdownStyles.overlay}
          onPress={() => setShowProfileMenu(false)}
        >
          <View style={dropdownStyles.menu}>
            <TouchableOpacity
              style={dropdownStyles.item}
              onPress={() => {
                setShowProfileMenu(false);
                router.replace('/travel-details'); // go to index.tsx
              }}
            >
              <FontAwesome name="sign-in" size={16} color="#333" />
              <Text style={dropdownStyles.text}>Login</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.body}>
          {/* Animated Journey Text */}
          <Animatable.Text
            key={animationKey}
            animation="fadeInLeft"
            duration={800}
            style={{
              fontSize: r(20, 23, 30),
              fontWeight: '700',
              marginBottom: r(16, 20, 24),
            }}
          >
            {journeyTexts[currentTextIndex]}
          </Animatable.Text>

          {/* Main Page Image */}
          <View style={{
            padding: r(16, 20, 24),
            backgroundColor: 'skyblue',
            justifyContent: 'center',
            borderRadius: r(8, 10, 12)
          }}>
            <Image
              source={require("../../assets/images/aeroplane.png")}
              style={{
                width: r(250, 300, 350),
                height: r(140, 170, 200),
                alignSelf: 'center',
              }}
            />
          </View>

          {/* Quick Actions */}
          <View style={{ marginTop: r(8, 18, 18) }}>
            <Text style={{
              marginBottom: r(12, 18, 18),
              fontSize: r(18, 20, 24),
              fontWeight: '600',
              paddingLeft: r(2, 4, 6)
            }}>Quick Actions</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {cards.map((item, index) => (
                <TouchableOpacity key={index} onPress={item.Navigate}>
                  <View style={[style.featureCard, { backgroundColor: item.backgroundColor }]}>
                    <Image source={{ uri: item.Icon }} style={style.featureCardIcon} />
                    <Text style={style.featureCardText}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Search */}
          <View>
            <View style={{
              marginLeft: r(2, 4, 6),
              marginTop: r(4, 5, 6),
              marginBottom: r(8, 10, 12),
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={{ fontSize: r(16, 18, 22), fontWeight: '600' }}>Recent Search</Text>
              <TouchableOpacity onPress={() => router.push({
                pathname: '/view-all-applications',
                params: { nationality }
              })}>
                <Text style={{ color: '#00d0ffff', fontSize: r(14, 16, 18) }}>View All</Text>
              </TouchableOpacity>
            </View>

            <View>
              {RecentApplications.slice(0, 2).map((item, index) => (
                <View style={style.RecentCards} key={index}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <View style={{
                        backgroundColor: item.iconBackground,
                        padding: r(8, 10, 12),
                        borderRadius: r(6, 6, 6),
                        width: r(44, 50, 56),
                        height: r(44, 50, 56),
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <Image
                          source={{ uri: item.icon }}
                          style={{ width: r(26, 30, 34), height: r(18, 20, 22) }}
                        />
                      </View>

                      <View style={{ marginLeft: r(8, 10, 12), flex: 1 }}>
                        <Text style={{
                          fontWeight: 'bold',
                          fontSize: r(14, 16, 18),
                          color: '#333'
                        }}>{item.title}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: r(4, 6, 8) }}>
                          <Image
                            source={{ uri: 'https://i.imgur.com/2J1vXbK.png' }}
                            style={{ width: r(18, 20, 22), height: r(18, 20, 22), marginRight: r(4, 6, 8) }}
                          />
                          <Text style={{ color: '#666', fontSize: r(12, 14, 16) }}>{item.date}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
              {RecentApplications.length === 0 && (
                <Text style={{ textAlign: 'center', color: '#999', marginTop: r(16, 20, 24), fontSize: r(14, 16, 18) }}>
                  No applications yet
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
