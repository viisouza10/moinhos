import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import blueLogoImg from '../assets/blue_logo.png'
import hospitalImg from '../assets/hospital.png'
import ambulanceImg from '../assets/ambulance.png'
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface ConfirmationParams {
    title:string;
    subtitle:string;
    buttonTitle:string;
    icon:"smile" | "hug";
    nextScreen:string;
    nextScrenChild?:string;
}

const emojis = {
    hug:"🤗",
    smile:"😀"
}

export const Information = () =>{
    const navigation = useNavigation();
    const type:"hospital"|"ambulance" = "ambulance"


    const handleClick = useCallback(() =>{
        navigation.navigate("Welcome")
    },[navigation])


    return (
        <SafeAreaView style={style.container}>
            <View style={style.content}>
                <Image
                    source={blueLogoImg} 
                    style={style.logo}
                    resizeMode="contain"
                />
                <Text style={style.subTitle}>Vá para um hospital</Text>
                {type === "hospital" ? 
                    (
                        <>
                            <Image
                                source={hospitalImg} 
                                style={style.infoImage}
                                resizeMode="contain"
                            />
                            <Text style={style.text}>Aconselhamos que á para o hospital mais póximo de você com urgência</Text>
                        </>
                    )
                    :
                    (
                        <>
                            <Image
                                source={ambulanceImg} 
                                style={style.infoImage}
                                resizeMode="contain"
                            />
                            <Text style={style.text}>Aconselhamos que chame uma ambulância</Text>
                                
                            <TouchableOpacity 
                                style={style.button} 
                                activeOpacity={0.7}
                                onPress={handleClick}
                            >
                                <Text style={style.textButton}>entrar</Text>
                            </TouchableOpacity>
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
        fontSize:30,
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