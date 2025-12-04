import { View, Text, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { style } from './processing-time';

const visaRequirementScreen =()=>{
      const visaRequirements = [
    'Valid passport with at least 6 months validity',
    'Completed visa application form',
    'Passport-size photos (recent)',
    'Visa fee according to duration of stay',
    'Proof of onward/return ticket',
    'Proof of accommodation in the destination country',
    'Proof of sufficient funds for the stay',
  ];
    return (
       <ScrollView style={style.container} contentContainerStyle={{ padding: 20 }}>
<View>
    {visaRequirements.map((item, index)=>{
return(
    <View style={[style.itemContainer, {flexDirection:'row'}]} key={index}>
         <Text style={[style.bullet]} key={index}>
    •
        </Text>
        <Text style={[style.paragraph]} key={index}>
 {item}
        </Text>
         </View>
)
    })}
</View>
       </ScrollView>
    )
}


export default visaRequirementScreen;