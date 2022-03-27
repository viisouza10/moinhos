import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import React, { useEffect } from 'react';
import {  SafeAreaView, StyleSheet, Text, View } from 'react-native';

export const Authentication = () =>{
    const navigation = useNavigation();

    const validateSession = async() =>{
        const user:any = await Auth.currentSession()
        // console.log(user?.getAccessToken())
        console.log(user)
        
        if(user?.accessToken?.payload["cognito:groups"] && user?.accessToken?.payload["cognito:groups"].includes("Doctors")){

            navigation.navigate("ListPatients")
            
        }else{
            navigation.navigate("Questions",{
                id:0
            }) 
        }
    }
    useEffect(() =>{
        validateSession()
    },[Auth])
    return (
        <SafeAreaView style={style.container}>
            <View style={style.content}>

            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        width: "100%"
        
    },
    content:{
        flex:1,
        alignItems: 'center',
        width: "100%",
        justifyContent:"center"
    },
})