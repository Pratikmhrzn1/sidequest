import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {styles} from './home-page';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import {  useRouter } from 'expo-router';

export default function TravelDetails(){
    const router = useRouter();
    return (
        <View style={travelstyle.body}>
            
            <View><Text style={[styles.title, {color: '#000',}]}>Welcome!!</Text>
            </View>
        
        <View style={travelstyle.Card}>
            <View style={{ flexDirection:'row'}}>
                <Image source={{uri: "https://img.freepik.com/premium-photo/beautiful-nepali-girl_85216-209.jpg?w=2000"}} style={styles.avatar}></Image>
               <Image 
  source={{uri:'https://img.freepik.com/premium-vector/airplane-flying-leave-blue-dashed-trace-line_1270-248.jpg?w=1480'}}
  style={{flex:1,  width: 400, borderRadius: 90,  marginLeft: 90}}

/>

            </View>
<Text style={{color:"#FFF", fontWeight: 'bold', marginTop:10}}>Mrs Krisha</Text>

        </View>
        
        <View style={travelstyle.AccountHolderCard}>
            <Text style={{fontWeight: 'bold', fontSize:18}}>Account Holder Details</Text>
            <View style={{flexDirection:'row',  }}>
                
                <Text style={[travelstyle.paragraph,{marginEnd: 80}]}>Name: Mrs Krisha</Text>
                 <Text style={travelstyle.paragraph}>Travelling: America</Text>
           </View>
            
             <Text style={travelstyle.paragraph}>Nationality: Nepal</Text>
              <Text style={travelstyle.paragraph}>Birthdate: 20/19/2002</Text>
        </View>
        <Text style={{fontWeight: 'bold', fontSize:18, marginTop:20,}}> Our Features</Text>
  
  

       <View style={{
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between'
}}>
  
  {Array(6).fill(0).map((_, index) => (
    <TouchableOpacity key={index} style={{ width: '30%', marginBottom: 20 }} onPress={()=> router.push('/flight-details-download')}>
   
    <View style={{ width: '100%', marginBottom: 20 }}>
      
      <View style={[styles.avatar, { marginTop: 20, backgroundColor: "purple" }]}>
        <Entypo name="aircraft" size={40} color="#FFF" />
      </View>

      <Text style={travelstyle.Text}>Flight Details</Text>


    </View>
     </TouchableOpacity>
  ))}

</View>
 

        </View>
        
    )


}

export const travelstyle = StyleSheet.create({
    body:{
 margin: 20,
    },
    Card:{
        marginTop: 40,
        padding: 20,
    
      backgroundColor:'#6200EE',
      borderRadius: 20,
    },
    AccountHolderCard:{
        marginTop: 20,
padding: 10,

backgroundColor: '#FFF'
    },
    paragraph:{
 marginTop: 10,
 color:'#A9A9A9'
    },
    Text:{
   marginTop: 10,
    }
})