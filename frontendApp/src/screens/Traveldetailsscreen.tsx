

import React, { useEffect, useState } from 'react';
import { View, ScrollView, Platform, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { API_URL } from '@env';
import type { RootStackParamList } from '../navigation/Navigator';

import {
  TravelAppBar,
  HeroBanner,
  QuickActions,
  RecentSearches,
  buildRecentApplications,
  getResponsiveValue,
} from '../components/Main/index';
import type { Application } from '../components/Main/index';

const API_BASE_URL = API_URL;

type TravelDetailsNavProp = NativeStackNavigationProp<RootStackParamList, 'TravelDetails'>;
type TravelDetailsRouteProp = RouteProp<RootStackParamList, 'TravelDetails'>;


const JOURNEY_TEXTS = [
  'Where your journey begins!',
  'Explore the world with ease!',
  'Your adventure starts here!',
  'Discover new destinations!',
  'Travel made simple!',
];


export default function TravelDetailsScreen() {
  const navigation = useNavigation<TravelDetailsNavProp>();
  const route      = useRoute<TravelDetailsRouteProp>();
  const { residence, destination, nationality } = route.params;

 
  const [currentTextIndex,  setCurrentTextIndex]  = useState(0);
  const [animationKey,      setAnimationKey]      = useState(0);
  const [hasCompletedCycle, setHasCompletedCycle] = useState(false);
  const [showProfileMenu,   setShowProfileMenu]   = useState(false);
  const [applications,      setApplications]      = useState<Application[]>([]);
  const [dimensions,        setDimensions]        = useState(Dimensions.get('window'));

 
  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) =>
      setDimensions(window),
    );
    return () => sub?.remove();
  }, []);

  useEffect(() => {
    if (hasCompletedCycle) return;
    const timer = setInterval(() => {
      setCurrentTextIndex(prev => {
        const next = prev + 1;
        if (next >= JOURNEY_TEXTS.length) {
          setHasCompletedCycle(true);
          return prev;
        }
        setAnimationKey(k => k + 1);
        return next;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [hasCompletedCycle]);

  useEffect(() => {
    if (!nationality || nationality === 'Not selected') return;
    (async () => {
      try {
        const res  = await fetch(
          `${API_BASE_URL}/my-applications?nationality=${nationality}`,
        );
        const data = await res.json();
        if (data.success && Array.isArray(data.applications)) {
          setApplications(data.applications);
        }
      } catch {
        console.log('Backend not ready');
      }
    })();
  }, [nationality]);


  const r = (s: number, m: number, l: number) =>
    getResponsiveValue(dimensions.width, s, m, l);

  const appBarHeight =
    Platform.OS === 'ios' ? r(100, 80, 120) : r(85, 95, 105);

  
  const recentApplications = buildRecentApplications(applications, destination);

  const quickActionCards = [
    {
      backgroundColor: '#033374ff',
      Icon:  'https://i.imgur.com/gOIAiz1.png',
      title: 'Check Requirements',
      Navigate: () => navigation.navigate('VisaRequirement', { nationality, destination }),
    },
    {
      backgroundColor: '#033374ff',
      Icon:  'https://i.imgur.com/flwi3pS.png',
      title: 'Travel Guides',
      Navigate: () => console.log('Navigate to Travel Guides'),
    },
  ];

 
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>

      <TravelAppBar
        appBarHeight={appBarHeight}
        showMenu={showProfileMenu}
        onToggleMenu={() => setShowProfileMenu(p => !p)}
        onCloseMenu={() => setShowProfileMenu(false)}
        onLoginPress={() => {
          setShowProfileMenu(false);
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        }}
        r={r}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: appBarHeight + r(8, 10, 12),
          padding:   r(16, 20, 24),
        }}>

        <HeroBanner
          text={JOURNEY_TEXTS[currentTextIndex]}
          animationKey={animationKey}
          r={r}
        />

        <QuickActions
          cards={quickActionCards}
          r={r}
        />

        <RecentSearches
          items={recentApplications}
          onViewAll={() => navigation.navigate('ViewAllApplications', { nationality })}
          r={r}
        />

      </ScrollView>
    </View>
  );
}