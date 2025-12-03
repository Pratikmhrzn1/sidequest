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

import { styles } from './index';

 
export default function App(){
  const userData = [
    {
      title: 'From',
      data:'Nepal',
      flag: 'https://i.imgur.com/Q8SO10S.png'
    },
     {
      title: 'Going to',
      data:'America',
       flag: 'https://static.vecteezy.com/system/resources/previews/047/657/255/non_2x/american-flag-transparent-png.png'
    },
    {
      title: 'Citizen of',
      data:'Nepal',
       flag: 'https://i.imgur.com/Q8SO10S.png'
    }

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
             <Image source={{uri: item.flag}} style={{width:30, height:20, marginRight:10}}></Image>
            <Text style={style.paragraph}>{item.data}</Text> </View>
             </View>
            <View> 
              
              </View> </View>
        )
       })}
        

      </View>
      <Image source={{uri:'https://png.pngtree.com/png-vector/20250319/ourmid/pngtree-commercial-airplane-in-flight-flying-through-the-sky-for-global-air-png-image_15716035.png'}}></Image>
     </View>
   </View>
<ScrollView horizontal showsHorizontalScrollIndicator={true}>
      <View style={{display:'flex', flexDirection:'row', gap:10}}> 
        <TouchableOpacity onPress={()=>setSelectedTab('Mandatory')}>
          <View style={[style.tabButton, {flex:1}] }>
        <Text>Mandatary Registration</Text>
      </View>
        </TouchableOpacity>
       <TouchableOpacity onPress={()=>setSelectedTab('password')}> <View style={[style.tabButton, {flex:1}] }>
          <Text>Password & destination details</Text>

      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>setSelectedTab('Visa')}> <View style={[style.tabButton, {width: 150}] }>
          <Text>Visa Rules</Text>

      </View>
      </TouchableOpacity>
        {/* <View style={[style.tabButton, {flex:1}] }>
          <Text></Text>

      </View> */}
    </View>
</ScrollView>

<View style={{ marginTop: 20 }}>
  {selectedTab === 'Mandatory' && <DetailCard 
      title="Mandatory Registration"
      data={[
        "You must register before traveling to the USA.",
        "Provide passport, purpose of travel, and stay duration.",
        "Registration must be completed 48 hours before departure."
      ]}
  />}

  {selectedTab === 'password' && <DetailCard 
      title="Passport & Destination Details"
      data={[
        "Passport must be valid for at least 6 months.",
        "Carry digital & printed copies of your passport.",
        "Have hotel booking or host contact details.",
        "Return ticket may be required during immigration."
      ]}
  />}

  {selectedTab === 'Visa' && <DetailCard 
      title="Visa Rules"
      data={[
        "A visa is required for Nepal → USA travel.",
        "Fill DS-160 form and schedule an embassy interview.",
        "Bring financial proof and travel documents.",
        "Visa processing typically takes 3–7 weeks."
      ]}
  />}
</View>


      </View>

<View>
  <Text style={[style.paragraph, {fontWeight:'bold', color: '#000', fontSize: 18}]}>Price</Text>
  <View style={{flexDirection:'row', justifyContent:'space-between', backgroundColor:'#f5f5f5', padding:15, borderRadius:10, marginTop:10}}>
    
      <Text>America</Text>
      <Image source={{uri:'https://i.imgur.com/ytHgmHx.png'}} width={90} height={60}></Image>
      <Text>Hundred</Text>
  
  </View>
  </View>

    </View>
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
  }
})