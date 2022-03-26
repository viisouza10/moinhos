import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import blueLogoImg from '../assets/blue_logo.png'
import hospitalImg from '../assets/hospital.png'
import ambulanceImg from '../assets/ambulance.png'
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

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

export const Questions = () =>{
    const route = useRoute();


    const navigation = useNavigation();

    const handleClick = useCallback(() =>{
        navigation.navigate("Welcome")
    },[navigation])


    return (
        <SafeAreaView style={style.container}>
            <ScrollView style={style.scroll}>
                <View style={style.content}>
                    <Text style={style.subTitle}>Questionário emergencial</Text> 

                    <View style={style.boxInput}>
                        <Text style={style.textBoxInput}>caso tenha como medir informe a sua pressão arterial?</Text>
                        <TextInput
                            placeholder="maior"
                            onChangeText={() =>{}}
                            style={style.input}
                        />
                        <TextInput
                            placeholder="menor"
                            onChangeText={() =>{}}
                            style={style.input}
                        />
                    </View>
                    <View style={style.boxInput}>
                        <Text style={style.textBoxInput}>caso tenha como medir informe a sua saturação</Text>
                        <TextInput
                            placeholder="saturação"
                            onChangeText={() =>{}}
                            style={style.input}
                        />
                    </View>
                    <View style={style.boxInput}>
                        <Text style={style.textBoxInput}>
                            caso tenha como medir informe sua temperatura
                        </Text>
                        <TextInput
                            placeholder="temperatura"
                            onChangeText={() =>{}}
                            style={style.input}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={style.footer}>
                <TouchableOpacity 
                    style={style.button} 
                    activeOpacity={0.7}
                    onPress={handleClick}
                >
                    <Text style={style.textButton}>iniciar atendimento</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        width: "100%",
    },
    scroll:{
        flex:1,
        width: "100%",
    },
    content:{
        flex:1,
        alignItems: 'center',
        width: "100%",
        paddingBottom:50
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
    footer:{
        position:"absolute",
        bottom:"1%"
    },
    boxInput:{
        borderStyle:"dashed",
        borderColor:colors.primary,
        borderWidth:1,
        padding:10,
        width:"90%",
        alignItems:"center",
        marginBottom:20
    },
    textBoxInput:{
        color:colors.text_primary_light,
        textAlign:"center",
        fontSize:25,
        width:"90%"
    },
    input:{
        borderWidth:2,
        borderColor:colors.primary,
        color:colors.heading,
        width:Dimensions.get('window').width * 0.8,
        fontSize:18,
        marginTop:20,
        padding: 10,
    },
})