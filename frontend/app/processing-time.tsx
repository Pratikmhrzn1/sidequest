import React from 'react'
import {View,Text, StyleSheet} from 'react-native'

const processingTime = () => {
     const processingTimes = [
    { type: 'Tourist Visa', duration: '5-10 Business Days' },
    { type: 'Business Visa', duration: '7-14 Business Days' },
    { type: 'Student Visa', duration: '2-4 Weeks' },
    { type: 'Work Visa', duration: '3-6 Weeks' },
  ];
  return (
    <View>
       {processingTimes.map((item,index)=>{
       return(
         <View style={style.container} key={index}>
            <Text style={style.heading}>
{item.type}
            </Text>
             <Text style={style.paragraph}>
 {item.duration}
            </Text>
             </View>
       )
       })}
    </View>
  )
}

export const style = StyleSheet.create({
     container: {
margin: 10,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 5,

  },
  paragraph:{
    marginBottom: 10,
    fontSize:16,
    color:'#444',
    lineHeight:22,

  },
    bullet: {
    fontSize: 18,
    marginRight: 10,
    color: '#333',
  },
   itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
})
export default processingTime