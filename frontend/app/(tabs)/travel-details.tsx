import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
const API_BASE_URL = "http://192.168.18.3:5000/api/travel";

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

  const getParam = (param: any) => {
    if (typeof param === 'string') return param;
    if (param && typeof param === 'object') return Object.values(param)[0] as string;
    return 'Not selected';
  };

  const residence = getParam(params.residence);
  const destination = getParam(params.destination);
  const nationality = getParam(params.nationality);

  const [applications, setApplications] = useState<Application[]>([]);

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

  // const userData = [
  //   { title: 'From:', value: residence },
  //   { title: 'Going to:', value: destination },
  //   { title: 'Citizen of:', value: nationality }
  // ];

  const cards = [
    { backgroundColor: 'blue', Icon: 'https://i.imgur.com/gOIAiz1.png', title: 'Visa Requirements', Navigate: () => router.push({
        pathname: '/visa-requirement-screen',
        params: { nationality, destination }
      })
    },
    { backgroundColor: 'purple', Icon: 'https://i.imgur.com/flwi3pS.png', title: 'Travel Guides', Navigate: () => router.push('/travel-guides-screens') },
    { backgroundColor: 'orange', Icon: 'https://img.icons8.com/m_outlined/512/FFFFFF/clock.png', title: 'Processing Times', Navigate: () => router.push('/processing-time') },
    { backgroundColor: 'green', Icon: 'https://i.imgur.com/fO4rnUj.png', title: 'Travel Updates', Navigate: () => router.push('/travel-updates') },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={style.appBar}>
                {/* <Ionicons name="menu" size={28} color="white" /> */}
                <Text style={style.title}>Travel-Visa</Text>
                <FontAwesome name="user-circle-o" size={28} color="white" />
              </View>
      <View style={style.body}>
        <View>
        <Text style={{marginBottom: 10, fontSize: 23,fontStyle:'bold', paddingLeft: 4 }}>Where your journey begins!</Text>
        </View>
        {/* Main page  */}
        <View style={{padding:20, backgroundColor:'skyblue', display:'flex', justifyContent:"center", borderRadius:8}
        }>
        <Image
        source={require("../../assets/images/aeroplane.png")}
        style={{ width: 300, height:170, alignItems:'center' }}
        />
        </View>
        {/* Quick Actions */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginBottom: 15, fontSize: 20,fontWeight:600, paddingLeft: 4 }}>Quick Actions</Text>
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
          <View style={{ marginTop: 20, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>Recent Search</Text>
            <TouchableOpacity onPress={() => router.push({
              pathname: '/view-all-applications',
              params: { nationality }
            })}>
              <Text style={{ color: '#00d0ffff' }}>View All</Text>
            </TouchableOpacity>
          </View>

          <View>
            {RecentApplications.slice(0, 2).map((item, index) => (
              <View style={style.RecentCards} key={index}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      backgroundColor: item.iconBackground,
                      padding: 10,
                      borderRadius: 8,
                      width: 50,
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <Image source={{ uri: item.icon }} style={{ width: 30, height: 20 }} />
                    </View>

                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#333' }}>
                        {item.title}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: 'https://i.imgur.com/2J1vXbK.png' }} style={{ width: 20, height: 20, marginRight: 6 }} />

                        <Text style={{ color: '#666' }}>{item.date}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={{
                    backgroundColor: item.statusBackground,
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 20,
                  }}>
                    <Text style={{ color: item.statusTextColor, fontWeight: '600' }}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}

            {RecentApplications.length === 0 && (
              <Text style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>
                No applications yet
              </Text>
            )}
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

export const style = StyleSheet.create({
  body: { marginTop: 10, padding: 20, marginBottom:10 },
  container: {
    backgroundColor: "#8a2be2",
    padding: 15,
    borderRadius: 8,
    shadowOpacity: 3,
    shadowColor: '#000',
    marginBottom: 10,
  },
  value: { color: '#e0e7ff', fontSize: 18 },
  paragraph: { color: "#FFF", fontSize: 18 },
  featureCard: {
    width: 170,
    borderRadius: 12,
    marginBottom: 16,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureCardText: { color: '#FFF', fontWeight: '600', marginTop: 8 },
  featureCardIcon: { width: 26, height: 26 },
  RecentCards: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  appBar: {
    height: Platform.OS === 'ios' ? 110 : 95,
    backgroundColor: '#190581ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  title: { color: '#fff', fontSize: 30, fontWeight: 'bold' },
});