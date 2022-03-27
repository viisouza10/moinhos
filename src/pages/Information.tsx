import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import hospitalImg from '../assets/hospital.png'
import ambulanceImg from '../assets/ambulance.png'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export interface ConfirmationParams {
    title:string;
    subtitle:string;
    buttonTitle:string;
    nextScreen:string;
    nextScrenChild?:string;
}

type Params  = {
    type: "hospital"|"ambulance"
}

export const Information = () =>{
    const route = useRoute();

    const {type} = route.params as Params

    return (
        <SafeAreaView style={style.container}>
            <View style={style.content}>
                {type === "hospital" ? 
                    (
                        <>
                            <Text style={style.subTitle}>Vá para um hospital</Text>
                            <Image
                                source={hospitalImg} 
                                style={style.infoImage}
                                resizeMode="contain"
                            />
                            <Text style={style.text}>Aconselhamos que vá para o hospital mais próximo de você com urgência</Text>
                        </>
                    )
                    :
                    (
                        <>
                            <Text style={style.subTitle}>Chame uma ambulância</Text>
                            <Image
                                source={ambulanceImg} 
                                style={style.infoImage}
                                resizeMode="contain"
                            />
                            <Text style={style.text}>Aconselhamos que chame uma ambulância</Text>
                        </>
                    )
                }

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
        width: "100%"
        
    },
    subTitle:{
        fontSize:25,
        color:colors.primary,
        fontFamily: fonts.heading,
        marginVertical:60,
        textAlign:"center",
        textTransform:"capitalize",
        width:Dimensions.get('window').width * 0.6,
        
    },
    logo:{
        width: "40%",
        height:"20%",
        marginTop:"15%"
    },
    text:{
        color:colors.text_primary_light,
        fontSize:24,
        textAlign:"center",
        marginTop:30,
        width:Dimensions.get('window').width * 0.7,
    },
    infoImage:{
        width: "30%"
    },
    button:{
        fontSize:32,
        backgroundColor:colors.primary,
        width:Dimensions.get('window').width * 0.8,       
        paddingVertical:10,
        marginTop:"15%"
    },
    textButton:{
        color:colors.text_white,
        textAlign: "center",
        fontFamily:fonts.heading,
        fontSize:18,
    },
})