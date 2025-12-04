import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  Platform,
  Image
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from './index';
const API_BASE_URL = "http://192.168.18.3:5000/api/travel";
 
export default function App(){
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
  const userData = [
    {
      title: 'From',
      value:residence,
      flag: 'https://i.imgur.com/Q8SO10S.png'
    },
     {
      title: 'Going to',
      value:destination,
       flag: 'https://static.vecteezy.com/system/resources/previews/047/657/255/non_2x/american-flag-transparent-png.png'
    },
    {
      title: 'Citizen of',
      value:nationality,
       flag: 'https://i.imgur.com/Q8SO10S.png'
    }

  ]
  const cards = [
    {
      backgroundColor: 'blue',
      Icon: 'https://i.imgur.com/gOIAiz1.png',
      title: 'Check Visa Requirements',
    },
      {
      backgroundColor: 'purple',
      Icon: 'https://i.imgur.com/flwi3pS.png',
      title: 'Travel Guides',
    },
     {
      backgroundColor: 'orange',
      Icon: 'https://img.icons8.com/m_outlined/512/FFFFFF/clock.png',
      title: 'Processing Times',
    },
     {
      backgroundColor: 'green',
      Icon: 'https://i.imgur.com/fO4rnUj.png',
      title: 'Travel Updates',
    },

  ]
  const RecentApplications = [
    {
      iconBackground: '#6387feff',
      icon:'https://i.imgur.com/W3wKSvN.png',
      title: destination,
      date: '12th Jan, 2024',
      status: 'In Process',
      statusBackground:'#fef3c7',
    },
      {
      iconBackground: '#04ff29ff',
      icon:'https://i.imgur.com/fO4rnUj.png',
      title: 'United Kingdom',
      date: '12th Jan, 2024',
      status: 'In Process',
      statusBackground:'#fef3c7',
    }
  ]
  const progressState =[
    {
  progressStatus: 'In Progress',
  backgroundColor:'#6387feff',
    },
     {
  progressStatus: 'Approved',
  backgroundColor:'#02fa06ff',
    },
      {
    },
  ]
  const [selectedTab, setSelectedTab] = useState('password');
interface DetailCardProps {
  title: string;
  data: React.ReactNode[];
}

const DetailCard: React.FC<DetailCardProps> = ({ title, data }) => {
  return (
    <View style={style.card}>
      <Text style={style.title}>{title}</Text>

      {data.map((item, index) => (
        <Text key={index} style={style.item}>
        {item}
        </Text>
      ))}
    </View>
  );
};

  return(
    <ScrollView 
      style={{ flex: 1, backgroundColor: '#f5f5f5' }} // optional: nice background
      contentContainerStyle={{ paddingBottom: 40 }} // extra space at bottom
      showsVerticalScrollIndicator={false}>
    <View style={style.body}>
      <View><Text style={[styles.paragraph, {fontWeight: 'bold',}]}>Your Selected Countries</Text>
   <View >
      <View >
       <View style={style.container}>
       {userData.map((item,index)=>{
        return(
        <View>
           <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:10}} key={index}>
            <Text style={style.value}>{item.title}</Text>
           <View style={{flexDirection:'row', alignItems:'center'}}>
             {/* <Image source={{uri: item.flag}} style={{width:30, height:20, marginRight:10}}></Image> */}
            <Text style={style.paragraph}>{item.value}</Text></View> 
             </View>
             </View>
        )
       })}
        

      </View>
      <Image source={{uri:'https://png.pngtree.com/png-vector/20250319/ourmid/pngtree-commercial-airplane-in-flight-flying-through-the-sky-for-global-air-png-image_15716035.png'}}></Image>
     </View>
   </View>

  </View>
<View>
  <Text style={{marginTop:12,marginBottom:10,  }}>Quick Actions</Text>

<View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>
  {cards.map((item,index)=>{
    return(
   <View key={index} > 
     <View style={[style.featureCard, {backgroundColor:item.backgroundColor,}]}> 
      <Image source={{uri: item.Icon}} style={style.featureCardIcon}></Image>
        <Text style={style.featureCardText}>{item.title}</Text>
     </View>
   </View>
    )
  })}
</View>

</View>
<View>
  <View style={{marginTop:20, marginBottom:10, display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
    <Text>Recent Applications</Text>
     <Text style={{color:'#00d0ffff'}}>View All</Text>
  </View>
  <View>
    {RecentApplications.map((item,index)=>{
      return(
        <View style={style.RecentCards} key={index}>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}> 
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
          <View> 
           <View style={{display:'flex', flexDirection:'row'}}>  <View style={{backgroundColor:item.iconBackground, padding:10, borderRadius:8, marginBottom:6, width:50, height:50, justifyContent:'center', alignItems:'center'}}>
              <Image source={{uri:item.icon}} style={{width:30, height:20}}></Image>
              
            </View>
            <View style={{marginLeft:10, }}>
              <Text style={{fontWeight:'bold', fontSize:16, color:'#333', marginLeft:4}}>{item.title}</Text>

         <View style={{flexDirection:'row', alignItems:'center'}}> 
            <Image source={{uri:'https://i.imgur.com/2J1vXbK.png'}} height={20} width={20} style={{margin:4}}></Image>
          <Text style={{color:'#666'}}>{item.date}</Text>
              </View>
                </View>
            </View>
            
          </View>
        </View>
        <View>
          <View style={{backgroundColor:item.statusBackground, paddingVertical:6, paddingHorizontal:12, borderRadius:20,}}>
            <Text style={{color:'#b45309', fontWeight:'600'}}>{item.status}</Text>
          </View>
           </View>
          </View>
        </View>
      )
    })}
  </View>
</View>
    </View>
    </ScrollView>
  )
}


const style = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
 backdropFilter: 'blur(200px)',
    padding: 15,
    borderRadius: 12,
    elevation: 0, 
    shadowColor: "#000", 
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  value:{
  color: '#e0e7ff',
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333"
  },
  item: {
    fontSize: 15,
    marginBottom: 6,
    color: "#555"
  },
  body: {
marginTop: 40,
padding: 20,
  },
  container:{
   
    backgroundColor: "#8a2be2",
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingBottom: Platform.OS === 'android' ? 25 : 0,
    padding: 10,
    borderRadius: 10,
    shadowOpacity:3,
    shadowColor: '#000',

  },
  paragraph: {
    color:"#FFF",
     fontSize:16,
     
  },
    tabButton: {
    paddingHorizontal: 20,
    
    backgroundColor: '#e2e8f0',
    marginRight: 12,
    minWidth: 100,
    alignItems: 'center',
      padding: 18,
    borderRadius: 30,
    marginTop: 20,
    elevation: 6,
  },
  tabText:{
     color: '#64748b',
    fontWeight: '600',
    fontSize: 14,
  },
  featureCard:{
   
   width:170,
    borderRadius:12,
    marginBottom:16,
   height:90,
   justifyContent:'center',
   alignItems:'center',
  
   
   
  },
  featureCardText:{
     justifyContent:'center',
   alignItems:'center',
color: '#FFF',

  },
  featureCardIcon:{
    width: 26,
     height: 26, marginBottom: 8
  },
  RecentCards:{
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 1, 
    shadowColor: "#000", 
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  }

})