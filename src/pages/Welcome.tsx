import React, { useCallback, useEffect, useState } from 'react';
import { 
    Dimensions, 
    Image, 
    KeyboardAvoidingView, 
    StyleSheet, 
    Text, 
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import whiteLogoImg from '../assets/white_logo.png'
import colors from '../styles/colors';

import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import { Amplify,Auth, API, graphqlOperation } from 'aws-amplify'; 
// import { createTodo } from '../graphql/mutations';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { listTodos } from '../graphql/queries';


export const Welcome = () =>{
    const navigation = useNavigation();

    const [error,setError] = useState<string>();
    const [isLoading,setIsLoading] = useState(false);

    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');

    const handleInputChangeEmail = useCallback((value:string)=>{
        setEmail(value)
    },[])

    const handleInputChangePassword = useCallback((value:string)=>{
        setPassword(value)
    },[])

    useEffect(() => {
        fetchTodos();
        // validateHasJwtToken();
        
      }, []);

      const validateHasJwtToken = async () =>{
        const token = await AsyncStorage.getItem("@moinhos:jwt");
        if(token){
            navigation.navigate("Questions",{
                type:"ambulance"
            })
        }
        setError("Usuário e senha incorretos")
      }
      
      async function fetchTodos() {
          const user = await Auth.currentSession()
          console.log(user);
          
          const todoData:any = await API.graphql({
              query:listTodos,
              authMode:GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
          });
        //   console.lo
          const todos = todoData.data.listTodos.items;
          console.log({todos});
          
        // } catch (err) {
        //     console.log(err)
        //   console.log('Error fetching data');
        // }
    }

    type DataAuth = {
        email:string;
        password:string
    }

    const handleStart = useCallback(async ({email,password}:DataAuth) =>{
        setError("")
        if(!email){
            setError("Digite o e-mail")
            return false
        }
        
        if(!password){
            setError("Digite a senha")
            return false
        }
        
        setIsLoading(true)
        const user   = await Auth.signIn(email,password)
        
        const jwtToken = user.signInUserSession.accessToken.jwtToken
        console.log("jwt",jwtToken)
        await AsyncStorage.setItem("@moinhos:jwt",jwtToken);
        
        setIsLoading(false)
        navigation.navigate("Questions")
    },[navigation])

    return (

        <KeyboardAvoidingView behavior="position" enabled >
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
                    onPress={() => handleStart({email,password})}
                >
                    <Text style={style.textButton}>{isLoading ? "aguarde..." : " entrar"}</Text>
                </TouchableOpacity>
                <Text style={style.textError}>{error}</Text>
            </View>
        </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
    header:{
        height: "45%",
        backgroundColor: colors.primary,
        paddingTop: 60,
        alignItems: "center",
    },
    title:{
        fontSize:45,
        color:colors.primary,
        marginTop:"5%",
        marginLeft:15,
        fontFamily:fonts.text,
    },
    logo:{
        width:Dimensions.get('window').width * 0.3,
        height:Dimensions.get('window').width * 0.3,
    },
    subTitle:{
        fontSize:25,
        color:colors.text_white,
        fontFamily: fonts.heading,
        marginTop:30,
        width:Dimensions.get('window').width * 0.9,

    },
    boxForm:{
        alignItems: "center",
        marginTop: "5%",
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
    textError:{
        color:colors.red,
        marginTop:"5%"
    }
})
