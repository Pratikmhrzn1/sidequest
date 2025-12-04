import React from 'react'
import {View, Text} from 'react-native'
import  {style}  from './processing-time';
const travelupdates = () => {
      const updates = [
    { title: 'Flight Ban Lifted', description: 'Flights to Europe are now operational.' },
    { title: 'New Visa Rules', description: 'Tourist visa duration extended by 3 months.' },
    { title: 'COVID-19 Guidelines', description: 'Mask mandate lifted in most countries.' },
  ];
  return (
    <View>
{updates.map((item,index)=>{
    return (
        <View style={style.container} key={index}>
            <Text style={style.heading}>{item.title}</Text>
            <Text style={style.paragraph}>{item.description}</Text>
        </View>
    )
})}
    </View>
  )
}

export default travelupdates