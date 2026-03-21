
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Animated,
  Platform,
  Dimensions,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { API_URL } from '@env';
import { COLORS } from '../constants/Colors';
import type { RootStackParamList } from '../navigation/Navigator';

import {
  VisaAppBar,
  LoadingView,
  ErrorView,
  EmptyVisaView,
  VisaContent,
  getResponsiveValue,
} from '../components/VisaRequirements/index';
import type { VisaInfo } from '../components/VisaRequirements/index';

const API_BASE_URL = API_URL;


type VisaNavProp   = NativeStackNavigationProp<RootStackParamList, 'VisaRequirement'>;
type VisaRouteProp = RouteProp<RootStackParamList, 'VisaRequirement'>;


export default function VisaRequirementScreen() {
  const navigation = useNavigation<VisaNavProp>();
  const route      = useRoute<VisaRouteProp>();
  const { nationality, destination } = route.params;

  const { width }  = useWindowDimensions();
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

 
  const [visaInfo, setVisaInfo] = useState<VisaInfo | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const [fadeAnim]              = useState(new Animated.Value(0));

  
  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) =>
      setDimensions(window),
    );
    return () => sub?.remove();
  }, []);

  useEffect(() => {
    fetchVisaInfo();
  
  }, [nationality, destination]);

 
  const r = (s: number, m: number, l: number) =>
    getResponsiveValue(dimensions.width, s, m, l);

  const appBarHeight =
    Platform.OS === 'ios' ? r(100, 100, 120) : r(85, 100, 105);

  // ── API ────────────────────────────────────────────────────────────────────
  const fetchVisaInfo = async () => {
    if (!nationality || !destination) {
      setError('Please select both nationality and destination');
      setLoading(false);
      return;
    }

    setVisaInfo(null);
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ nationality, destination });
      console.log('URL being called:', `${API_BASE_URL}/visa?${params}`);
      const res    = await fetch(`${API_BASE_URL}/visa?${params}`);
      const data   = await res.json();

      if (!res.ok) throw new Error(data.message || `HTTP error! status: ${res.status}`);

      if (data.success) {
        setVisaInfo(data.data);
        Animated.timing(fadeAnim, {
          toValue:         1,
          duration:        500,
          useNativeDriver: true,
        }).start();
      } else {
        setError(data.message || 'Failed to fetch visa information');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load visa requirements. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () =>
    navigation.navigate('TravelDetails', {
      residence:   '',
      destination,
      nationality,
    });

  const originData      = visaInfo?.origin?.[0];
  const destinationInfo = originData?.destination?.[0];
  const contentWidth    = width - r(100, 120, 140);



  if (loading) return <LoadingView />;

  if (error) return <ErrorView message={error} onGoBack={() => navigation.goBack()} />;

  if (!nationality || !destination) {
    return (
      <View style={baseStyles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <VisaAppBar appBarHeight={appBarHeight} onBack={goBack} showBack={false} r={r} />
      </View>
    );
  }

  return (
    <View style={baseStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <VisaAppBar appBarHeight={appBarHeight} onBack={goBack} r={r} />

      <ScrollView
        style={baseStyles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop:    appBarHeight + r(8, 10, 12),
          paddingHorizontal: r(16, 20, 24),
          paddingBottom: r(60, 80, 100),
        }}>

       
        {!destinationInfo || !destinationInfo.details ? (
          <EmptyVisaView
            nationality={nationality}
            destination={destination}
          />
        ) : (
         
          <VisaContent
            nationality={nationality}
            destination={destination}
            destinationInfo={destinationInfo}
            fadeAnim={fadeAnim}
            contentWidth={contentWidth}
            r={r}
          />
        )}

      </ScrollView>
    </View>
  );
}

import { StyleSheet } from 'react-native';

const baseStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcf8f8' },
  scroll:    { flex: 1 },
});