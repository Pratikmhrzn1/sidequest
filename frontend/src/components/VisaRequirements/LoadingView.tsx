import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import { COLORS } from '../../constants/Colors';
export function LoadingView(){
    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content'backgroundColor={COLORS.primary}/>
            <View style={styles.center}>
                <ActivityIndicator size='large' color={COLORS.purple}/>
                <Text style={styles.text}>Loading Visa Requirements...</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fcf8f8'
    },
    center:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:20, 
    },
    text:{
        marginTop:16,
        color:'#64748B',
        fontWeight:'500'
    }
});