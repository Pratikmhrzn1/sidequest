import { ImageBackground } from "expo-image"
import { View, Text, Platform, Image, TextInput } from "react-native"
import { StyleSheet } from "react-native"
import { styles } from "../app/(tabs)/index"
import { Ionicons } from "@expo/vector-icons"
import AntDesign from '@expo/vector-icons/AntDesign';


export default function App(){
  return (
    <View style={loginstyle.body}>
  
<ImageBackground source={{uri:"https://img.freepik.com/free-vector/purple-fluid-background_53876-99561.jpg?semt=ais_hybrid&w=740&q=80"}} style={loginstyle.bg} >
    
<View style={{ justifyContent:"center", alignItems:'center'}}> 
   <Text style={[styles.title,{marginTop: 95}]}>Login To Your Account</Text>
       <Text style={[styles.paragraph,{color: '#FFF',  }]}> Enter Your Login Credentials</Text></View>
<View style={{ }}>

    

      <View style={loginstyle.form}>
 <TextInput style={loginstyle.input} placeholder="Enter Your Email"></TextInput>
 <TextInput style={loginstyle.input} placeholder="Enter Your Password"></TextInput>
      </View>
    
     
     </View>
     <View style={{flexDirection:'row', justifyContent:'space-between', margin:20}}>
<View>
  <Text>Remember Me</Text>
</View>
<View>
  <Text>Forgot Password</Text>
</View>


     </View>
     <View style={[styles.button, {backgroundColor:'red', width: '90%', justifyContent:'center', margin:20, padding:15}]}>
<Text style={styles.BtnTxt}>Login</Text>
</View>
<View style={{justifyContent:'center', alignItems:'center'}}><Text style={[styles.title, ]}>OR</Text>
<View style={{marginTop: 20, flexDirection:'row', }}>
  <AntDesign style ={{marginEnd:40}} name="google" size={32} color="#4285F4" />
   <AntDesign name="apple" size={32} color="#FFF" />
</View>


</View>
</ImageBackground>

      <View>

      </View>
    </View>
  )
}

const loginstyle = StyleSheet.create({
 body: {
    height: "100%",
    width: "100%",
    flex: 1,
    
  },
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

   form: {
    marginTop: 0,
    marginHorizontal: 25,
    padding: 25,
    borderRadius: 20,
  
  
  },
input: {
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
    marginBottom: 15,
  },

  
})