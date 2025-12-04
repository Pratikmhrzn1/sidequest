import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Linking } from 'react-native';
import { style } from './processing-time';

const travelGuideScreens =()=>{
      const travelGuides = [
    {
      title: 'Top 10 Places to Visit in France',
      link: 'https://www.example.com/france-travel-guide',
    },
    {
      title: 'Traveling to Japan: A Complete Guide',
      link: 'https://www.example.com/japan-travel-guide',
    },
    {
      title: 'United States Travel Tips',
      link: 'https://www.example.com/us-travel-guide',
    },
    {
      title: 'Essential Packing Tips for Europe',
      link: 'https://www.example.com/europe-packing-guide',
    },
  ];

    return (
       <ScrollView style={style.container} contentContainerStyle={{ padding: 20 }}>
<View>
    {travelGuides.map((item, index)=>{
return(
    <View style={style.itemContainer} key={index}>
         <Text style={[style.bullet]} key={index}>
    •
        </Text>
        <TouchableOpacity onPress={()=> Linking.openURL(item.link)}>
             <Text style={[style.paragraph]} key={index}>
 {item.title}
        </Text>
            <Text>Visit Place</Text>
            
         </TouchableOpacity>
       
         </View>
         
)
    })}
    
</View>
       </ScrollView>
    )
}



export default travelGuideScreens;