import React, { useCallback, useState } from 'react';
import { 
    Dimensions, 
    Image, 
    StyleSheet, 
    Text, 
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import whiteLogoImg from '../assets/white_logo.png'
import colors from '../styles/colors';

import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';

export const Welcome = () =>{
    const navigation = useNavigation();

    const [isFocused,setIsFocused] = useState(false);
    const [isFilled,setIsFilled] = useState(false);
    const [email,setEmail] = useState<string>();
    const [password,setPassword] = useState<string>();

    const handleInputChangeEmail = useCallback((value:string)=>{
        setIsFilled(!!value)
        setEmail(value)
    },[])

    const handleInputChangePassword = useCallback((value:string)=>{
        setIsFilled(!!value)
        setEmail(value)
    },[])

    const handleStart = useCallback(() =>{
        navigation.navigate("Information")
    },[navigation])

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image 
                    source={whiteLogoImg} 
                    style={style.logo}
                    resizeMode="contain"
                />

                <Text style={style.subTitle}>
                    Hospital {'\n'}
                    Moinhos De Vento
                </Text>
            </View>
            <Text style={style.title}>
                Entrar
            </Text>
            <View style={style.boxForm}>
                <TextInput
                    placeholder="e-mail"
                    onChangeText={handleInputChangeEmail}
                    style={style.input}
                />
                <TextInput
                    placeholder="senha"
                    onChangeText={handleInputChangePassword}
                    style={style.input}
                />
                <TouchableOpacity 
                    style={style.button} 
                    activeOpacity={0.7}
                    onPress={handleStart}
                >
                    <Text style={style.textButton}>entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        height: "45%",
        backgroundColor: colors.primary,
        paddingTop: 60,
        alignItems: "center",
    },
    title:{
        fontSize:50,
        color:colors.primary,
        marginTop:"15%",
        marginLeft:15,
        fontFamily:fonts.text,
    },
    logo:{
        width:Dimensions.get('window').width * 0.5,
        height:Dimensions.get('window').width * 0.5,
    },
    subTitle:{
        fontSize:30,
        color:colors.text_white,
        fontFamily: fonts.heading,
        marginTop:30,
        width:Dimensions.get('window').width * 0.9,

    },
    boxForm:{
        alignItems: "center",
        marginTop: "10%",
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
    input:{
        borderWidth:2,
        borderColor:colors.primary,
        color:colors.heading,
        width:Dimensions.get('window').width * 0.9,
        fontSize:18,
        marginTop:20,
        padding: 10,
    },
})
